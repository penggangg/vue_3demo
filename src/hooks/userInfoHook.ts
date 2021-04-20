import { getUserInfoByOpenid, getUserInfo } from '@/assets/js/api';
import { reactive, toRefs } from 'vue';
export default function() {
    const state = reactive({
        openid: '',
        isInitUserInfo: false,
        subscribe: ''
    });

    // 获取浏览器后面的参数
    const getUriParam = (key: string) => {
        const variesObj: any = {};
        let kAv = [];
        const stringArr = window.location.search.substring(1).split('&');
        for (let i = 0; i < stringArr.length; i++) {
            kAv = stringArr[i].split('=');
            variesObj[kAv[0]] = kAv[1];
        }
        return variesObj[key];
    };
    const code = getUriParam('code');
    /**
     * 获取用户信息
     */
    const getUserInfoHandler = () => {
        return new Promise<void>(resolve => {
            getUserInfo({
                code: code
            }).then((res) => {
                state.openid = res.data?.openid;
                resolve();
            }).catch(() => {
                state.isInitUserInfo = true;
            });
        });
    };
    const getUserInfoByOpenidHandler = () => {
        return new Promise<void>(resolve => {
            getUserInfoByOpenid({
                openid: state.openid
            }).then(res => {
                state.subscribe = res.data?.subscribe;
                resolve();
            }).catch(() => {
                state.isInitUserInfo = true;
            });
        });
    };
    return {
        getUserInfoHandler,
        getUserInfoByOpenidHandler,
        ...toRefs(state)
    };
}
