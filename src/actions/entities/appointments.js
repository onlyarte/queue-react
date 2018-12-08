import axios from 'axios';
import { setQueueAppointments } from './queues';
import { setClientAppointments } from './users';

export const RECEIVE_APPOINTMENTS = 'RECEIVE_APPOINTMENTS';

export function receiveAppointments(appointments) {
  return {
    type: RECEIVE_APPOINTMENTS,
    appointments,
  };
}

export function fetchAppointmentsByClient(clientId) {
  return dispatch => axios.get(
    `/api/user/${clientId}/appointments`,
    { withCredentials: true },
  )
    .then(({ data }) => {
      dispatch(receiveAppointments(data));
      dispatch(setClientAppointments(data.map(a => a.appointmentId)));
    })
    .catch(error => console.log(error));
}

export function fetchAppointmentsByQueue(queueId) {
  return dispatch => axios.get(
    `/api/queue/${queueId}/appointments`,
    { withCredentials: true },
  )
    .then(({ data }) => {
      dispatch(receiveAppointments(data));
      dispatch(setQueueAppointments(queueId, data.map(a => a.appointmentId)));
    })
    .catch(error => console.log(error));
}

export function requestAppointment(appointmentId) {
  return (dispatch, getState) => {
    const { currentUser } = getState();

    axios.patch(
      `/api/appointment/${appointmentId}/request?client=${currentUser}`,
      null,
      { withCredentials: true },
    )
      .catch(error => console.log(error));
  };
}

export function approveAppointment(appointmentId) {
  return (dispatch, getState) => {
    const { queueId } = getState().entities.appointments[appointmentId];

    return axios.patch(
      `/api/appointment/${appointmentId}/approve`,
      null,
      { withCredentials: true },
    )
      .then(() => dispatch(fetchAppointmentsByQueue(queueId)))
      .catch(error => console.log(error));
  };
}

export function cancelAppointment(appointmentId) {
  return (dispatch, getState) => {
    const { queueId } = getState().entities.appointments[appointmentId];

    return axios.patch(
      `/api/appointment/${appointmentId}/cancel`,
      null,
      { withCredentials: true },
    )
      .then(() => dispatch(fetchAppointmentsByQueue(queueId)))
      .catch(error => console.log(error));
  };
}

export function deleteAppointment(appointmentId) {
  return (dispatch, getState) => {
    const { queueId } = getState().entities.appointments[appointmentId];

    return axios.delete(
      `/api/appointment/${appointmentId}`,
      { withCredentials: true },
    )
      .then(() => dispatch(fetchAppointmentsByQueue(queueId)))
      .catch(error => console.log(error));
  };
}
