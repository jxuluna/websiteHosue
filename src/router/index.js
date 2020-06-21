import Router from 'vue-router'

// const index = resolve => require(['../views/index/index.vue'], resolve);
const login = resolve => require(['../views/login/login.vue'], resolve);
const home = resolve => require(['../views/home/home.vue'], resolve);
const myHouse = resolve => require(['../views/houseOrigin/myHouse.vue'], resolve);


/**
 * 路由引入
 */
export default new Router({
  mode: 'history',
  routes: [
    /**
     * 登录页面
     */
    {
      path: '/home',
      name: 'home',
      component: home
    },
    //登陆页
    {
      path: '/login',
      name: 'login',
      component: login
    },
    //找房卖方
    {
      path: '/myHouse',
      name: 'myHouse',
      component: myHouse
    },
    /**
     * 首页
     */
    { path: '/', redirect: { name: 'home' }}
  ]
});

