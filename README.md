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
5. Run project.py script to start the server on port 5000
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

UI for the project is written uaing ReactJS with Redux with Webpack used for bundling of JS and CSS code
ItemCatalog is a single-page web-app which performs all tasks based on CRUD operations implemented in Python server.
This app lets you Login using Google or manually using Email and Password.
For both cases, if user is not already present in system, a new entry is created.


On Server side, we have various CRUD operations in s RESTful manner.  

## Authors

Abhishek Sukhija - abhisukhija@ymail.com


