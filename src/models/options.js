import { testApi } from '@services/test.js';
export default {
  namespace: 'options',
  state: {
    currentOptions: 'options1',
  },
  effects: {
    // *testEffectFn({ payload }, { call, put, select }) {
    //   const res = yield call(testApi, { payload });
    //   console.log(res, 'res');
    //   yield put({
    //     type: 'setState',
    //     payload: res,
    //   });
    // },
  },
  reducers: {
    setState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    //     changeLogin(state, { payload }) {
    //       state.isLogin = payload.isLogin;
    //     },
  },
};
