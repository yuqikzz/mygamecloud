import Vue from 'vue'
import Router from 'vue-router'

//组件模块
import Login from '@/components/login'

import Reg from '@/components/reg'

import Page from '@/components/page'
import Home from '@/components/views/home'
import User from '@/components/views/user/index'
import userInfo from '@/components/views/user/info'
import userCollect from '@/components/views/user/collect'
import userResource from '@/components/views/user/resource'

import Cloud from '@/components/views/cloud'
import Upload from '@/components/views/upload'

Vue.use(Router)

export default new Router({
    routes: [
        {path: '/', name: 'Login', component: Login},
        {
            path: '/page', name: 'Page', component: Page,
            children: [
                {
                    path: 'home',
                    name: 'Home',
                    component: Home
                },
                {
                    path: 'user',
                    name: 'User',
                    component: User,
                    children: [
                        {
                            path: 'info',
                            name: 'userInfo',
                            component: userInfo
                        },
                        {
                            path: 'collect',
                            name: 'userCollect',
                            component: userCollect
                        },
                        {
                            path: 'resource',
                            name: 'userResource',
                            component: userResource
                        },
                    ]
                },
                {
                    path: 'cloud',
                    name: 'Cloud',
                    component: Cloud
                }, {
                    path: 'upload',
                    name: 'Upload',
                    component: Upload
                },

            ]
        },
        {path: '/reg', name: 'Reg', component: Reg},

    ]
})