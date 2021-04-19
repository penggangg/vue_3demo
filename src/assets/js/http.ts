import Axios, { Method } from 'axios';
import {
    Toast
} from 'vant';
Toast.allowMultiple();
const fetch = (url: string, params = {}, method: Method = 'POST', { withMask = true, ...config } = {}) => {
    const isGet = method.toUpperCase() === 'GET';
    let toast: any = null;
    if (withMask) {
        toast = Toast.loading({
            duration: 0,
            overlay: true,
            message: '加载中...'
        });
    }
    return new Promise<HttpResponse>((resolve, reject) => {
        Axios({
            url,
            method,
            params: isGet ? params : '',
            data: isGet ? '' : params,
            ...config
        }).then(async(res: HttpResponse) => {
            toast && toast.clear();
            console.log(res);
            resolve(res);
        }, err => {
            toast && toast.clear();
            reject(err);
        });
    });
};

export default fetch;
