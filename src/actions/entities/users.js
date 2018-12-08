import axios from 'axios';

export const RECEIVE_USERS = 'RECEIVE_USERS';
export const SET_PROVIDER_QUEUES = 'SET_PROVIDER_QUEUES';
export const SET_CLIENT_APPOINTMENTS = 'SET_CLIENT_APPOINTMENTS';

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

export function setProviderQueues(queueIds) {
  return {
    type: SET_PROVIDER_QUEUES,
    queueIds,
  };
}

export function setClientAppointments(appointmentIds) {
  return {
    type: SET_CLIENT_APPOINTMENTS,
    appointmentIds,
  };
}

export function fetchUser(userId) {
  return (dispatch) => {
    axios.get(
      `/api/user/${userId}`,
      { withCredentials: true },
    )
      .then(({ data }) => dispatch(receiveUsers([data])))
      .catch(error => console.log(error));
  };
}

export function createQueue({
  name, description, address, phoneNumber, tags,
}) {
  return dispatch => axios.post(
    '/api/queue',
    {
      name, description, address, phoneNumber, tags,
    },
    { withCredentials: true },
  )
    .then(({ data }) => dispatch(receiveQueues([data])))
    .catch(error => console.log(error));
}

export function updateQueue(queueId, updates) {
  return dispatch => axios.patch(
    `/queue/${queueId}`,
    updates,
    { withCredentials: true },
  )
    .then(({ data }) => dispatch(receiveQueues([data])))
    .catch(error => console.log(error));
}

export function deleteQueue(queueId) {
  return dispatch => axios.delete(
    `/api/queue/${queueId}`,
    { withCredentials: true },
  )
    .then(() => dispatch(fetchQueue(queueId)))
    .catch(error => console.log(error));
}
