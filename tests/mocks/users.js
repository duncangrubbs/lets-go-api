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

export {
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
