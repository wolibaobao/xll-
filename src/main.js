// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

//element ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


import axios from './http'
axios.defaults.baseURL = 'https://wd5203671990lmrgyr.wilddogio.com/' //配置默认路径
Vue.prototype.$axios = axios //配置Vue原型,在任何组件中都可以正常使用axios


import animate from 'animate.css'

import i18n from './i18n/i18n'; //切换语言


import moment from 'moment'
//获取年份
Vue.filter('moment', function(value, formatString) {
    console.log(formatString)
    formatString = formatString || 'YYYY-MM-DD HH:mm:ss';
    return moment(value).format("YYYY-MM-DD"); // value可以是普通日期 20170723
});

// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts



//vuex
import { store } from './store/strore.js'

//路由文件在这里面
import router from './routers.js'


/* eslint-disable no-new */
new Vue({
    router,
    store,
    i18n, //将VueI18n挂载到vue实例上

    el: '#app',
    components: { App },
    template: '<App/>'
})