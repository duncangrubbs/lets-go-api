# Let's Go API
![Build Status](https://travis-ci.com/duncangrubbs/lets-go-api.svg?branch=master)
[![Maintainability](https://api.codeclimate.com/v1/badges/219457d5c01d3fc303c4/maintainability)](https://codeclimate.com/github/duncangrubbs/lets-go-api/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/219457d5c01d3fc303c4/test_coverage)](https://codeclimate.com/github/duncangrubbs/lets-go-api/test_coverage)

> The API for the **Let's Go** app.

## 🤘 What is Let's Go?
Let's Go is an application for finding new friends.
Users can post activities that they are interested in doing, and other users can
request to join. The API is almost at the point of MVP and will be deployed.
The application itself will have development beginning soon after the MVP
of the API is deployed.

## 🙌 Contributing
After cloning the repository, do the following.
- Always run `mongod` in a seperate terminal to 
start up your local MongoDB server first
- Run `yarn` to install all dependencies
- Run `yarn start` to start the dev server
- Run `yarn test` to test
- Run `yarn run lint` to lint
- Run `yarn run coverage` to collect test coverage

## 🔨 Built With:
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

**See the wiki for API documentation**
