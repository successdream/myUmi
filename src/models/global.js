export default {
    namespace: 'global',
    state: {
        isLogin: false
    },
    effects: {

    },
    reducers: {
        setState(state, { payload}){
            return {
                ...state,
                ...payload
            }
        }
    }
}