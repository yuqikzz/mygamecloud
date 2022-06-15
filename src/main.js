import Vue from 'vue'
import App from './App.vue'
import router from "@/router";
import animated from 'animate.css'
Vue.config.productionTip = false
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'

Vue.prototype.$axios = axios
// Vue.prototype.$imgApi = 'http://101.43.123.141/public/'
Vue.prototype.$imgApi = 'http://127.0.0.1:3000/'

Vue.prototype.regPhone = /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/

Vue.use(ElementUI);
Vue.use(animated)


new Vue({
    el: '#app',
    render: h => h(App),
    router
});