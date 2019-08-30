// Source:
// https://appdividend.com/2018/07/18/react-redux-node-mongodb-jwt-authentication/#React_Redux_Node_MongoDB_JWT_Authentication

const validator = require('validator');
const isEmpty = require('./isEmpty');

const validateSignup = (data) => {
  const errors = {};

  /* eslint-disable no-param-reassign */
  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.adresse_exacte = !isEmpty(data.adresse_exacte) ? data.adresse_exacte : '';
  data.phones = !isEmpty(data.phones)
    ? data.phones
    : '';
  /* eslint-enable no-param-reassign */

  if (!validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 chars';
  }

  if (validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

  if (!validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (validator.isEmpty(data.email)) {
    errors.email = 'Email is required';
  }

  if (validator.isEmpty(data.password)) {
    errors.adresse_exacte = 'adresse_exacte is required';
  }

  if (validator.isEmpty(data.passwordConfirm)) {
    errors.passwordConfirm = 'phones is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateSignup;
