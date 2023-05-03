import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import pinia  from './store/store.js';

Vue.use(ElementUI)

new Vue({
  router,
  pinia,
  render: (h) => h(App)
}).$mount('#app')
