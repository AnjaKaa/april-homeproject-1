import { fork } from 'redux-saga/effects';
import { authFlow } from './auth';
import { fetchUserWatch } from './users';
import { fetchFollowersWatch } from './followers';

export default function*() {
  yield fork(authFlow);
  yield fork(fetchUserWatch);
  yield fork(fetchFollowersWatch);
}
