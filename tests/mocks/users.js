import User from '../../db/models/User';

const sampleUserOne = new User({
  firstName: 'Duncan',
  lastName: 'Grubbs',
  password: 'password',
  birthdate: 938070000000,
  location: 'Rochester, NY',
  bio: 'Love the Outdoors!',
  email: 'duncan@gmail.com',
});
sampleUserOne.setPassword('password');

const sampleUserTwo = new User({
  firstName: 'John',
  lastName: 'Smith',
  password: 'password1',
  birthdate: 938070000000,
  location: 'New York City, NY',
  bio: 'This is a bio',
  email: 'john@gmail.com',
});
sampleUserTwo.setPassword('password1');

const authTokenUserOne = sampleUserOne.generateJWT();
const authTokenUserTwo = sampleUserTwo.generateJWT();

const signupUserOne = {
  email: 'duncan@gmail.com',
  firstName: 'Duncan',
  lastName: 'Grubbs',
  password: 'password',
  birthdate: 938070000000,
};

const signupUserOneBad = {
  email: 'duncan@gmail.com',
  firstName: 'Duncan',
  lastName: 'Grubbs',
  birthdate: 938070000000,
};

const loginUserCorrect = {
  email: 'duncan@gmail.com',
  password: 'password',
};

const loginUserIncorrectPass = {
  email: 'duncan@gmail.com',
  password: 'wrong',
};

const loginUserIncorrectEmail = {
  email: 'duncan.grubbs@gmail.com',
  password: 'password',
};

const arbitraryToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImR1bmNhbkBnbWFpbC5jb20iLCJpZCI6IjVlNWJmNTA5NTc0OGI4Zjg0ZDI2NzFlNSIsImV4cCI6MTU4ODI2NTIwOSwiaWF0IjoxNTgzMDg0ODA5fQ.dnzmlKEnkit99jjOq0de0GVsylrKeE5FrvvHeE6mUwg';

export {
  arbitraryToken,
  sampleUserOne,
  sampleUserTwo,
  authTokenUserOne,
  authTokenUserTwo,
  signupUserOne,
  signupUserOneBad,
  loginUserCorrect,
  loginUserIncorrectPass,
  loginUserIncorrectEmail,
};
