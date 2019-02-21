// import login from './components/login.vue'

//引入路由
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)



import zhuce from './components/zhuce.vue'
import home_cont from './components/home_cont.vue'

import cont_zhanshi from './components/cont_zhanshi.vue'
import home from './components/home.vue'
import add_xx from './components/add_xx.vue'
import grxx from './components/grxx.vue'
import jiemeng from './components/jiemeng/jiemeng.vue'
import wbk from './components/wenbenkuang/wbk.vue'

import xxlb from './components/xxlb/xxlb.vue'

import xuanxiang1 from './components/one_kuai/xuanxiang1.vue'


const router = new VueRouter({
    mode: 'history',

    routes: [{
            path: "/",
            name: "login",
            component: resolve => require(['@/components/login.vue'], resolve)
        }, {
            path: "/zhuce",
            name: "zhuce",
            component: zhuce
        }, {
            path: "/cont",
            name: "cont",
            component: home_cont,
            meta: {
                requireLogin: true // 当前路由需要校验，不需要就不用写
            },
            redirect: '/cont',
            children: [{
                    path: "/cont",
                    name: "cont",
                    component: cont_zhanshi
                }, {
                    path: "/home",
                    name: "/home",
                    component: home,
                    meta: { title: '用户信息' }
                },
                {
                    path: "/home/xuanxiang1",
                    name: "/home/xuanxiang1",
                    component: xuanxiang1,
                    meta: { title: '表格管理//列表' }
                },
                {
                    path: "/add_xx",
                    name: "/add_xx",
                    component: add_xx,
                    meta: { title: '添加信息' }
                },
                {
                    path: "/grxx",
                    name: "/grxx",
                    component: grxx,
                    meta: { title: '个人信息' }
                },
                {
                    path: "/jiemeng",
                    name: "/jiemeng",
                    component: jiemeng,
                    meta: { title: '解梦' }
                },
                {
                    path: "/wbk",
                    name: "/wbk",
                    component: wbk,
                    meta: { title: '文本框' }
                },
                {
                    path: "/xxlb",
                    name: "/xxlb",
                    component: xxlb,
                    meta: { title: '信息列表' }
                }, {
                    path: "/tianqi",
                    name: "tianqi",
                    component: resolve => require(['@/components/tianqi/tianqi.vue'], resolve),
                    meta: { title: '天气查询' }
                }

            ]
        },

        {
            path: "*",
            redirect: '/'
        }
    ]
})



//守卫
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requireLogin)) { // 判断该路由是否需要登录权限
        if (sessionStorage.getItem('login')) { // 判断当前用户的登录信息loginInfo是否存在
            next();
        } else {
            Vue.prototype.$message({
                type: 'error',
                message: '您还未登录哦亲!'
            });
            next({
                path: '/login'
            })
        }
    } else {
        next();
    }

})

export default router