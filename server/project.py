from flask import Flask, render_template, request, redirect, jsonify, url_for, flash, session as login_session
from sqlalchemy import create_engine, asc
from sqlalchemy.orm import sessionmaker
from catalogDBSetup import Category, CatalogItem, Base
import random
import string

app = Flask(__name__)

# Connect to Database and create database session
engine = create_engine('sqlite:///itemCatalog.db')
Base.metadata.bind = engine

DBSession = sessionmaker(bind=engine)
session = DBSession()

allCatsCached = []

# Utility Method. It queries the DB and creates an array of dictionaries
def fillCatTableData():
    global allCatsCached
    allCatsFromCatTable = session.query(Category).all()
    allCatsCached = []
    for category in allCatsFromCatTable:
        categoryObj = {'name': category.name, 'description': category.description, 'id': category.id, 'catalogItems': []}
        allItemsForThisCat = session.query(CatalogItem).filter(CatalogItem.categoryId == category.id)
        for catItem in allItemsForThisCat:
            categoryObj['catalogItems'].append({'name': catItem.name, 'description': catItem.description, 'id': catItem.id, 'categoryId': catItem.categoryId})
        allCatsCached.append(categoryObj)

def getCategoriesData():
    if len(allCatsCached) == 0:
        fillCatTableData()
    return allCatsCached

@app.route('/category/<int:category_id>/edit', methods=['GET', 'POST'])
def editCategory(category_id):
    if request.method == 'GET':
        return render_template('index.html', categoryData=getCategoriesData())
    elif request.method == 'POST':
        return render_template('index.html', categoryData=getCategoriesData())

@app.route('/category/<int:category_id>/delete', methods=['GET', 'DELETE', 'POST'])
def deleteCategoryAndItsItems(category_id):
    if request.method == 'GET':
        return render_template('index.html', categoryData=getCategoriesData())
    else:
        categoryToDelete = session.query(Category).filter_by(id=category_id).one()
        itemsForCategory = session.query(CatalogItem).filter(CatalogItem.categoryId == categoryToDelete.id)
        for item in itemsForCategory:
            session.delete(item)
            session.commit()

        session.delete(categoryToDelete)
        session.commit()
        return {}

@app.route('/item/<int:item_id>/delete', methods=['GET', 'DELETE', 'POST'])
def deleteSingleCatalogItem(item_id):
    if request.method == 'GET':
        return render_template('index.html', categoryData=getCategoriesData())
    else:
        itemToDelete = session.query(CatalogItem).filter_by(id=item_id).one()
        session.delete(itemToDelete)
        session.commit()
        return {}

@app.route('/getAllCategories')
def returnJSONOfAllCatsAndItems():
    return jsonify(getCategoriesData())


@app.route('/')
@app.route('/items')
@app.route('/item')
def showAllItems():
    return render_template('index.html', categoryData=getCategoriesData())


if __name__ == '__main__':
    app.secret_key = 'super_secret_key'
    app.debug = True
    app.run(host='0.0.0.0', port=5000)
