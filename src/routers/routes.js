export default [
    {
        path: '/',
        name: 'home',
        component: () => import('@/pages/Home/index'),
        meta: {
            title: '首页',
            isLogin: true,
            isMenu: true
        },
    },
    {
        path: '/sysManger',
        name: 'sysManger',
        component: () => import('@/pages/SysManger/index'),
        meta: {
            title: '系统管理',
            isLogin: true,
            isMenu: true
        },
        children: [
            {
                path: 'userManger',
                name: 'userManger',
                component: () => import('@/pages/SysManger/userManger'),
                meta: {
                    title: '用户管理',
                    isLogin: true,
                    isMenu: true
                },
            },
            {
                path: 'rolesManger',
                name: 'rolesManger',
                component: () => import('@/pages/SysManger/rolesManger'),
                meta: {
                    title: '角色管理',
                    isLogin: true,
                    isMenu: true
                },
            }
        ]
    },
    {
        path: '*',
        meta: {
            isMenu: false
        },
        redirect: '/'
    }
]