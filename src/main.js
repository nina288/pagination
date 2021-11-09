import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


//import './assets/element-variables.scss'

Vue.use(ElementUI);
import JwPagination from 'jw-vue-pagination';
Vue.component('jw-pagination', JwPagination);

import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  el: "#app",
  render: h => h(App)
}).$mount('#app')
