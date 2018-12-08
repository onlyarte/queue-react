import { SET_CURRENT_USER, UNSET_CURRENT_USER } from '../actions/currentUser';

const currentUser = (state = null, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return action.currentUserId;
    case UNSET_CURRENT_USER:
      return null;
    default:
      return state;
  }
};

export default currentUser;
