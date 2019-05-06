import React from 'react';
import PropTypes from 'prop-types';

import {
  Card, CardImg, CardBody, CardTitle, CardSubtitle,
} from 'reactstrap';

function ProviderSearchCard({ provider, className }) {
  return (
    <Card className={className}>
      <CardImg top width="100%" src="https://via.placeholder.com/400x300.png?text=Без фото" alt="Card image cap" />
      <CardBody>
        <CardTitle>{provider.name}</CardTitle>

        <CardSubtitle className="text-muted mb-2">
          {provider.address}
        </CardSubtitle>

        <CardSubtitle className="text-muted">
          {provider.phoneNumber}
        </CardSubtitle>
      </CardBody>
    </Card>
  );
}

ProviderSearchCard.defaultProps = {
  className: '',
};

ProviderSearchCard.propTypes = {
  provider: PropTypes.shape({
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
  }).isRequired,
  className: PropTypes.string,
};

export default ProviderSearchCard;
