import styles from './index.less';
import React from 'react';
import { Redirect, useModel, connect } from 'umi';
const Auth = (props) => {
  const { login } = useModel('useAuthModel', (model) => {
    return { login: model.login };
  });

  if (login) {
    return <div className={styles.AuthBox}>{props.children}</div>;
  } else {
    return <Redirect to="/login"></Redirect>;
  }
};

export default Auth;

// export default connect(
//   ({ global }) => {
//     return {
//       isLogin: global.isLogin,
//     };
//   },
//   (dispatch) => {
//     return {
//       changeLogin: (data) => {
//         dispatch({ type: 'global/setState', payload: data });
//       },
//     };
//   },
// )(Auth);
