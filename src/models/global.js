import { testApi } from '@services/test.js';
export default {
  namespace: 'global',
  state: {
    isLogin: false,
    test: '',
  },
  effects: {
    *testEffectFn({ payload }, { call, put, select }) {
      const res = yield call(testApi, { payload });
      console.log(res, 'res');
      yield put({
        type: 'setState',
        payload: res,
      });
    },
  },
  reducers: {
    setState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
