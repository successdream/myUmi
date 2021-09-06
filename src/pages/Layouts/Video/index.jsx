import React from 'react';
import styles from './index.less';
import VideoFiv from './components/VideoFiv';

const Video = () => {
  return (
    <div className={styles.videoBox}>
      <div>我是视频组件</div>
      <div className={styles.videoInnerBox}>
        <VideoFiv
          mdsUserId="34021019611312340013"
          name={'test '}
          position="event"
          mode="mode"
          phone={'015188399413'}
          serverUrl={'http://119.3.144.189:8095/smcs/'}
        ></VideoFiv>
        {/* 
          <VideoFIV
                                                mode="mode"
                                                mdsUserId={item.rcsGbid || item.code}
                                                name={item.name}
                                                position='event'
                                                phone={item.rcsSubNumber || item.phoneNo || item.phone || item.mobile}
                                                // serverUrl="http://192.168.200.60:8095/smcs"
                                                serverUrl={process.env.NODE_ENV === "development" ? "http://119.3.144.189:8095/smcs/" : "http://192.168.200.60:8095/smcs"}
                                                onComplete={this.onComplete}
                                                onClick={() => this.handleClose(item)}

                                            ></VideoFIV> */}
      </div>
    </div>
  );
};

export default Video;
