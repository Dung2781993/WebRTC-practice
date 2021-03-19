import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash, faPodcast, faVideo, faUser } from '@fortawesome/free-solid-svg-icons'

library.add(faTrash, faPodcast, faVideo, faUser)
createApp(App)
  .use(router)
  .mount('#app')
