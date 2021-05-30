import { loginService } from './service'
const LoginModel = {
    namespace: 'loginmodel',
    state: {
        userInfo: { username: 'halo' }
    },
    reducers: {
        managerLogin(state, action) {
            console.log(action)
            return action.payload
        }
    },
    effects: {
        *login(action, { put, call, select }) {
            // const userInfo = yield call(loginService);
            const userInfo = { username: 'nihao' }
            yield put({
                type: 'managerLogin',
                payload: { userInfo: userInfo }
            })
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname }) => {
                if (pathname === '/login') {
                    dispatch({
                        type: 'login'
                    })
                }
            })
        }
    }
}
export default LoginModel;