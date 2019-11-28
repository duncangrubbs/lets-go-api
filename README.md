# Let's Go API
![Build Status](https://travis-ci.com/duncangrubbs/lets-go-api.svg?branch=master)
![Coverage Status](https://coveralls.io/repos/github/duncangrubbs/lets-go-api/badge.svg?branch=master)

> An API for the **Let's Go** app.

## What is Let's Go?
Let's Go is an application for finding new friends.
Users can post activities that they are interested in doing, and other users can
request to join.

---

## Getting Started
After cloning the repository, do the following.
- Always run `mongod` in a seperate terminal to 
start up your local db server first
- Run `yarn` to install all dependencies
- Run `yarn start` to start the dev server
- Run `yarn test` to test
- Run `yarn run lint` to lint
- Run `yarn run coverage` to collect test coverage

### This app is build with:
1. [Node](https://nodejs.org/) - running JS locally
2. [Yarn](https://yarnpkg.com/) - package manager
3. [Babel](https://babeljs.io) - for JS transpiling ES6
4. [Mongoose](http://mongoosejs.com) - for MongoDB
5. [MongoDB](https://www.mongodb.com/) - JSON database
6. [Mocha](https://mochajs.org/) - Javascript test assertion library
7. [Chai](https://www.chaijs.com/) - For simulating HTTP requests when testing
8. [dotenv](https://github.com/motdotla/dotenv) - For managing environment variables

I am using mongoDBCompass and Postman as resources for testing the API routes
and the database.

**See the wiki for API documentation.**