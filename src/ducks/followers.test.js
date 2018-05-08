import reducer, { fetchRequest, fetchSuccess, fetchFailure } from './followers';

const INIT_STATE = {
  isFetching: false,
  error: null,
  data: [],
};

describe('Тестирование редьюсера followers', () => {
  it('инициализация State', () => {
    const state0 = reducer(undefined, { type: '@@TEST/INIT' });

    expect(state0).toEqual(INIT_STATE);
  });

  it('проверка экшена fetchRequest', () => {
    const state = reducer(INIT_STATE, fetchRequest());

    expect(state.isFetching).toBeTruthy();
    expect(state.error).toBeNull();
    expect(state.data).toBeNull();
  });

  it('проверка экшена fetchSuccess', () => {
    const payload = [{ login: 'test' }];
    const state = reducer(INIT_STATE, fetchSuccess(payload));

    expect(state.isFetching).toBeFalsy();
    expect(state.error).toBeNull();
    expect(state.data).toEqual(payload);
  });

  it('проверка экшена fetchFailure', () => {
    const payload = { message: 'error' };
    const state = reducer(INIT_STATE, fetchFailure(payload));

    expect(state.isFetching).toBeFalsy();
    expect(state.error).toEqual(payload);
    expect(state.data).toEqual([]);
  });
});
