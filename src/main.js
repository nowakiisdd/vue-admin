import Vue from 'vue'
import App from './App.vue'

import iView from 'iview'
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'
import 'iview/dist/styles/iview.css'
import './assets/stylesheet/reset.css'
import 'animate.css'

import router from 'router'
import filters from 'utils/filters'
import Vue2Editor from "vue2-editor"

import store from 'store'

Vue.use(iView)
Vue.use(filters)
Vue.use(ElementUI)
Vue.use(Vue2Editor)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
