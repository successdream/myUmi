export const sideBarList = [
  // 只能重定向到同级
  { path: '/', redirect: '/options1' },
  {
    path: '/options1',
    component: '@/pages/Layouts/Options1',
    title: 'options1',
  },
  {
    path: '/options2',
    component: '@/pages/Layouts/Options2',
    // component: () => import('@/pages/Layouts/Options2'),
    title: 'options2',
  },
  {
    path: '/options3',
    component: '@/pages/Layouts/Options3',
    title: 'options3',
  },
  {
    path: '/options4',
    component: '@/pages/Layouts/Options4',
    title: 'options4',
  },
  {
    path: '/options5',
    component: '@/pages/Layouts/Options5',
    title: 'options5',
  },
  {
    path: '/options6',
    component: '@/pages/Layouts/Options6',
    title: 'options6',
  },
  {
    path: '/video',
    component: '@/pages/Layouts/Video',
    title: '视频',
  },
];
export default [
  { exact: true, path: '/login', component: '@/pages/Login', title: '登录' },
  // { exact: true, path: '/users', component: '@/pages/User', title: '用户页面' },
  {
    path: '/',
    component: '@/pages/Layouts',
    title: '首页',
    routes: sideBarList,
    wrappers: ['@/Wrappers/Auth'],
  },
  // {
  //   path: '*',
  //   component: '@/pages/404',
  //   title: '404',
  // },
  // 如何开启 404
];
