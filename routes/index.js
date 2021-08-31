export default[
    { 
        exact: true, 
        path: '/', 
        component: '@/pages/Layouts', 
        title: '首页',
        wrappers: [
            '@/pages/Wrapper/Auth',
        ],
    },
    { exact: true, path: '/login', component: '@/pages/Login', title: '登录'},
    { exact: true, path: '/users', component: '@/pages/User', title: '用户页面'},


]