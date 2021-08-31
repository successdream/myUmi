import React from 'react';
import styles from './index';
import { Button } from 'antd';
import { history } from 'umi';
import { connect } from 'dva'

const User = (props) => {
    const handleClick = () => {
        history.push('/')
    }
    return (
        <div className={ styles.userBox }>
            我是User页面
            <Button onClick={handleClick}> 跳转到首页 </Button>
        </div>
    )
}

export default User;