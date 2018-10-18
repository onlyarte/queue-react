import PropTypes from 'prop-types';

const CREATE_RANGE = {
  type: 'PUT',
  url: '/queue/:id/range/push',
  req: PropTypes.arrayOf(PropTypes.shape({
    from: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    period: PropTypes.number,
  })).isRequired,
  res: PropTypes.shape({
    id: PropTypes.string.isRequired,
    queue: PropTypes.string.isRequired,
    from: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    period: PropTypes.number,
  }).isRequired,
  requireCredentials: true,
};

const UPDATE_RANGE = {
  type: "PUT",
  url: '/queue/:queueId/range/:rangeId/update',
  req: {
    from: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    period: PropTypes.number,
  },
  res: PropTypes.shape({
    id: PropTypes.string.isRequired,
    queue: PropTypes.string.isRequired,
    from: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    period: PropTypes.number,
  }).isRequired,
  requireCredentials: true,
};

/*  Deny if the is at least one accepted appointment within the range. */
const DELETE_RANGE = {
  type: 'DELETE',
  url: '/queue/:queueId/range/:rangeId/delete',
  res: PropTypes.number.isRequired, // status code
  requireCredentials: true,
};
