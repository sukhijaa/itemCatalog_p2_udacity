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

# Show all restaurants
@app.route('/')
@app.route('/items')
@app.route('/item')
def showAllItems():
    allRes = session.query(Category).all()
    myData = []
    for category in allRes:
        myData.append({'name': category.name, 'description': category.description, 'id': category.id})
    return render_template('index.html', categoryData=myData)


if __name__ == '__main__':
    app.secret_key = 'super_secret_key'
    app.debug = True
    app.run(host='0.0.0.0', port=5000)
