import styles from './index.less';
import React, { useContext, useEffect } from 'react';
import { ThemContext } from '@/ThemContext';
import { Link, history } from 'umi';
import { Button } from 'antd';
import { connect } from 'dva';
import SideBar from './SideBar';

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
      <div className={styles.layOutHeader}>
        <div className={styles.headerLabel}>header 组件</div>
        <div className={styles.loginOut} onClick={handleLoginOut}>
          登出
        </div>
      </div>
      <div className={styles.contentBox}>
        <div className={styles.sideBarBox}>
          <SideBar />
        </div>
        <div className={styles.leftContentBox}>{props.children}</div>
      </div>
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
)(Layouts);
