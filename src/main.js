import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';

// Import Bootstrap CSS and JS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Import BootstrapVue Next CSS
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';

// Import Font Awesome
import '@fortawesome/fontawesome-free/css/all.min.css';

// Import MDB Vue UI Kit CSS
import 'mdb-vue-ui-kit/css/mdb.min.css';

axios.defaults.baseURL = 'https://localhost:7006/api/';

const app = createApp(App);

app.config.globalProperties.$axios = axios;

app.use(router);

app.mount('#app');