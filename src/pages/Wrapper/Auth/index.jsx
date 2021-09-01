import { styles } from 'ansi-colors';
import React from 'react';
import { Redirect } from 'umi';
import { connect } from 'dva';
const Auth = (props) => {
  const { changeLogin, isLogin } = props;
  const login = isLogin || localStorage.getItem('login');
  if (login) {
    return <div className={styles.AuthBox}>{props.children}</div>;
  } else {
    return <Redirect to="/login"></Redirect>;
  }
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
        dispatch({ type: 'global/setState', payload: data });
      },
    };
  },
)(Auth);
