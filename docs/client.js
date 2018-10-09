import PropTypes from 'prop-types';

const SIGN_UP = {
  type: 'POST:multipart/form-data',
  url: '/signup',
  req: { // ?type=val1&email=val2&...
    type: PropTypes.oneOf(['provider', 'client']).isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    photo: PropTypes.instanceOf(Blob).isRequired, // <input type="file" name="photo">
  },
  res: {
    id: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['provider', 'client']).isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
  },
  requireCredentials: false,
};

const LOG_IN = {
  type: 'POST',
  url: '/login',
  req: {
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  },
  res: {
    id: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['provider', 'client']).isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
  },
  requireCredentials: false,
};

const LOG_OUT = { // i.e. destroy current session
  type: 'DELETE',
  url: '/logout',
  res: PropTypes.oneOf(STATUS_CODES).isRequired,
  requireCredentials: true,
};

const GET_PROFILE = {
  type: 'GET',
  url: '/client/:userId',
  res: {
    id: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
  },
  requireCredentials: false,
};

const UPDATE_INFO = {
  type: 'POST',
  url: '/client/:userId/update', // userId should match session
  req: {
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  },
  res: {
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  },
  requireCredentials: true,
};

const UPDATE_PHOTO = {
  type: 'POST:multipart/form-data',
  url: '/client/:userId/photo/update', // userId should match session
  req: {
    photo: PropTypes.instanceOf(Blob).isRequired,
  },
  res: {
    photo: PropTypes.string.isRequired,
  },
  requireCredentials: true,
};

const UPDATE_PASSWORD = {
  type: 'POST',
  url: '/client/:userId/password/update', // userId should match session
  req: {
    oldPassword: PropTypes.string.isRequired,
    newPassword: PropTypes.string.isRequired,
  },
  res: PropTypes.oneOf(STATUS_CODES).isRequired,
  requireCredentials: true,
};

const DELETE = {
  type: 'DELETE',
  url: '/client/:userId/delete', // userId should match session
  res: PropTypes.oneOf(STATUS_CODES).isRequired,
  requireCredentials: true,
};

const GET_QUEUES = {
  type: 'GET',
  url: '/client/:userId/queues',
  res: PropTypes.arrayOf({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    closed: PropTypes.bool.isRequired,
  }),
  requireCredentials: false,
};
