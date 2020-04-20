import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import '@/assets/css/main.css'
import '@/assets/css/spacing.scss'
// import { library } from '@fortawesome/fontawesome-svg-core'
// import {
//   faCheck, faCheckCircle, faInfoCircle, faExclamationTriangle, faExclamationCircle,
//   faArrowUp, faAngleRight, faAngleLeft, faAngleDown,
//   faEye, faEyeSlash, faCaretDown, faCaretUp, faUpload
// } from "@fortawesome/free-solid-svg-icons"
// import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
// library.add(faCheck, faCheckCircle, faInfoCircle, faExclamationTriangle, faExclamationCircle,
//   faArrowUp, faAngleRight, faAngleLeft, faAngleDown,
//   faEye, faEyeSlash, faCaretDown, faCaretUp, faUpload)
// Vue.component('vue-fontawesome', FontAwesomeIcon)

Vue.config.productionTip = false
Vue.use(Buefy)
new Vue({
  el: '#app',
  router,
  components: { App },
  store,
  render: h => h(App)
})