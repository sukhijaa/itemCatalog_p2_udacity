import httplib2
import json
import random
import requests
import string
from flask import Flask, render_template, request, redirect, jsonify, url_for, flash, session as login_session
from flask import make_response
from flask_httpauth import HTTPBasicAuth
from oauth2client.client import FlowExchangeError
from oauth2client.client import flow_from_clientsecrets
from sqlalchemy import create_engine, asc
from sqlalchemy.orm import sessionmaker, scoped_session

from catalogDBSetup import Category, CatalogItem, Base, User

auth = HTTPBasicAuth()

app = Flask(__name__)

# Connect to Database and create database session
engine = create_engine('sqlite:///itemCatalog.db')
Base.metadata.bind = engine

session = scoped_session(sessionmaker(bind=engine))
allCatsCached = []


@app.teardown_request
def remove_session(ex=None):
    session.remove()


def getCatalogItemJson(catalogItem):
    return jsonify({
        'name': catalogItem.name,
        'description': catalogItem.description,
        'categoryId': catalogItem.categoryId,
        'id': catalogItem.id
    })


def getCategoryJson(category):
    return jsonify({
        'name': category.name,
        'description': category.description,
        'id': category.id
    })


# Utility Method. It queries the DB and creates an array of dictionaries
def fillCatTableData():
    global allCatsCached
    allCatsFromCatTable = session.query(Category).all()
    allCatsCached = []
    for category in allCatsFromCatTable:
        categoryObj = {
            'name': category.name,
            'description': category.description,
            'id': category.id,
            'catalogItems': []
        }
        allItemsForThisCat = session.query(CatalogItem).filter(CatalogItem.categoryId == category.id)
        for catItem in allItemsForThisCat:
            categoryObj['catalogItems'].append({
                'name': catItem.name,
                'description': catItem.description,
                'id': catItem.id,
                'categoryId': catItem.categoryId
            })
        allCatsCached.append(categoryObj)


def getCategoriesData():
    if len(allCatsCached) == 0:
        fillCatTableData()
    return allCatsCached


@app.route('/loginUser/<provider>', methods=['POST'])
def loginUser(provider):
    # STEP 1 - Parse the auth code
    requestData = json.loads(request.data)
    requestData = requestData['body']
    if provider == 'google':
        auth_code = requestData['access_token']
        print "Step 1 - Complete, received auth code %s" % auth_code
        # STEP 2 - Exchange for a token
        try:
            # Upgrade the authorization code into a credentials object
            oauth_flow = flow_from_clientsecrets('client_secrets.json', scope='')
            oauth_flow.redirect_uri = 'postmessage'
            credentials = oauth_flow.step2_exchange(auth_code)
        except FlowExchangeError as e:
            print(str(e))
            response = make_response(json.dumps('Failed to upgrade the authorization code.'), 401)
            response.headers['Content-Type'] = 'application/json'
            return response

        # Check that the access token is valid.
        access_token = credentials.access_token
        url = ('https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=%s' % access_token)
        h = httplib2.Http()
        result = json.loads(h.request(url, 'GET')[1])
        # If there was an error in the access token info, abort.
        if result.get('error') is not None:
            print('Authorization code is not valid')
            print('Error %s' % result.get('error'))
            response = make_response(json.dumps(result.get('error')), 500)
            response.headers['Content-Type'] = 'application/json'

        print "Step 2 Complete! Access Token : %s " % credentials.access_token

        h = httplib2.Http()
        userinfo_url = "https://www.googleapis.com/oauth2/v1/userinfo"
        params = {'access_token': credentials.access_token, 'alt': 'json'}
        answer = requests.get(userinfo_url, params=params)

        data = answer.json()

        name = data['name']
        picture = data['picture']
        email = data['email']

        # see if user exists, if it doesn't make a new one
        user = session.query(User).filter_by(email=email).first()
        if not user:
            user = User(username=name, picture=picture, email=email)
            session.add(user)
            session.commit()

        # STEP 4 - Make token
        token = user.generate_auth_token(6000)

        # STEP 5 - Send back token to the client
        return jsonify({'token': token.decode('ascii')})

        # return jsonify({'token': token.decode('ascii'), 'duration': 6000})
    elif provider == 'userInput':
        email = requestData['email']
        password = requestData['password']

        if email is None or password is None:
            print "Missing Arguments"
            return jsonify('Missing Arguments. '
                           'Please enter a valid email and password. Password is greater than 6 chars.'), 400

        if session.query(User).filter_by(email=email).first() is not None:
            print "existing user"
            user = session.query(User).filter_by(email=email).first()
            if not user.verify_password(password):
                print('Invalid Username / Password for %s' % email)
                return jsonify('Email Id and Password don\'t match. Please try again.'), 445
            else:
                messageToSend = 'Login Successful. Enjoy!!'
                print('Login successful')
        else:
            print('Creating a new user : %s' % email)
            user = User(email=email, username=email)
            user.hash_password(password)
            session.add(user)
            session.commit()
            messageToSend = 'Created a new User. Please update your name in Profile Section'
            print('User created successfully')
        token = user.generate_auth_token(600)
        return jsonify({'token': token.decode('ascii'), 'message': messageToSend, 'username': user.username})
    else:
        return 'Unrecoginized Provider'


@app.route('/profile/update', methods=['POST'])
def updateUserInfo():
    reqData = json.loads(request.data)
    token = reqData['token']
    reqData = reqData['body']
    userEditing = User.verify_auth_token(token)
    if userEditing is None:
        response = make_response(json.dumps('Bad Authorization Token. Please re-login'), 444)
        response.headers['Content-Type'] = 'application/json'
        return response
    print(reqData)
    user = session.query(User).filter_by(id=userEditing).first()
    if user is None:
        response = make_response(json.dumps('User not found. Please re-login or Create a New User'), 444)
        response.headers['Content-Type'] = 'application/json'
        return response
    if reqData['username']:
        user.username = reqData['username']
    if reqData['password']:
        user.hash_password(reqData['password'])
    session.add(user)
    session.commit()
    print('User info Updated')
    return 'User info updated successfully'


@app.route('/item/new', methods=['GET', 'POST'])
def newItemInCategory():
    if request.method == 'GET':
        return render_template('index.html', categoryData=getCategoriesData())
    elif request.method == 'POST':
        reqData = json.loads(request.data)
        token = reqData['token']
        reqData = reqData['body']
        userEditing = User.verify_auth_token(token)
        if userEditing is None:
            response = make_response(json.dumps('Bad Authorization Token. Please re-login'), 444)
            response.headers['Content-Type'] = 'application/json'
            return response
        print(reqData)
        category = session.query(Category).filter_by(id=reqData['categoryId']).one()
        if category:
            print('Trying to create a new item now')
            newItem = CatalogItem(name=reqData['name'], description=reqData['description'],
                                  categoryId=category.id)
            newItem.category = category
            session.add(newItem)
            session.commit()
            fillCatTableData()
            return getCatalogItemJson(newItem)


@app.route('/category/new', methods=['GET', 'POST'])
def addCategory():
    if request.method == 'GET':
        return render_template('index.html', categoryData=getCategoriesData())
    elif request.method == 'POST':
        reqData = json.loads(request.data)
        token = reqData['token']
        reqData = reqData['body']
        userEditing = User.verify_auth_token(token)
        if userEditing is None:
            response = make_response(json.dumps('Bad Authorization Token. Please re-login'), 444)
            response.headers['Content-Type'] = 'application/json'
            return response
        print(reqData)
        newCategory = Category(name=reqData['name'], description=reqData['description'])
        session.add(newCategory)
        session.commit()
        fillCatTableData()
        return getCategoryJson(newCategory)


@app.route('/category/<int:category_id>/edit', methods=['GET', 'POST'])
def editCategory(category_id):
    if request.method == 'GET':
        return render_template('index.html', categoryData=getCategoriesData())
    elif request.method == 'POST':
        reqData = json.loads(request.data)
        token = reqData['token']
        reqData = reqData['body']
        userEditing = User.verify_auth_token(token)
        if userEditing is None:
            response = make_response(json.dumps('Bad Authorization Token. Please re-login'), 444)
            response.headers['Content-Type'] = 'application/json'
            return response
        print(reqData)
        categoryToEdit = session.query(Category).filter_by(id=category_id).one()
        if reqData['name']:
            categoryToEdit.name = reqData['name']
        if reqData['description']:
            categoryToEdit.description = reqData['description']
        session.add(categoryToEdit)
        session.commit()
        categoryAfterEdit = session.query(Category).filter_by(id=category_id).one()
        fillCatTableData()
        return getCategoryJson(categoryAfterEdit)


@app.route('/item/<int:item_id>/edit', methods=['GET', 'POST'])
def editItem(item_id):
    if request.method == 'GET':
        return render_template('index.html', categoryData=getCategoriesData())
    elif request.method == 'POST':
        reqData = json.loads(request.data)
        token = reqData['token']
        reqData = reqData['body']
        userEditing = User.verify_auth_token(token)
        if userEditing is None:
            response = make_response(json.dumps('Bad Authorization Token. Please re-login'), 444)
            response.headers['Content-Type'] = 'application/json'
            return response
        print(reqData)
        itemToEdit = session.query(CatalogItem).filter_by(id=item_id).one()
        if reqData['name']:
            itemToEdit.name = reqData['name']
        if reqData['description']:
            itemToEdit.description = reqData['description']
        session.add(itemToEdit)
        session.commit()
        itemAfterEdit = session.query(CatalogItem).filter_by(id=item_id).one()
        fillCatTableData()
        return getCatalogItemJson(itemAfterEdit)


@app.route('/category/<int:category_id>/delete', methods=['GET', 'POST'])
def deleteCategoryAndItsItems(category_id):
    if request.method == 'GET':
        return render_template('index.html', categoryData=getCategoriesData())
    else:
        reqData = json.loads(request.data)
        token = reqData['token']
        userEditing = User.verify_auth_token(token)
        if userEditing is None:
            response = make_response(json.dumps('Bad Authorization Token. Please re-login'), 444)
            response.headers['Content-Type'] = 'application/json'
            return response
        categoryToDelete = session.query(Category).filter_by(id=category_id).one()
        itemsForCategory = session.query(CatalogItem).filter(CatalogItem.categoryId == categoryToDelete.id)
        for item in itemsForCategory:
            session.delete(item)
            session.commit()

        session.delete(categoryToDelete)
        session.commit()
        fillCatTableData()
        return {}


@app.route('/item/<int:item_id>/delete', methods=['GET', 'POST'])
def deleteSingleCatalogItem(item_id):
    if request.method == 'GET':
        return render_template('index.html', categoryData=getCategoriesData())
    else:
        reqData = json.loads(request.data)
        token = reqData['token']
        userEditing = User.verify_auth_token(token)
        if userEditing is None:
            response = make_response(json.dumps('Bad Authorization Token. Please re-login'), 444)
            response.headers['Content-Type'] = 'application/json'
            return response
        itemToDelete = session.query(CatalogItem).filter_by(id=item_id).one()
        session.delete(itemToDelete)
        session.commit()
        fillCatTableData()
        return {}


@app.route('/getAllCategories')
def returnJSONOfAllCatsAndItems():
    return jsonify(getCategoriesData())


@app.route('/')
@app.route('/items')
@app.route('/categories')
@app.route('/login')
def showAllItems():
    return render_template('index.html', categoryData=getCategoriesData())


if __name__ == '__main__':
    app.secret_key = 'super_secret_key'
    app.debug = True
    app.run(host='0.0.0.0', port=5000)
