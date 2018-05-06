import { takeLatest, call, put } from 'redux-saga/effects';
import { getUserFollowers } from '../api';
import { fetchRequest, fetchSuccess, fetchFailure } from '../ducks/followers';
import requestFlow from './request';

export function* fetchFollowersWatch() {
  yield takeLatest(fetchRequest, fetchFollowersFlow);
}

export function* fetchFollowersFlow(action) {
  try {
    const response = yield call(requestFlow, getUserFollowers, action.payload);
    yield put(fetchSuccess(response.data));
  } catch (error) {
    yield put(fetchFailure(error));
  }
}
