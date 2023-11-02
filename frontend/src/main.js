import { createApp } from 'vue'
import router from './router/router.js'
import store from './store/store'
import VueCookies from 'vue-cookies'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import VueGtag from 'vue-gtag'
// import VueCookieComply from 'vue-cookie-comply'
// import 'vue-cookie-comply/dist/style.css'


import App from './App.vue'



createApp(App).use(VueSweetalert2).use(store).use(router).use(VueGtag, {
    config: {id: "G-D7Y5NNG53P"}
}).use(VueCookies).mount('#app')
