import styles from './index.less';
import React, { useContext, useEffect } from 'react';
import { ThemContext } from '@/ThemContext';
import { Link, history } from 'umi';
import { Button } from 'antd';
import { connect } from 'dva';

// import _ from 'lodash'
const Layouts = (props) => {
  const { changeLogin } = props;
  console.log(ThemContext, 'ThemContext');
  // console.log( _, 'Layouts')
  const theme = useContext(ThemContext);

  useEffect(() => {
    console.log(theme, 'theme');
    // const data = _.cloneDeep({ a: 1, b: 2});
    // console.log(data, 'lodash')
  }, [theme]);
  const handleLoginOut = () => {
    changeLogin({ isLogin: false });
    localStorage.removeItem('login');
    history.push('/login');
  };
  return (
    <div className={styles.layOuts}>
      <h1 className={styles.title}>我是layOuts组件</h1>
      <Link to="/users">Users Page</Link>
      <Button onClick={handleLoginOut}>登出</Button>
      <div className={styles.imgBox}></div>
      <div style={{ width: '500px', height: '500px' }}>{props.children}</div>
      {/* <img src={imgIcon} alt="" /> */}
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
        dispatch({ type: 'global/setState', payload: data });
      },
    };
  },
)(Layouts);
