import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css' ;
import './assets/index.css'
Vue.config.productionTip = false;

Vue.use(ElementUI)

// 注册导航守卫
router.beforeEach( (to,from,next) => {
  if (to.path === '/login') {
    next()
    return
  }
  if ( localStorage.getItem('token') ) {
    // 有token代表已经登录直接放行
    next()
  } else {
    // 没有登录就跳转到登录页
    router.push('/login')
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
