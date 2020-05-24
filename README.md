# Let's Go API
![Build Status](https://travis-ci.com/duncangrubbs/lets-go-api.svg?branch=master)
[![Maintainability](https://api.codeclimate.com/v1/badges/219457d5c01d3fc303c4/maintainability)](https://codeclimate.com/github/duncangrubbs/lets-go-api/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/219457d5c01d3fc303c4/test_coverage)](https://codeclimate.com/github/duncangrubbs/lets-go-api/test_coverage)

> The API for the **Let's Go** app.

## 🤘 What is Let's Go?
Let's Go is an app for finding new friends. Have you ever wanted to go hiking, but couldn't find anyone to go? Needed a surfing buddy but none of your friends know how? Moved to a new city and looking for someone to play some pickup basketball with? As active people, we connect over outdoor activties, and there is no better way to bond then getting outside of your comfort zone. With Let's Go, everything is organized by activity, so you can find people who have the same outdoor passions as yourself.

## 🙌 Contributing
After cloning the repository, do the following.
1. Make sure you have `Docker` and `docker-compose` installed
2. `docker-compose up` to run the project
3. Optionally, use the `-d` flag like so: `docker-compose up -d`, to run the project in the background with no logging

I am currently still working on getting the testing environment setup with Docker so to test you still have to run locally, as seen below.

*Other Options:*
- `yarn run test` to test
- `yarn run lint` to lint
- `yarn run coverage` to collect test coverage

## 🔨 Built With:
1. [Node](https://nodejs.org/) - running JS locally
2. [Yarn](https://yarnpkg.com/) - package manager
3. [Babel](https://babeljs.io) - for JS transpiling ES6
4. [MongoDB](https://www.mongodb.com/) - JSON database
5. [Mongoose](http://mongoosejs.com) - for MongoDB
6. [Mocha](https://mochajs.org/) - Javascript test assertion library
7. [Chai](https://www.chaijs.com/) - For simulating HTTP requests when testing
8. [dotenv](https://github.com/motdotla/dotenv) - For managing environment variables
9. [Docker](https://www.docker.com/) - For consistent dev environment and containerization

I use Postman for testing the API routes locally.

**See the wiki for API documentation**
