import React, { useEffect } from 'react';
import styles from './index.less';
import { Button } from 'antd';
import { connect } from 'dva';
import { history, useModel } from 'umi';
import { testUtils } from '@utils';
const Login = (props) => {
  const { changeLogin } = props;
  // const modal = useModel('global');
  // useEffect(() => {
  //     console.log(modal)
  // }, [modal])
  // console.log(modal, 'modal')
  useEffect(() => {
    // const store = window.g_app._store;
    // console.log(store, 'store')
    testUtils();
  }, []);
  const handelLogin = () => {
    changeLogin({ isLogin: true });
    localStorage.setItem('login', true);
    history.push('/');
  };
  return (
    <div className={styles.login}>
      我是login
      <Button onClick={handelLogin}>登录</Button>
    </div>
  );
};

export default connect(
  ({ global }) => {
    return {
      isLogin: global.isLogin,
    };
  },
  (dispatch) => {
    return {
      changeLogin: (data) => {
        dispatch({ type: 'global/changeLogin', payload: data });
      },
    };
  },
)(Login);
