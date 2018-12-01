import axios from 'axios';
import { fetchQueue } from './queue';

export const RECEIVE_APPOINTMENTS = 'RECEIVE_APPOINTMENTS';

export function requestAppointment(appointmentId, queueId) {
  return (dispatch, getState) => {
    const { userId } = getState().user;

    axios.patch(
      `/api/appointment/${appointmentId}/request?client=${userId}`,
      null,
      { withCredentials: true },
    )
      .then(() => dispatch(fetchQueue(queueId)));
  };
}

export function approveAppointment(appointmentId, queueId) {
  return dispatch => axios.patch(
    `/api/appointment/${appointmentId}/approve`,
    null,
    { withCredentials: true },
  )
    .then(() => dispatch(fetchQueue(queueId)));
}

export function cancelAppointment(appointmentId, queueId) {
  return dispatch => axios.patch(
    `/api/appointment/${appointmentId}/cancel`,
    null,
    { withCredentials: true },
  )
    .then(() => dispatch(fetchQueue(queueId)));
}

export function deleteAppointment(appointmentId, queueId) {
  return dispatch => axios.delete(
    `/api/appointment/${appointmentId}`,
  )
    .then(() => dispatch(fetchQueue(queueId)));
}
