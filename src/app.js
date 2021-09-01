import { history } from 'umi';
import React, { useContext } from 'react';
import { ThemContext } from './ThemContext';
// let isSubApp = false;
// export function modifyClientRenderOpts(memo) {r
//   return {
//     ...memo,
//     rootElement: isSubApp ? 'sub-root' : memo.rootElement,
//   };
// }

// const goToLogin = false;
// export function render(oldRender) {
//   if(goToLogin) {
//     oldRender();
//   } else {
//     history.push('/login');
//     oldRender()

//   }
// }

// export function onRouteChange({ location, routes, action }) {
//   const { global } = window.g_app._store.getState();
//   if(global.isLogin) {

//   }
//   console.log(location, routes, action, '999')
// }

export function onRouteChange({ matchedRoutes, location, routes, action }) {
  // console.log(window, 'window', window.g_app)
  // console.log(matchedRoutes, 'matchedRoutes')
  // const { global } = window.g_app._store.getState();
  // if(global.isLogin) {

  // }
  // console.log(location, routes, action, '999');
  if (matchedRoutes.length) {
    document.title = matchedRoutes[matchedRoutes.length - 1].route.title || '';
  }
}

// const ThemeProvider = ThemContext.Provider;

// export function rootContainer(container) {
//   let data = { value: null };
//   new Promise((resolve) => {
//     resolve({ user: '张三', age: '18' });
//   }).then((res) => {
//     data = { value: res };
//   });
//   console.log(data, 'data666');

//   return React.createElement(ThemeProvider, data, container);
// }
