import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueLazyload from 'vue-lazyload'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import './assets/scss/reset.scss'
import './assets/scss/style.scss'
import './assets/scss/config.scss'
import './assets/font/iconfont.css'

axios.defaults.baseURL = process.env.VUE_APP_URL ? process.env.VUE_APP_URL : '/web';
Vue.prototype.$axios = axios;

Vue.use(VueAwesomeSwiper)
Vue.use(VueLazyload, {
    loading: '/loading-bars.svg'
})

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
