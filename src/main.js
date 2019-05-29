import Vue from 'vue'
import App from './App.vue'
import store from './store'
import {
  library
} from '@fortawesome/fontawesome-svg-core'
import {
  faCaretDown as fasCaretDown,
  faCheck as fasCheck
} from '@fortawesome/free-solid-svg-icons'
// import {
//   faCheckCircle as farCheckCircle
// } from '@fortawesome/free-regular-svg-icons'
import {
  FontAwesomeIcon
} from '@fortawesome/vue-fontawesome'

library.add(fasCaretDown)
library.add(fasCheck)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')