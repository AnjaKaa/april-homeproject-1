import { call, select, put } from 'redux-saga/effects';

import requestFlow from './request';
import { getIsNetworkErrorPresent, addError, clearError } from '../ducks/network';

describe('Тестирование саги #requestFlow', () => {
  describe('without error', () => {
    const fn = login => {
      return 1 + 1;
    };
    const args = { login: 'test' };
    const sagaIterator = requestFlow(fn, args);

    it('call fn getUserFollowers', () => {
      expect(sagaIterator.next().value).toEqual(call(fn, args));
    });

    it('select getIsNetworkErrorPresent', () => {
      expect(sagaIterator.next().value).toEqual(select(getIsNetworkErrorPresent));
    });

    it('put clearError', () => {
      expect(sagaIterator.next(true).value).toEqual(put(clearError()));
    });
  });

  describe('with error', () => {
    const fn = login => {
      return 1 + 1;
    };
    const args = { login: 'test' };
    const sagaIterator = requestFlow(fn, args);

    it('call fn getUserFollowers', () => {
      expect(sagaIterator.next().value).toEqual(call(fn, args));
    });

    it('select getIsNetworkErrorPresent', () => {
      expect(sagaIterator.next().value).toEqual(select(getIsNetworkErrorPresent));
    });

    it('put addError', () => {
      const error = new Error('test error');
      expect(sagaIterator.throw(error).value).toEqual(put(addError(error)));
    });
  });
});
