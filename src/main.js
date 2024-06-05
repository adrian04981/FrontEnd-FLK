import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'; // Importa los estilos de BootstrapVue Next directamente

// Importa y registra todos los componentes de BootstrapVue Next que vayas a usar
import { BModal, BButton, BForm, BFormGroup, BFormInput, BFormSelect } from 'bootstrap-vue-next';

// Configura la baseURL para Axios
axios.defaults.baseURL = 'https://localhost:7006/api/';

const app = createApp(App);

// Hace que Axios esté disponible en todos los componentes como $axios
app.config.globalProperties.$axios = axios;

app.use(router);
app.component('b-modal', BModal);
app.component('b-button', BButton);
app.component('b-form', BForm);
app.component('b-form-group', BFormGroup);
app.component('b-form-input', BFormInput);
app.component('b-form-select', BFormSelect);

app.mount('#app');