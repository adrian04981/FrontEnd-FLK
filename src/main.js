import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'; // Importa los estilos de BootstrapVue Next directamente
import { BModal } from 'bootstrap-vue-next'; // Importa solo los componentes necesarios de BootstrapVue Next
import 'bootstrap/dist/css/bootstrap.css';

// Configura la baseURL para Axios
axios.defaults.baseURL = 'https://localhost:7006/api/';

const app = createApp(App);

// Hace que Axios esté disponible en todos los componentes como $axios
app.config.globalProperties.$axios = axios;

app.use(router);
app.component('b-modal', BModal); // Registra el componente BModal de BootstrapVue Next
app.mount('#app'); 
