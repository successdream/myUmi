import styles from './index.less';
import React, { useContext, useEffect} from 'react';
import { ThemContext } from '@/ThemContext'

export default function Layouts(props) {
  console.log(ThemContext, 'ThemContext')
  const theme = useContext(ThemContext);
  useEffect(() => {
    console.log(theme, 'theme')

  }, [theme])
  
  return (
    <div className={ styles.layOuts }>
      <h1 className={styles.title}>我是layOuts组件</h1>
      <div>{ JSON.stringify(theme)}</div>
      {/* <div>
          { props.children }
      </div> */}
    </div>
  );
}
