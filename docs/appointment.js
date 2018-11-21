import PropTypes from 'prop-types';

const STATUSES = {
  CREATED: 'CREATED',
  REQUESTED: 'REQUESTED',
  APPROVED: 'APPROVED',
  CANCELED: 'CANCELED',
  EXPIRED: 'EXPIRED',
};

const DELETE_APPOINTMENT = {
  type: 'DELETE',
  url: '/appointment/:id',
  res: PropTypes.number.isRequired, // status code
  requireCredentials: true,
};

const REQUEST_APPOINTMENT = {
  type: 'PATCH',
  url: '/appointment/:id/client/:clientId/status/requested',
  res: PropTypes.number.isRequired, // status code
  requireCredentials: true,
};

const APPROVE_APPOINTMENT = {
  type: 'PATCH',
  url: '/appointment/:id/status/approve',
  res: PropTypes.number.isRequired, // status code
  requireCredentials: true,
};

const CANCEL_APPOINTMENT = {
  type: 'PATCH',
  url: '/appointment/:id/status/canceled',
  res: PropTypes.number.isRequired, // status code
  requireCredentials: true,
};
