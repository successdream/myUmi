import React, { useEffect } from 'react';
import styles from './index.less';
import { Button } from 'antd';
import { connect } from 'dva';
import { history, useModel } from 'umi';
import { testUtils } from '@utils';
const Login = (props) => {
  // console.log(user, 'user-user')
  const { signin } = useModel('useAuthModel', (model) => ({
    signin: model.signin,
  }));

  useEffect(() => {
    testUtils();
  }, []);
  const handelLogin = () => {
    // changeLogin({ isLogin: true });
    // localStorage.setItem('login', true);
    // history.push('/');
    signin({ account: 'zhangsan', password: '123456' });
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
