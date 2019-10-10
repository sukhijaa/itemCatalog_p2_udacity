# ItemCatalog

This application simply focuses on creating a Supermarket Dictionary which will list the items present in the supermarket into categories while having various features of Adding/Removing/Modifying the details about any item or category. 
User can add desciption to the item or category so user can understand the item better.


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

```
1. Node - v9+ - https://nodejs.org/en/download/
2. Python v3+ - https://www.python.org/downloads/
3. Vagrant - https://www.vagrantup.com/downloads.html
4. Virtual Box - https://www.virtualbox.org/
```

### Installing

A step by step series of examples that tell you how to get a development env running

#### Setting the system up
Assumes that you have installed all the tools mentioned above 

##### Server
```
1. Navigate to ./server using any Shell Terminal
2. Run "$ vagrant up". This will take 15-20mins
3. Run "$ vagrant ssh" to log into the Linux Bases VM.
4. Once logged in, run "$ cd /vagrant" and you will be inside the shared folder.
5. To initialize DB, run catalogDBSetup.py file.
6. If you need some dummy data to start with, also run itemCatalogFiller.py
7. Run project.py script to start the server on port 5000
```

##### UI (for Development only)
```
1. Open command prompt in root folder
2. Run "$ npm install" to install all the dependencies.
3. Run "$ npm run dev" to start hot development env on port 8000
4. Run "$ npm run prod" to create bundled JS and CSS file for production environment
```

You are now all set to use the application.
In your browser, go to localhost:5000 and you shall see the home page of ItemCatalog


### And coding style tests

For UI

```
$ npm run eslint -> To get list of linting errors
$ npm run eslint-fix -> To fix the auto-fixable errors
```

For Server
```
Python code style tool
```

## Deployment

To deploy latest UI changes onto server
```
$ npm run prod

Refresh browser window after clearing the cache and you shall see your changes.
```

To make changes in server : 
Server should refresh as soon as you make any changes in project.py file.
If it doesn't
```
$ python project.py
```

## About the Project

UI for the project is written using ReactJS with Redux with Webpack used for bundling of JS and CSS code
ItemCatalog is a single-page web-app which performs all tasks based on CRUD operations implemented in Python server.
This app lets you Login using Google or manually using Email and Password.
For both cases, if user is not already present in system, a new entry is created.


On Server side, we have various CRUD operations in s RESTful manner.  

### Allowed URIs:
All the GET requests are listed down here.
Since UI is a Reach Single Page App, there will be no server calls while you are moving around in the website.
But these below are the paths which will load the website for you if entered manually.

```
GET /item/new
GET /category/new
GET /category/:categoryID/edit
GET /item/:itemID/edit
GET /category/:categoryID/delete
GET /item/:itemID/delete
GET /getAllCategories
GET /
GET /items
GET /categories
GET /login
```

This app uses POST for all modify and delete operations since each of these operations need authentication before being applied into the DB.
If somehow your session expires while you were working, server sends a special 444 code which will redirect you to login screen again.
POST requests supported are:
```
POST /loginUser/:provider -> Allowed values : 'google', 'userInput'
POST /profile/update -> To update Name and Password of user
POST /item/new
POST /category/new
POST /item/:itemID/edit
POST /category/:categoryID/edit
POST /item/:itemID/delete
POST /category/:categoryID/delete
```

Exposed API to get list of all Categories and their items in System: 
```
/getAllCategories
```

### DB Details
There are 3 tables in the DB

```
categories: [(id INTEGER PK), (name STRING 60 NOT_NULL), (description STRING 250)]
catalog_item : [(name STRING 80), (id INTEGER PK), (description STRING 250), (categoryId INTEGER ForeignKey[Categories.id])]
user: [(id INTEGER PK), (username STRING 32 INDEX), (picture STRING), (email STRING), (password_hash STRING 64)]
```

categories table holds all the categories created in the system
catalog_item holds all the items defined in the system with a Foreign Key relation to Category this item belongs to
user table holds list of recognized users

## Login Flow

### Google - OAuth2.0 Flow
1. As user click on Google, a popup opens where user will be asked to login into google account
2. Once Login is successful, Authorization Token from google is sent to Backend using POST /loginUser/google
3. Server then Queries the Google Server using Authorization Token and if succesful fetches Email, Profile Picture and Name of user
4. This information is added into DB and a new ID for user is generated from DB.
5. Server then creates a new encrypted string which contains TImeStamp and ID of user
6. This token and various user details are sent back as response of POST API called by UI.
7. UI then saves this token and userName into Session Storage. This is necessary so that if user refreshes the page, UI doesn't need to query the server
8. For any POST request sent by user, UI also sends this token for authorization
9. Server than decrypts this token and verifies if user is found and if session is not expired.
10. If Expired or Faulty Token found, backend sends a 444 Response which lets UI log the User out and asks him to login again

### User Input
1. As user enters his email and password, this data is sent to server
2. If user email id is not found in DB, a new User is created and steps 5 onwards from Google Login Flow are followed
3. If user is found, Server then creates a hash out of this password and checks this hashed value in DB against this user
4. If matches, steps 5 onwards from Google Login Flow are followed

## HOW TO
1. Login : 
```
a. Visit /login OR vist / and click on Login Button on Top Right Corner
b. Enter your credentials. If you are not an existing user, a new user will be created for you with name same as your email id
c. You can also login using your Google account. Just Make sure browser allows popup
```
2. Add a New Category : 
```
a. Click on your name on Top Right Corner (only after Login)
b. A dropdown will open. Select option to Add Category
c. Fill in desired details and click on Add Button
```
3. Go to Homepage : 
```
a. CLick on Item Catalog on top left corner of screen
```
4. Edit a Category :
```
a. Go to homepage
b. Against category name, thre will be 2 options : Edit and Delete
c. Click on Edit and follow
```
5. Delete a Category :
```
a. Go to homepage
b. Against category name, thre will be 2 options : Edit and Delete
c. Click on Delete and follow
```
6. Add a new Item : 
```
a. Go to Homepage
b. On left of Category Name, click on Arrow to expand the Category to see list of all items
c. Click Add Item link at bottom

OR

a. Go to homepage
b. Click on Category Name you would like to add a item to
c. On Bottom, you will see option to Add Item
```
7. Edit Item : 
```
a. Go to homepage
b. Change grouping to Group By None
c. Find your Item in List Available
d. Click Edit
```
8. Delete Item :
```
a. Go to homepage
b. Change grouping to Group By None
c. Find your Item in List Available
d. Click Delete
``` 
9. Edit Password or Display Name : 
```
a. Click on your name on Top Right Corner (only after Login)
b. A dropdown will open. Select option Profile
c. Fill in desired details and click on Save Button
```
## Authors

Abhishek Sukhija - abhisukhija@ymail.com


