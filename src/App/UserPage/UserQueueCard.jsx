import React from 'react';
import PropTypes from 'prop-types';

import {
  Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText,
} from 'reactstrap';

function QueueSearchCard({ queue, className }) {
  return (
    <Card className={className}>
      <CardImg top width="100%" src="https://via.placeholder.com/500x300.png?text=Без фото" alt="Card image cap" />
      <CardBody>
        <CardTitle>{queue.name}</CardTitle>

        <CardSubtitle className="text-muted mb-2">
          <small>{queue.address}</small>
        </CardSubtitle>

        <CardSubtitle className="text-muted mb-2">
          <small>{queue.phoneNumber}</small>
        </CardSubtitle>

        <CardText style={{ lineHeight: 1.2 }}>{queue.description}</CardText>
      </CardBody>
    </Card>
  );
}

QueueSearchCard.defaultProps = {
  className: '',
};

QueueSearchCard.propTypes = {
  queue: PropTypes.shape({
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  className: PropTypes.string,
};

export default QueueSearchCard;
