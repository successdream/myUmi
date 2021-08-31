import React, { useEffect } from 'react';
import styles from './index.less';
import { Button } from 'antd';
import { connect } from 'dva';
import { history } from 'umi'
const Login = (props) => {
    const { changeLogin } = props;

    useEffect(() => {
        const store = window.g_app._store;
        console.log(store, 'store')
    }, [])
    const handelLogin = () => {
        changeLogin({ isLogin: true});
        localStorage.setItem('login', true);
        history.push('/')
    }
    return (
        <div className={ styles.login }>
            我是login
            <Button onClick={ handelLogin}>登录</Button>
        </div>
    )
}

 export default connect(
    ({ global }) => {
        return {
            isLogin: global.isLogin
        }
    },
    ( dispatch) => {
        return {
            changeLogin: (data) => {
                dispatch({ type: 'global/setState', payload: data })
            }
        }
    })(Login);