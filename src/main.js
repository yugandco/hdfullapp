import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.config.productionTip = false

axios.defaults.baseURL = '/'
axios.defaults.headers.get.Accept = 'application/json'
axios.defaults.headers.post.Accept = 'application/json'
axios.defaults.headers.get['Content-Type'] = 'application/json'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
