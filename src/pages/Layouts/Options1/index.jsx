import React, { useState, useEffect } from 'react';
import styles from './index.less';
import { connect } from 'dva';
import { Button } from 'antd';

const Options1 = (props) => {
  const { test, changeTest } = props;
  const handleClick = () => {
    changeTest({ test: 666 });
  };
  useEffect(() => {
    console.log(test);
  }, [test]);
  return (
    <div className={styles.options1Box}>
      <div>options1</div>
      <Button type="primary" onClick={handleClick}>
        {' '}
        testModal{' '}
      </Button>
      <div>{test}</div>
    </div>
  );
};

export default connect(
  ({ global }) => {
    return {
      isLogin: global.isLogin,
      test: global.test,
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
    };
  },
)(Options1);

// export default connect(
//   (state) => {
//     return {
//       test: '2121'
//     }
//   },
//   (dispatch) => ({
//     changeTest: (data) => {

//     }
//   })
// )(Options1);
