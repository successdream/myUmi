import React, { useEffect, useRef } from 'react';
import styles from './index.less';
import 'xgplayer';
import PlayerFlx from 'xgplayer-flv';
import close from '../img/close.png';
import _ from 'lodash';

import { useState } from 'react';
import { resolve } from 'path';

const SockJS = require('sockjs-client/dist/sockjs.js');
const Stomp = require('stompjs');
let count = 0;
let playerInitedResolver = null;
let playerInited = new Promise((resolve) => {
  playerInitedResolver = resolve;
});
const VideoFIV = (props) => {
  const videoRef = useRef(null);
  const timer = useRef();
  const [url, setUrl] = useState('');
  const player = useRef();
  const stompClient = useRef();
  const dragDom = useRef(null);
  // 检测是不是第一次
  const isFlvFirstPlay = useRef(true);
  // flv延时检测
  const flvDelayDetectTask = useRef(null);

  const deg = useRef(0);
  const predeg = useRef(0);
  const direction = useRef(true);

  const initFlvVideo = () => {
    player.current = new PlayerFlx({
      el: videoRef.current,
      url: url,
      fluid: true,
      autoplay: false,
      videoInit: true,
      cssFullscreen: true,
      ignores: ['time', 'progress', 'volume', 'play'],
      // rotateFullscreen: true,
      rotate: {
        //视频旋转按钮配置项
        innerRotate: true, //只旋转内部video
        clockwise: true, // 旋转方向是否为顺时针
      },
      actions: {},
    });

    // console.log(deg.current, '角度')
    // player.current.rotate(
    //     true,
    //     false,
    //     deg.current / 90,
    // );
    // debugger

    player.current.on('play', () => {
      debugger;
      if (player.current.buffered.length) {
        player.current.currentTime = player.current.buffered.end(0);
      }
      if (isFlvFirstPlay.current) {
        debugger;
        setTimeout(function () {
          playerInitedResolver();
        }, 2000);
        // 首次播放flv时候旋转图像, 并且增加定时延迟检测
        console.log(player.current, 'message');
        console.log('3', 'video', '角度');
        debugger;
        flvDelayDetectTask.current = setInterval(() => {
          // if (player.current) {
          console.log(6666);
          debugger;
          const maxDelay = 1.5;
          // console.log(
          //     player.current.buffered.end(0),
          //     player.current.currentTime,
          //     '重新矫正视频',
          //     player.current.buffered.end(0) - player.current.currentTime > 1.5,
          // );
          // 把进度条拉到已经缓冲的第一段的末尾，防止延迟过长
          // 如果没有已经缓冲的内容，说明视频没有内容
          if (player.current.buffered.length < 1) {
            console.log('flv播放器已无内容, 请关闭或者重新播放视频!');
          } else if (
            player.current.buffered.end(0) - player.current.currentTime >
            1.5
          ) {
            console.log('flv流延迟已超过', maxDelay, 's, 重新矫正视频!');
            player.current.currentTime = player.current.buffered.end(0);
          }
          // }
        }, 3000);
        // isFlvFirstPlay.current = false;
      }
    });
    player.current.on('complete', () => {
      if (props.key == 'drones' || props.key == 'camera') {
        return;
      }
      if (props.mark === 'wurenji') {
        return;
      }
      // 打开语音
      // props.onComplete(props.phone);
    });
  };

  const handleWsEvent = () => {
    stompClient.current.subscribe('/user/video/notify', (data) => {
      const message = JSON.parse(data.body);
      if (message.result && message.result.code !== 0) {
        console.log(message.result.msg);
        return;
      }

      switch (message.cmd) {
        case 'pull_up':
          break;
        case 'stream_resource':
          deg.current = message.result.data.rotationAngle;
          setUrl(window.atob(message.result.data.streamPath));
          playerInited = playerInited.then(() => {
            // debugger
            if (player.current) {
              console.log(deg.current, '角度');
              if (predeg.current === deg.current) {
                return;
              }
              if (deg.current > predeg.current) {
                direction.current = true;
              } else {
                direction.current = false;
              }
              console.log(direction.current, '角度');
              player.current.rotate(
                direction.current,
                false,
                Math.abs(deg.current - predeg.current) / 90,
              );
              console.log(
                deg.current,
                predeg.current,
                direction.current === true ? '顺时针' : '逆时针',
                Math.abs(deg.current - predeg.current) / 90 + '次',
              );
              predeg.current = deg.current;
            }
          });

          break;
        case 'terminate_pull_up':
          // this.handleTerminate();
          break;
        case 'terminate_notify':
          console.log('server挂断!');
          // this.handleTerminate();
          break;
        default:
          console.error(
            'unknown cmd: ' +
              message.cmd +
              ', message.identification: ' +
              message.identification,
          );
      }
    });
  };

  const socketFLV = () => {
    stompClient.current.send(
      '/api/video',
      {},
      JSON.stringify({
        cmd: 'pull_up',
        identification: (Math.random() * 100000000).toFixed(),
        data: {
          mdsUserId: props.mdsUserId,
          // mdsUserId: '34021019611312340006',
          mdsUserType: 5,
          streamType: '1',
        },
      }),
    );
  };

  const initSocket = () => {
    // const serverUrl = 'http://192.168.200.60:8095/smcs';
    const socket = new SockJS(props.serverUrl + '/smcs-websocket', null, {
      timeout: 15000,
    });
    stompClient.current = Stomp.over(socket);
    stompClient.current.debug = null;
    stompClient.current.heartbeat.outgoing = 5 * 1000;
    stompClient.current.heartbeat.incoming = 5 * 1000;
    stompClient.current.connect(
      {
        userId: (Math.random() * 100000000).toFixed(),
        type: 'video',
      },
      (frame) => {
        console.log('连接成功\t', frame);
        handleWsEvent();
        socketFLV();
      },
      (msg) => {
        console.log('连接被断开\t', msg);
        stompClient.current = null;
      },
    );
  };

  useEffect(() => {
    if (url) {
      initFlvVideo();
    }
  }, [url]);
  useEffect(() => {
    initSocket();

    return () => {
      stompClient.current && closeVideo();
    };
  }, []);

  const handleClose = () => {
    // props.onClick();
  };

  const closeVideo = () => {
    if (stompClient.current) {
      stompClient.current &&
        stompClient.current.connected &&
        stompClient.current.disconnect();
    }
    if (player.current) {
      player.current.destroy();
      player.current = null;
    }
    setUrl('');
    clearInterval(timer.current);
  };

  useEffect(() => {
    // if (dragDom?.current) {
    //     dragDom.current.style.position = 'fixed'
    //     new Drag(dragDom.current, document.querySelector('body'));
    // }
  }, [dragDom]);

  return (
    <>
      {props.position === 'event' ? (
        <div
          className={
            props.mode === 'mode' ? styles.videoWrapper_1 : styles.videoWrapper
          }
          ref={dragDom}
        >
          {/* <div className={ styles.closeBox}>
                    <img className={styles.close} src={close} onClick={handleClose} id="close-video-wrapper"/>
                </div> */}

          <div className={styles.video} ref={videoRef}></div>
          <p className={styles.title}>{props.name}</p>

          {/* <p className={styles.title}>{props.name}</p>
                <img className={styles.close} src={close} onClick={handleClose} id="close-video-wrapper"/>
                <div className={styles.video} ref={videoRef}></div> */}
        </div>
      ) : (
        <div
          className={
            props.mode === 'mode' ? styles.videoWrapper_1 : styles.videoWrapper
          }
          ref={dragDom}
        >
          {/* <div className={ styles.closeBox}>
                    <img className={styles.close} src={close} onClick={handleClose} id="close-video-wrapper"/>
                </div> */}

          {/* <div className={styles.video} ref={videoRef}></div>
                    <p className={styles.title}>{props.name}</p> */}

          <p className={styles.title}>{props.name}</p>
          <img
            className={styles.close}
            src={close}
            onClick={handleClose}
            id="close-video-wrapper"
          />
          <div className={styles.video} ref={videoRef}></div>
        </div>
      )}
    </>
  );
};

export default VideoFIV;
