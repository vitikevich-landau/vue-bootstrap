import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, /*IconsPlugin*/ } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
// Vue.use(IconsPlugin)

import { VueReCaptcha } from 'vue-recaptcha-v3';
Vue.use(VueReCaptcha, { siteKey: '6Lc4dfwZAAAAAB2wHs5hmA9SCTxuC6oThkc2-anR' });

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
