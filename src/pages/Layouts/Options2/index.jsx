import React, { useEffect } from 'react';
import styles from './index.less';
import { Button } from 'antd';
import { connect } from 'dva';
// import { useEffect } from '';

const Options2 = (props) => {
  const { currentOptions, changeCurrentOptions } = props;
  useEffect(() => {
    // const fn = (e) => {
    //   e = e || window.event;
    //   const str = localStorage.getItem('store') || '1';
    //   localStorage.setItem('store',  Number(str) + 1 + '')
    //   // this.toCloseFun()//调用自己的方法
    //   // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
    //   return '关闭提示';
    // }
    // window.addEventListener('beforeunload', fn)
    //  return () => {
    //   window.removeEventListener('beforeunload', fn)
    //  }
  }, []);
  const handleClick = () => {
    changeCurrentOptions({
      currentOptions: 'options2',
    });
    localStorage.removeItem('store');
  };
  return (
    <div>
      <div>options2</div>
      <div>
        <Button type="primary" onClick={handleClick}>
          按钮
        </Button>
      </div>
      <div>当前的options: {currentOptions}</div>
    </div>
  );
};

// export default Options2;
// export default connect(
//   ({ global, options, user }) => ({
//     currentOptions: options.options,
//   }),
//   (dispatch) => ({
//     changeCurrentOptions: (data) => {
//       dispatch(
//         {
//           type: 'options/setState',
//           payload: data
//         }
//       )
//     }
//   })
// )(Options2) ;

export default connect(
  ({ global, options }) => {
    return {
      isLogin: global.isLogin,
      test: global.test,
      currentOptions: options.currentOptions,
    };
  },
  (dispatch) => {
    return {
      changeLogin: (data) => {
        dispatch({ type: 'global/setState', payload: data });
      },
      changeTest: (data) => {
        dispatch({ type: 'global/testEffectFn', payload: data });
      },
      changeCurrentOptions: (data) => {
        dispatch({ type: 'options/setState', payload: data });
      },
    };
  },
)(Options2);
