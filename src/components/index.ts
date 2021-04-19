import { createApp } from 'vue';
/**
 * @function registeGlobalComponent 自动化祖册global下的组件为全局组件
 * @param app
 */
export function registeGlobalComponent(app: ReturnType<typeof createApp>): void {
    const files = require.context('./global', true, /\.(vue|ts)$/);
    files.keys().forEach(key => {
        const config = files(key);
        const name = key.replace(/^\.\//, '').replace(/\.\w+$/, '');
        app.component(name, config.default || config);
    });
}
