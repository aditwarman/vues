import Vue from 'vue'
import '@/plugins/axios'
import '@/plugins/vuetify'
import '@/plugins/veevalidate'
import '@/plugins/common'
import '@/plugins/googleAnalytics'
import i18n from '@/plugins/i18n'
import App from '@/App.vue'
import router from '@/router'
import { store } from '@/store'
import VueSocialauth from 'vue-social-auth'

Vue.use(VueSocialauth, {
  providers: {
    google: {
      clientId: '438889138125-ha0mpnnlduq11ho467hqtiq6laeg3tq9.apps.googleusercontent.com',
      redirectUri: '/auth/google/callback' // Your client app URL
    }
  }
})

Vue.config.productionTip = false

const app = new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  created() {
    store.dispatch('setLocale', store.getters.locale)
    if (store.getters.isTokenSet) {
      store.dispatch('autoLogin')
    }
  }
}).$mount('#app')

if (window.Cypress) {
  // Only available during E2E tests
  window.app = app
}
