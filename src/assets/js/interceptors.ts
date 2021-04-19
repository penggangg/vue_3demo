import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
const { encryptData, decryptData } = (window as any).ZCTEncrypt;

// Axios.defaults.baseURL = (window as any)._hxdServerIP;
Axios.defaults.headers = {
    'X-Agent-Type': 'json',
    'Content-Type': 'application/json'
};

Axios.defaults.responseType = 'arraybuffer';

/**
 * @description 请求发起前的拦截器
 * @returns { AxiosRequestConfig } config
 */
Axios.interceptors.request.use((config: AxiosRequestConfig) => {
    config.data = encryptData(config.data);
    return config;
}, (err: AxiosError) => {
    return Promise.reject(err);
});

/**
 * @description 请求响应的拦截器
 *
 */

Axios.interceptors.response.use((response: AxiosResponse) => {
    response.data = decryptData(response.data) || {};
    return response.data;
}, (err: AxiosError) => {
    return err;
});
