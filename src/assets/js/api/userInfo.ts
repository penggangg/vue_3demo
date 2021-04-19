import fetch from '../http';
/**
 * @interface UserInfoParams -获取用户信息
 * @property openid -openid
 */
interface UserInfoParams {
    openid: string;
}
/**
 * @interface UserInfoParams1 -获取用户信息
 * @property openid -openid
 */
 interface UserInfoParams1 {
    code: string;
}
export const getUserInfo = (params: UserInfoParams1) => fetch('/api-srvote/api/wechatUser/security/300001/v1/getUserInfo', params, 'POST', { withMask: false });

export const getUserInfoByOpenid = (params: UserInfoParams): Promise<HttpResponse> => fetch('/api-srvote/api/wechatUser/security/300002/v1/getUserInfoByOpenid', params, 'POST', { withMask: false });
