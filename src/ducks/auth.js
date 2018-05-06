import { combineReducers } from 'redux';
import { handleActions, createActions } from 'redux-actions';

const {
  auth: { authorize, logout },
} = createActions({
  AUTH: {
    AUTHORIZE: null,
    LOGOUT: null,
  },
});

const isAuthorized = handleActions(
  {
    [authorize]: () => true,
    [logout]: () => false,
  },
  false,
);

export default combineReducers({
  isAuthorized,
});

export { authorize, logout };

export const getIsAuthorized = state => state.auth.isAuthorized;
