import { createApp} from 'vue'
import App from './App.vue'
import router from './router'
import WebRTC from 'vue-webrtc'
import * as io from 'socket.io-client'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash, faPodcast, faVideo, faUser } from '@fortawesome/free-solid-svg-icons'
window.io = io

library.add(faTrash, faPodcast, faVideo, faUser)

const app = createApp(App)
app.use(router)
app.component(WebRTC)
app.mount('#app')
