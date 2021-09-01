export default [
  {
    // exact: true,
    path: '/',
    component: '@/pages/Layouts',
    title: '首页',
    redirect: '/content',
    wrappers: ['@/pages/Wrapper/Auth'],
    routes: [
      { path: '/content', component: '@/pages/Layouts/content', title: '内容' },
    ],
  },
  { exact: true, path: '/login', component: '@/pages/Login', title: '登录' },
  // { path: '/content', component: '@/pages/Layouts/content', title: '内容'},
  { exact: true, path: '/users', component: '@/pages/User', title: '用户页面' },
  {
    path: '*',
    component: '@/pages/404',
    title: '404',
  },
];
