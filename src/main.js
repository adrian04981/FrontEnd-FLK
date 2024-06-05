import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap 5 CSS
import 'bootstrap'; // Bootstrap 5 JS (bundle)
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'; // BootstrapVue Next CSS
import '@fortawesome/fontawesome-free/css/all.min.css';  // Import Font Awesome
import 'mdb-vue-ui-kit/css/mdb.min.css';

axios.defaults.baseURL = 'https://localhost:7006/api/';

const app = createApp(App);

app.config.globalProperties.$axios = axios;

app.use(router);

app.mount('#app');