import React from 'react';
import PropTypes from 'prop-types';

import {
  Card, CardImg, CardBody, CardTitle, CardSubtitle,
} from 'reactstrap';

function UserInfoCard({ user }) {
  return (
    <Card>
      <CardImg
        top
        width="100%"
        src="https://via.placeholder.com/600x400.png?text=Без фото"
        alt="User image"
      />

      <CardBody>
        <CardTitle tag="h3">
          {user.name}
        </CardTitle>

        <CardSubtitle className="text-muted mb-3">
          {user.address}
        </CardSubtitle>

        <CardSubtitle className="mb-2">
          <a href={`tel:${user.phoneNumber}`}>{user.phoneNumber}</a>
        </CardSubtitle>

        <CardSubtitle className="mb-2">
          <a href={`mailto:${user.email}`}>{user.email}</a>
        </CardSubtitle>
      </CardBody>
    </Card>
  );
}

UserInfoCard.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserInfoCard;
