import Vue from 'vue'
import App from './App.vue'
import store from './store'
import {
  library
} from '@fortawesome/fontawesome-svg-core'
import {
  faCaretDown as fasCaretDown,
  faCheck as fasCheck,
  faPlus as fasPlus,
  faFolderPlus as fasForderPlus,
  faFolder as fasFolder
} from '@fortawesome/free-solid-svg-icons'
import {
  faTrashAlt as farTrashAlt,
  faStar as farStar,
  faEdit as farEdit,
  faBookmark as farBookmark,
  faFolder as farFolder
} from '@fortawesome/free-regular-svg-icons'
import {
  FontAwesomeIcon
} from '@fortawesome/vue-fontawesome'

library.add(fasCaretDown, fasCheck, fasPlus, fasForderPlus, fasFolder)
library.add(farTrashAlt, farEdit, farStar, farBookmark, farFolder)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')