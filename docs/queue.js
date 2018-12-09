import PropTypes from 'prop-types';

const GET_QUEUE_BY_ID = {
  type: 'GET',
  url: '/queue/:id',
  res: PropTypes.shape({
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
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
};

const CREATE_QUEUE = {
  type: 'POST',
  url: '/queue',
  req: PropTypes.shape({
    providerId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
  res: PropTypes.shape({
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
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
  requireCredentials: true,
};

const UPDATE_INFO = {
  type: 'PATCH',
  url: '/queue/:id',
  req: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
  res: PropTypes.shape({
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
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
  requireCredentials: true,
};

/*  Deny if there is at least one accepted future appointment. */
const DELETE_QUEUE = {
  type: 'DELETE',
  url: '/queue/:id',
  res: PropTypes.number.isRequired, // status code
  requireCredentials: true,
};

const CREATE_APPOINTMENTS = {
  type: 'POST',
  url: '/queue/:id/appointments',
  req: PropTypes.shape({
    slots: PropTypes.arrayOf(PropTypes.shape({
      dateTimeFrom: PropTypes.string.isRequired,
      dateTimeTo: PropTypes.string.isRequired,
    })).isRequired,
  }),
  res: PropTypes.number.isRequired, // status code
  requireCredentials: true,
};

const GET_APPOINTMENTS_BY_QUEUE = {
  type: 'GET',
  url: '/queue/:id/appointments/status/:status',
  res: PropTypes.arrayOf(PropTypes.shape({
    appointmentId: PropTypes.string.isRequired,
    queueId: PropTypes.string.isRequired,
    client: PropTypes.shape({
      userId: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      phoneNumber: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      photo: PropTypes.string.isRequired,
    }).isRequired,
    dateTimeFrom: PropTypes.string.isRequired,
    dateTimeTo: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  })).isRequired,
  requireCredentials: true,
};
