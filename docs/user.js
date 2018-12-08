import PropTypes from 'prop-types';

const SIGN_UP = {
  type: 'POST:multipart/form-data',
  url: '/signup',
  req: PropTypes.shape({ // ?type=val1&email=val2&...
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    photo: PropTypes.instanceOf(Blob).isRequired, // <input type="file" name="photo">
  }),
  res: PropTypes.shape({
    userId: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
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
    userId: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
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
    userId: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
  }),
  requireCredentials: false,
};

const UPDATE_INFO = {
  type: 'PATCH',
  url: '/user/:userId', // userId should match session
  req: PropTypes.shape({
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    photo: PropTypes.instanceOf(Blob).isRequired,
  }),
  res: PropTypes.shape({
    userId: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
  }),
  requireCredentials: true,
};

const UPDATE_PASSWORD = {
  type: 'PATCH',
  url: '/user/:userId/password', // userId should match session
  req: PropTypes.shape({
    oldPassword: PropTypes.string.isRequired,
    newPassword: PropTypes.string.isRequired,
  }),
  res: PropTypes.number.isRequired, // status code
  requireCredentials: true,
};

const DELETE = {
  type: 'DELETE',
  url: '/user/:userId', // userId should match session
  res: PropTypes.number.isRequired, // status code
  requireCredentials: true,
};

const GET_QUEUES_BY_PROVIDER = {
  type: 'GET',
  url: '/user/:providerId/queues',
  res: PropTypes.arrayOf(PropTypes.shape({ 
    queueId: PropTypes.string.isRequired,
    providerId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    closed: PropTypes.bool.isRequired,
    futureAppointmentsAmount: PropTypes.number.isRequired,
    nextApprovedAppointmentDate: PropTypes.string,
    nextAvailableAppointmentDate: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  })),
};

const GET_APPOINTMENTS_BY_CLIENT = {
  type: 'GET',
  url: '/user/:clientId/appointments/status/:status',
  res: PropTypes.arrayOf(PropTypes.shape({
    appointmentId: PropTypes.string.isRequired,
    queue: PropTypes.shape({
      queueId: PropTypes.string.isRequired,
      providerId: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      phoneNumber: PropTypes.string.isRequired,
      closed: PropTypes.bool.isRequired,
      futureAppointmentsAmount: PropTypes.number.isRequired,
      nextApprovedAppointmentDate: PropTypes.string,
      nextAvailableAppointmentDate: PropTypes.string,
    }).isRequired,
    dateTimeFrom: PropTypes.string.isRequired,
    dateTimeTo: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  })).isRequired,
  requireCredentials: true,
};
