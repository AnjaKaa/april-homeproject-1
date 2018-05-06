import { call, put, select, take } from 'redux-saga/effects';
import { authorize, logout } from '../ducks/auth';
import * as api from 'api';
import {
  getTokenFromLocalStorage,
  setTokenToLocalStorage,
  removeTokenFromLocalStorage,
} from '../localStorage';

export function* authFlow(action) {
  console.log('authFlow');

  while (true) {
    let token;
    const isAuthorized = yield select(authorize);
    const localStorageToken = yield call(getTokenFromLocalStorage);

    if (!isAuthorized && localStorageToken) {
      token = localStorageToken;
      yield put(authorize);
    } else {
      const action = yield take(authorize);
      token = action.payload;
    }

    yield call(api.setTokenApi, token);
    yield call(setTokenToLocalStorage, token);

    yield take(logout);

    yield call(removeTokenFromLocalStorage);
    yield call(api.clearTokenApi);
  }
}
