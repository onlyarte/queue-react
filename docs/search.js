import PropTypes from 'prop-types';

const SEARCH_BY_QUEUE = {
  type: 'GET',
  url: '/search/queue?',
  req: {
    query: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
  },
  res: PropTypes.arrayOf(PropTypes.shape({
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
  })),
};

const SEARCH_BY_PROVIDER = {
  type: 'GET',
  url: '/search/provider?',
  req: {
    query: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
  },
  res: PropTypes.arrayOf(PropTypes.shape({
    userId: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
  })),
};
