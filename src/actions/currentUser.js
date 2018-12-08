import axios from 'axios';
import { receiveUsers } from './entities/users';

export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const UNSET_CURRENT_USER = 'UNSET_CURRENT_USER';

export function setCurrentUser(currentUserId) {
  return {
    type: SET_CURRENT_USER,
    currentUserId,
  };
}

export function unsetCurrentUser() {
  return {
    type: UNSET_CURRENT_USER,
  };
}

export function logIn(email, password) {
  return dispatch => axios.post(
    '/api/login',
    { email, password },
    { withCredentials: true },
  )
    .then(({ data }) => {
      dispatch(receiveUsers([data]));
      dispatch(setCurrentUser(data.userId));
    })
    .catch(error => console.log(error));
}

export function signUp({
  email, password, name, phoneNumber, photo,
}) {
  return dispatch => axios.post(
    '/api/login',
    { email, password, name, phoneNumber, photo },
    { withCredentials: true },
  )
    .then(({ data }) => {
      dispatch(receiveUsers([data]));
      dispatch(setCurrentUser(data.userId));
    })
    .catch(error => console.log(error));
}

export function logOut() {
  return dispatch => dispatch(unsetCurrentUser());
}
