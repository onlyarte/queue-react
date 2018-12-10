import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';

import {
  Card, CardBody, Badge,
} from 'reactstrap';

function AppointmentCard({ appointment, className }) {
  let statusBadge;
  switch (appointment.status) {
    case 'REQUESTED':
      statusBadge = <Badge color="secondary">Очікуємо підтвердження</Badge>;
      break;
    case 'APPROVED':
      statusBadge = <Badge color="success">Підтверджено</Badge>;
      break;
    case 'CANCELED':
      statusBadge = <Badge color="danger">Скасовано</Badge>;
      break;
    case 'EXPIRED':
      statusBadge = <Badge color="secondary">Час вийшов</Badge>;
      break;
    default:
      statusBadge = <Badge color="secondary">{appointment.status}</Badge>;
  }

  return (
    <Card className={className}>
      <CardBody>
        <h4 className="text-primary">
          {new Moment(appointment.dateTimeFrom).format('HH:mm')}
          {' '}
          {new Moment(appointment.dateTimeFrom).format('DD.MM.YYYY')}
        </h4>

        <h4>{appointment.queue.name}</h4>

        <div style={{ lineHeight: 1.2 }}>
          <small>{appointment.queue.address}</small>
        </div>

        <div style={{ lineHeight: 1.2 }}>
          <small>{appointment.queue.phoneNumber}</small>
        </div>

        <div>
          {statusBadge}
        </div>
      </CardBody>
    </Card>
  );
}

AppointmentCard.defaultProps = {
  className: '',
};

AppointmentCard.propTypes = {
  appointment: PropTypes.shape({
    appointmentId: PropTypes.string.isRequired,
    dateTimeFrom: PropTypes.string.isRequired,
    dateTimeTo: PropTypes.string.isRequired,
    queue: PropTypes.shape({
      name: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      phoneNumber: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,

  className: PropTypes.string,
};

export default AppointmentCard;
