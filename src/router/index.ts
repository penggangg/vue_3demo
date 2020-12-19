import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
/**
 * require.context(directory,useSubdirectories,regExp)
 * directory：说明需要检索的目录
 * useSubdirectories：是否检索子目录
 * regExp: 匹配文件的正则表达式,一般是文件名
 */
const requireComponent: __WebpackModuleApi.RequireContext = require.context('@/pages/', true, /\.vue$/);
const routesMap: Array<RouteRecordRaw> = [];

const capitalizeFirstLetter = (str: string) => str.charAt(0).toLocaleLowerCase() + str.slice(1);
// const validateFileName = (str: string) => /^\S+\.vue$/.test(str) && str.replace(/^\S+\/(\w+)\.vue$/, (rs, $1) => capitalizeFirstLetter($1));

requireComponent.keys().map(filePath => {
    const componentConfig = requireComponent(filePath);
    const componentName = capitalizeFirstLetter(componentConfig.default.name);
    console.log('filePath', filePath);
    if (componentName !== 'index') {
        routesMap.push({
            path: `/${componentName}`,
            name: componentName,
            component: () => import(`@/pages/${filePath.replace('./', '')}`)
        });
    }
});

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'index',
        component: () => import('@/pages/Index.vue')
    },
    ...routesMap
];
console.log(routes);
const router = createRouter({
    history: createWebHashHistory(),
    routes
});
export default router;
