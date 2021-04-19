import { createApp } from 'vue';

export function registeGlobalComponent(app: ReturnType<typeof createApp>): void {
    const files = require.context('./global', true, /\.(vue|ts)$/);
    files.keys().forEach(key => {
        const config = files(key);
        const name = key.replace(/^\.\//, '').replace(/\.\w+$/, '');
        app.component(name, config.default || config);
    });
}
