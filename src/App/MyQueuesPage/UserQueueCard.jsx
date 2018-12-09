import React from 'react';
import PropTypes from 'prop-types';

import {
  Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText,
} from 'reactstrap';

function QueueSearchCard({ queue, className }) {
  return (
    <Card className={className}>
      <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txtclr=ffffff&txt=Без фото&w=500&h=300&bg=364681" alt="Card image cap" />
      <CardBody>
        <CardTitle>{queue.name}</CardTitle>
        <CardText style={{ lineHeight: 1.2 }}>
          <small>{queue.description}</small>
        </CardText>
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
