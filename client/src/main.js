import { createApp } from 'vue'
import App from './App.vue'

import stateAPIService from '@/services/stateService'

import router from '@/router' // by specifying only the folder, it always imports the file with name index

let app = createApp(App)

app.config.globalProperties.$stateService = stateAPIService

app.use(router)

app.mount('#app')
