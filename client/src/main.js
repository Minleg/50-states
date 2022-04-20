import { createApp } from 'vue'
import App from './App.vue'

import stateAPIService from '@/services/stateService'

import router from '@/router' // by specifying only the folder, it always imports the file with name index

import 'leaflet/dist/leaflet.css' // loading leaflet style sheet, applies to all of our app by uploading in main

let app = createApp(App)

app.config.globalProperties.$stateService = stateAPIService

app.use(router)

app.mount('#app')
