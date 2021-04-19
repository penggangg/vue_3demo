import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/assets/css/base.css';
import '@/assets/js/interceptors';
import 'vant/lib/index.css';
import { registeGlobalComponent } from '@/components/index';

import { loadAllPlugins } from '@/plugins';
import { AppConfig } from '@/config/app';
const app: ReturnType<typeof createApp> = createApp(App);
/** 加载所有 Plugins */
loadAllPlugins(app);
app.config.globalProperties = AppConfig;

/** 自动注册全局组件  */
registeGlobalComponent(app);
app
    .use(store)
    .use(router)
    .mount('#app');
