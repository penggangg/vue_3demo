import { createApp } from 'vue';
import * as Sentry from '@sentry/vue';
import { Integrations } from '@sentry/tracing';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/assets/css/base.css';
import '@/assets/js/interceptors';
import 'vant/lib/index.css';
import { registeGlobalComponent } from '@/components/index';
import { loadAllPlugins } from '@/plugins';
import { AppConfig } from '@/config/app';
Sentry.init({
    dsn: 'https://3c03ee3263c0447b8e2c9505bc47e3ba@o575227.ingest.sentry.io/5727170',
    integrations: [new Integrations.BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0
});
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
