import axios from 'axios';
import qs from 'qs';

import { receiveQueues } from './entities/queues';
import { receiveUsers } from './entities/users';

export const SET_LOADING = 'SET_LOADING';
export const SET_FOUND_QUEUES = 'SET_FOUND_QUEUES';
export const SET_FOUND_PROVIDERS = 'SET_FOUND_PROVIDERS';

export function setLoading(loading) {
  return {
    type: SET_LOADING,
    loading,
  };
}

export function setFoundQueues(queueIds) {
  return {
    type: SET_FOUND_QUEUES,
    queueIds,
  };
}

export function setFoundProviders(providerIds) {
  return {
    type: SET_FOUND_PROVIDERS,
    providerIds,
  };
}

export function findQueues(query, location) {
  return (dispatch) => {
    dispatch(setLoading(true));

    const queryString = qs({ query, location });

    axios.get(
      `/api/search/queue?${queryString}`,
      { withCredentials: true },
    )
      .then(({ data }) => {
        dispatch(receiveQueues(data));
        dispatch(setFoundQueues(data.map(q => q.queueId)));
        dispatch(setLoading(false));
      })
      .catch(error => console.log(error));
  };
}

export function findProviders(query, location) {
  return (dispatch) => {
    dispatch(setLoading(true));

    const queryString = qs({ query, location });

    axios.get(
      `/api/search/queue?${queryString}`,
      { withCredentials: true },
    )
      .then(({ data }) => {
        dispatch(receiveUsers(data));
        dispatch(setFoundProviders(data.map(u => u.userId)));
        dispatch(setLoading(false));
      })
      .catch(error => console.log(error));
  };
}
