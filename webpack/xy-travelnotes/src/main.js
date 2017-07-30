// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import BaiduMap from 'vue-baidu-map'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-light.css'
import App from './App'
import router from './router'

Vue.config.productionTip = false

Vue.use(MuseUI)
Vue.use(VueResource)
Vue.use(BaiduMap, {
    ak: 'AaXe3HZ8ouvnNXwQKTeaVWGB7zao07C6'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

Vue.http.interceptors.push((request, next) => {
    request.credentials = true
    next()
})
