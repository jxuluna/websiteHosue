import router from './router'
import store from './store'
import { getUrlKey } from '@/utils';

router.beforeEach((to, from, next) => {
  //store的getters中定义获取用户信息的函数 getUser
  let session  = getUrlKey("session",window.location.href)

  if (!session) {
    session = localStorage.getItem('session')
  }
  store.commit('SET_session', session);



  if (session && session !== 'null') {//未登录
    store.dispatch('getUserInfo', { session }).then(res => { // 拉取user_info
      if (res.data.status === '-3') {
        localStorage.removeItem('session');
        if (to.name !== 'login') {
          next({path: '/login'});
        }
      } else {
        next();
      }
      next()
    })
  } else {//已登录
    if (to.path === '/myHouse') {//跳转到首页
      return next({path: '/login'});
    }
    next();
  }
});