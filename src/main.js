import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import packageMyself from '../lib/luoPackage.umd.min'
import '../lib/luoPackage.css'

Vue.use(ElementUI, { size: 'medium' })
Vue.use(packageMyself)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
