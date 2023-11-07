import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import { bus } from 'vue3-eventbus'

loadFonts()

createApp(App)
  .use(vuetify)
  .use(bus)
  .mount('#app')
