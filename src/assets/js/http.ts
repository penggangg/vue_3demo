import Axios, { Method } from 'axios';

const fetch = (url: string, params = {}, method: Method = 'POST', { withMask = true, ...config } = {}) => {
    console.log(withMask);
    const isGet = method.toUpperCase() === 'GET';
    return new Promise<HttpResponse>((resolve, reject) => {
        Axios({
            url,
            method,
            params: isGet ? params : '',
            data: isGet ? '' : params,
            ...config
        }).then((res: HttpResponse) => {
            console.log(res);
            resolve(res);
        }, err => {
            reject(err);
        });
    });
};

export default fetch;
