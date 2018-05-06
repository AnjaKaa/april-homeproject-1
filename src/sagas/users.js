import { takeLatest, call, put } from 'redux-saga/effects';
import { getTokenOwner, getUserInformation } from '../api';
import { fetchRequest, fetchSuccess, fetchFailure } from '../ducks/users';
import requestFlow from './request';

export function* fetchUserWatch() {
  yield takeLatest(fetchRequest, fetchUserFlow);
}

export function* fetchUserFlow(action) {
  try {
    let response = null;
    if (action.payload) {
      response = yield call(requestFlow, getUserInformation, action.payload);
    } else {
      response = yield call(requestFlow, getTokenOwner);
    }
    yield put(fetchSuccess(response.data));
  } catch (error) {
    yield put(fetchFailure(error));
  }
}
