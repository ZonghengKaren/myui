import Vue from 'vue'
import App from './App.vue'
import components from './components'
import router from './router'

Vue.config.productionTip = false;

// 载入组件
Vue.use(components)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
