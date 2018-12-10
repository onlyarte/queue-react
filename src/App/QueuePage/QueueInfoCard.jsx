import React from 'react';
import PropTypes from 'prop-types';

import {
  Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText,
} from 'reactstrap';

function QueueInfoCard({ queue }) {
  return (
    <Card className="mb-5">
      <CardImg
        top
        width="100%"
        src="https://placeholdit.imgix.net/~text?txtsize=33&txtclr=ffffff&txt=Без фото&w=500&h=300&bg=364681"
        alt="User image"
      />

      <CardBody>
        <CardTitle>{queue.name}</CardTitle>

        <CardSubtitle className="text-muted mb-2">
          <small>{queue.address}</small>
        </CardSubtitle>

        <CardSubtitle className="text-muted mb-2">
          <a href={`tel:${queue.phoneNumber}`}>{queue.phoneNumber}</a>
        </CardSubtitle>

        <CardText style={{ lineHeight: 1.2 }}>{queue.description}</CardText>
      </CardBody>
    </Card>
  );
}

QueueInfoCard.propTypes = {
  queue: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
  }).isRequired,
};

export default QueueInfoCard;
