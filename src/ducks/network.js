import { combineReducers } from 'redux';
import { handleActions, createActions } from 'redux-actions';

const {
  network: { networkError, clearNetworkErrors },
} = createActions({
  NETWORK: {
    ADD_ERROR: null,
    CLEAR_ERROR: null,
  },
});

const error = handleActions(
  {
    [networkError]: (state, action) => action.payload,
    [clearNetworkErrors]: () => null,
  },
  null,
);

const message = handleActions(
  {
    [networkError]: (state, action) => {
      let message = 'Непредвиденная ошибка';
      const response = action.payload.response;

      if (response && response.data) {
        message = response.data.message || message;
      }
      return message;
    },
    [clearNetworkErrors]: () => null,
  },
  null,
);

export default combineReducers({
  error,
  message,
});

export { networkError, clearNetworkErrors };

export const getIsNetworkErrorPresent = state => state.network.error !== null;
export const getErrorMessage = state => state.network.message;
