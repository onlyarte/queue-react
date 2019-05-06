import React from 'react';
import PropTypes from 'prop-types';

import {
  Card, CardImg, CardBody, CardTitle, CardText,
} from 'reactstrap';

function UserQueueCard({ queue, className }) {
  return (
    <Card className={className}>
      <CardImg top width="100%" src="https://via.placeholder.com/500x300.png?text=Без фото" alt="Card image cap" />
      <CardBody>
        <CardTitle>{queue.name}</CardTitle>
        <CardText style={{ lineHeight: 1.2 }}>
          <small>{queue.description}</small>
        </CardText>
      </CardBody>
    </Card>
  );
}

UserQueueCard.defaultProps = {
  className: '',
};

UserQueueCard.propTypes = {
  queue: PropTypes.shape({
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  className: PropTypes.string,
};

export default UserQueueCard;
