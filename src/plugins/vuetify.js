import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import VuetifyConfirm from 'vuetify-confirm'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify, {
  theme: {
    // primary: colors.yellow.lighten3,
    // secondary: colors.shades.black,
    // error: colors.orange.darken3
  },
  iconfont: 'mdi'
})
Vue.use(VuetifyConfirm)
