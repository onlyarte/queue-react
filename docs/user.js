import PropTypes from 'prop-types';

const SIGN_UP = {
  type: 'POST:multipart/form-data',
  url: '/signup',
  req: PropTypes.shape({ // ?type=val1&email=val2&...
    type: PropTypes.oneOf(['provider', 'client']).isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    photo: PropTypes.instanceOf(Blob).isRequired, // <input type="file" name="photo">
  }),
  res: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['provider', 'client']).isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
  }),
  requireCredentials: false,
};

const LOG_IN = {
  type: 'POST',
  url: '/login',
  req: {
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  },
  res: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['provider', 'client']).isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
  }),
  requireCredentials: false,
};

const LOG_OUT = { // i.e. destroy current session
  type: 'DELETE',
  url: '/logout',
  res: PropTypes.number.isRequired, // status code
  requireCredentials: true,
};

const GET_PROFILE = {
  type: 'GET',
  url: '/user/:userId',
  res: PropTypes.shape({
    id: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
  }),
  requireCredentials: false,
};

const UPDATE_INFO = {
  type: 'PUT',
  url: '/user/:userId/update', // userId should match session
  req: PropTypes.shape({
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  res: PropTypes.shape({
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  requireCredentials: true,
};

const UPDATE_PHOTO = {
  type: 'PUT:multipart/form-data',
  url: '/user/:userId/photo/update', // userId should match session
  req: PropTypes.shape({
    photo: PropTypes.instanceOf(Blob).isRequired,
  }),
  res: PropTypes.shape({
    photo: PropTypes.string.isRequired,
  }),
  requireCredentials: true,
};

const UPDATE_PASSWORD = {
  type: 'PUT',
  url: '/user/:userId/password/update', // userId should match session
  req: PropTypes.shape({
    oldPassword: PropTypes.string.isRequired,
    newPassword: PropTypes.string.isRequired,
  }),
  res: PropTypes.number.isRequired, // status code
  requireCredentials: true,
};

const DELETE = {
  type: 'DELETE',
  url: '/user/:userId/delete', // userId should match session
  res: PropTypes.number.isRequired, // status code
  requireCredentials: true,
};
