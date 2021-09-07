import styles from './index.less';
import React, { useContext, useEffect } from 'react';
import { ThemContext } from '@/ThemContext';
import { Link, history, useModel } from 'umi';
import { Button } from 'antd';
import { connect } from 'dva';
import SideBar from './SideBar';

// import _ from 'lodash'
const Layouts = (props) => {
  const { signout } = useModel('useAuthModel', (model) => {
    // alert(666)
    // debugger
    return { signout: model.signout };
  });

  console.log(ThemContext, 'ThemContext');
  // console.log( _, 'Layouts')
  const theme = useContext(ThemContext);
  // window.addEventListener('beforeunload', () => {
  //   alert(7777)
  //   return '12223?'
  // })
  useEffect(() => {
    // console.log
    // window.onbeforeunload=function(){
    //   // alert(777)
    //   return '1231'
    // };
  }, []);
  window.onunload = (e) => {
    // debugger
    // debugger
    e = e || window.event;
    if (e) {
      e.returnValue = '关闭提示';
    }
    const str = localStorage.getItem('store') || '1';

    localStorage.setItem('store', Number(str) + 1 + '');
    // this.toCloseFun()//调用自己的方法
    // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
    return '关闭提示';
  };

  //  window.addEventListener('')
  useEffect(() => {
    console.log(theme, 'theme');
    // window.addEventListener('unload', (e) => {
    //   e = e || window.event;
    //   const str = localStorage.getItem('store') || '1';

    //   localStorage.setItem('store',  Number(str) + 1 + '')
    //   // this.toCloseFun()//调用自己的方法
    //   // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
    //   return '关闭提示';
    //  })
    // const data = _.cloneDeep({ a: 1, b: 2});
    // console.log(data, 'lodash')
  }, [theme]);
  const handleLoginOut = () => {
    // changeLogin({ isLogin: false });
    // localStorage.removeItem('login');
    // history.push('/login');
    signout();
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
