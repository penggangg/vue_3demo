import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/assets/css/base.css';
import '@/assets/js/interceptors';

createApp(App).use(store).use(router).mount('#app');
