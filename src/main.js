import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/utils/rem.js'
import '@/assets/styles/index.less'
import FastClick from 'fastclick'

Vue.config.productionTip = false

FastClick.attach(document.body);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
