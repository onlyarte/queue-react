import PropTypes from 'prop-types';

const GET_BY_CLIENT = {
  type: 'GET',
  url: '/queue/client/:clientUsername',
  res: PropTypes.arrayOf(PropTypes.shape({
    
  })),
};

const GET_BY_PROVIDER = {
  type: 'GET',
  url: '/queue/provider/:providerUsername',
  res: {

  },
};

const GET_BY_ID = {

};

