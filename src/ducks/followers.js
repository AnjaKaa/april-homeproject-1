import { combineReducers } from 'redux';
import { handleActions, createActions } from 'redux-actions';

const {
  followers: { fetchRequest, fetchSuccess, fetchFailure },
} = createActions({
  FOLLOWERS: {
    FETCH_REQUEST: null,
    FETCH_SUCCESS: null,
    FETCH_FAILURE: null,
  },
});

const isFetching = handleActions(
  {
    [fetchRequest]: () => true,
    [fetchSuccess]: () => false,
    [fetchFailure]: () => false,
  },
  false,
);

const error = handleActions(
  {
    [fetchRequest]: () => null,
    [fetchSuccess]: () => null,
    [fetchFailure]: (state, action) => action.payload,
  },
  null,
);

const data = handleActions(
  {
    [fetchRequest]: (state, action) => null,
    [fetchSuccess]: (state, action) => action.payload,
  },
  [],
);

export default combineReducers({
  isFetching,
  error,
  data,
});

export { fetchRequest, fetchSuccess, fetchFailure };

export const getIsFetching = state => state.followers.isFetching;
export const getData = state => state.followers.data;
