import axios from 'axios';

import { setProviderQueues } from './users';


export const RECEIVE_QUEUES = 'RECEIVE_APPOINTMENTS';
export const SET_QUEUE_APPOINTMENTS = 'RECEIVE_QUEUE_APPOINTMENTS';

export function receiveQueues(queues) {
  return {
    type: RECEIVE_QUEUES,
    queues,
  };
}

export function setQueueAppointments(queueId, appointmentIds) {
  return {
    type: SET_QUEUE_APPOINTMENTS,
    appointmentIds,
  };
}

export function fetchQueue(queueId) {
  return dispatch => axios.get(
    `/api/queue/${queueId}`,
    { withCredentials: true },
  )
    .then(({ data }) => dispatch(receiveQueues([data])))
    .catch(error => console.log(error));
}

export function fetchQueuesByProvider(providerId) {
  return dispatch => axios.get(
    `/api/user/${providerId}/queues`,
    { withCredentials: true },
  )
    .then(({ data }) => {
      dispatch(receiveQueues(data));
      dispatch(setProviderQueues(data.map(q => q.queueId)));
    })
    .catch(error => console.log(error));
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
