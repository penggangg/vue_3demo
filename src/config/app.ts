import zctToast from '../components/toast/index';
/**
 * 注册全局变量 类似于vue2挂载在vue.prototype 下的方法
 */
const AppConfig = {
    $zctToast: zctToast
};
export { AppConfig };
