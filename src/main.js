import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

// Configura la baseURL para Axios
axios.defaults.baseURL = 'https://localhost:7006/api/'

const app = createApp(App)

// Hace que Axios esté disponible en todos los componentes como $axios
app.config.globalProperties.$axios = axios

app.use(router)
app.mount('#app')
