// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router';
import Router from 'vue-router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/style/index.css';
import store from './store'
import './permission.js';
import VueQriously from 'vue-qriously'
import "babel-polyfill"

Vue.config.productionTip = false
Vue.use(Router);
Vue.use(ElementUI);
Vue.use(VueQriously)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  store
})
