import App from './App.vue'
import { createApp } from 'vue'

import { Quasar } from 'quasar'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'

import router from './router/router.js'

import './style.css'


createApp(App)
  .use(router)
  .use(Quasar)
  .mount('#app')
