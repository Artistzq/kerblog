import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import { bus } from 'vue3-eventbus'
import { store } from './store'

loadFonts()

const app = createApp(App)
app.config.devtools = true

app.use(vuetify)
  .use(bus)
  .use(store)
  .mount('#app')
