import PropTypes from 'prop-types';

const GET_QUEUE_BY_ID = {
  type: 'GET',
  url: '/queue/:id',
  res: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    closed: PropTypes.bool.isRequired,

    /*  Number of accepted future appointments. */
    numberOfAppointments: PropTypes.number.isRequired,

    /*  Date of the closest accepted appointment from now.
        Any string accepted by JS Date.parse().
        E.g. "Thu, 18 Oct 2018 17:35:18 GMT". */
    nextAppointment: PropTypes.string,

    /*  The closests date available for booking. */
    nextAvailable: PropTypes.string,
  }),
};

const GET_QUEUES_BY_PROVIDER = {
  type: 'GET',
  url: '/provider/:providerId/queues',
  res: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    closed: PropTypes.bool.isRequired,
    numberOfAppointments: PropTypes.number.isRequired,
    nextAppointment: PropTypes.string,
    nextAvailable: PropTypes.string,
  })),
};

const CREATE_QUEUE = {
  type: 'POST:multipart/form-data',
  url: '/queue/new',
  req: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,

    /*  As if it was submitted by HTML <input type="file" name="photo">. */
    photo: PropTypes.instanceOf(Blob).isRequired,
  }),
  res: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    closed: PropTypes.bool.isRequired,
    numberOfAppointments: PropTypes.number.isRequired,
    nextAppointment: PropTypes.string,
    nextAvailable: PropTypes.string,
  }),
  requireCredentials: true,
};

const UPDATE_INFO = {
  type: 'PUT',
  url: '/queue/:id/update',
  req: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }),
  res: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    closed: PropTypes.bool.isRequired,
    numberOfAppointments: PropTypes.number.isRequired,
    nextAppointment: PropTypes.string,
    nextAvailable: PropTypes.string,
  }),
  requireCredentials: true,
};

/*  If a queue is closed, no requests can be sent.
    Accepted future appointments are still eligible. */
const SWITCH_CLOSED = {
  type: 'PUT',
  url: '/queue/:id/closed/update',
  req: {
    closed: true,
  },
  res: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    closed: PropTypes.bool.isRequired,
    numberOfAppointments: PropTypes.number.isRequired,
    nextAppointment: PropTypes.string,
    nextAvailable: PropTypes.string,
  }),
  requireCredentials: true,
};

/*  Deny if there is at least one accepted future appointment. */
const DELETE_QUEUE = {
  type: 'DELETE',
  url: '/queue/:id/delete',
  res: PropTypes.number.isRequired, // status code
  requireCredentials: true,
};

const GET_QUEUE_TIMESLOTS = {

};
