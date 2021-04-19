<template>
    <div class="vote" :class="{showMask: showRules || !subscribe}" ref="voteRef">
        <div class="scroll" ref="scrollRef">
            <div class="topImage">
                <span class="share">
                    <img src="../assets/images/shareBtn.png" alt="" srcset="">
                </span>
                <img src="../assets/images/headerImg2.png" alt="" srcset="">
                <span class="lookRules" @click="showRules=!showRules">活动规则</span>
            </div>
        </div>
        <div class="content">
            <countdown
                :status="status"
                :expirationDate="expirationDate"
                :isHomeOptionsFinished="isHomeOptionsFinished"
            >
            </countdown>
            <area-list
                :areaList="areaList"
                :areaCode="areaCode"
                @changeAreaCode="changeAreaCodeHandler"
            >
            </area-list>
            <!-- 人员列表 -->
            <div class="userList" v-if="userList.length && isFinished">
                <user-item
                    @vote="voteHandler"
                    :userInfo="item"
                    :canVote="canVote"
                    :status="status"
                    :index="index"
                    :isCanNextVote="isCanNextVote"
                    v-for="(item, index) in userList"
                    :key="item.userCode"></user-item>
            </div>
            <div class="empty" v-if="!userList.length && isFinished">
                没有搜索到信息
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, ref, onMounted, onBeforeUnmount } from 'vue';
import { getUserInfoByOpenid, getUserInfo, homepageParams, queryCandidateList, vote } from '@/assets/js/api';
import Countdown from '@/components/Countdown.vue';
import AreaList from '@/components/AreaList.vue';
import UserItem from '@/components/UserItem2.vue';

interface Area {
    areaCode: string;
    areaName: string;
}
interface User {
    areaCode: string;
    userCode: string;
    userName: string;
    voteCnt: number;
}
export default defineComponent({
    name: 'beautifulShopkeeper',
    components: {
        Countdown,
        AreaList,
        UserItem
    },
    setup() {
        // 基础状态 + 数据
        const state = reactive({
            expirationDate: 0,
            now: 0,
            timeBeforeVoteEnd: 0,
            timeBeforeVoteStart: 0,
            interval: null,
            status: 0,
            showRules: false,
            isCanNextVote: true,
            canVote: true,
            isInitUserInfo: false,
            isFinished: false,
            isHomeOptionsFinished: false,
            isLoadAll: false,
            pagination: {
                pageNo: 1,
                pageSize: 20
            }
        });
        // 业务数据
        const businessData = reactive({
            areaCode: '',
            areaList: [] as Array<Area>,
            queryParam: '',
            userList: [] as Array<User>
        });
        // 微信数据
        const wxState = reactive({
            code: '',
            openid: '',
            subscribe: '' as string | number,
            appConfig: {
                dev: {
                    appid: 'wx541ef5d359901749'
                },
                prod: {
                    appid: 'wx3765009addd35377'
                }
            }
        });
        /**
         * 获取用户信息
         */
        const getUserInfoHandler = () => {
            return new Promise<void>(resolve => {
                getUserInfo({
                    code: wxState.code
                }).then((res) => {
                    wxState.openid = res.data?.openid;
                    resolve();
                }).catch(() => {
                    state.isInitUserInfo = true;
                });
            });
        };
        /**
         * 获取用户信息
         */
        const getUserInfoByOpenidHandler = () => {
            return new Promise<void>(resolve => {
                getUserInfoByOpenid({
                    openid: wxState.openid
                }).then(res => {
                    wxState.subscribe = res.data?.subscribe;
                    resolve();
                }).catch(() => {
                    state.isInitUserInfo = true;
                });
            });
        };
        /**
         * 获取活动配置信息
         */
        const getHomepageParamsHandler = () => {
            return new Promise<void>(resolve => {
                homepageParams({
                    openid: wxState.openid,
                    activityId: 2
                }).then(res => {
                    businessData.areaList = res.data?.hsgdSrVoteAreaVOS;
                    businessData.areaCode = businessData.areaList[0].areaCode;
                    state.canVote = res.data?.canVote;
                    state.status = res.data?.status;
                    state.timeBeforeVoteEnd = res.data?.timeBeforeVoteEnd;
                    state.timeBeforeVoteStart = res.data?.timeBeforeVoteStart;
                    state.isHomeOptionsFinished = true;
                    if (state.status === 1 || state.status === 3) {
                        state.expirationDate = res.data?.timeBeforeVoteEnd;
                    } else if (state.status === 0) {
                        state.expirationDate = res.data?.timeBeforeVoteStart;
                    }
                    resolve();
                });
            });
        };
        getUserInfoHandler();
        getUserInfoByOpenidHandler();
        /**
         * 获取人员列表
         */
        const getUserListHandler = () => {
            queryCandidateList({
                areaCode: businessData.areaCode,
                queryParam: businessData.queryParam,
                pageNo: state.pagination.pageNo,
                pageSize: state.pagination.pageSize,
                activityId: 2
            }).then(res => {
                state.isFinished = true;
                businessData.userList = [...businessData.userList, ...res.data?.data];
                if (businessData.userList.length === res.data?.totalRows) {
                    // 加载完毕
                    state.isLoadAll = true;
                }
            });
        };
        /**
         * 选择区域
         */
        const changeAreaCodeHandler = (item: Area) => {
            if (businessData.areaCode === item.areaCode) { return; }
            businessData.queryParam = '';
            businessData.areaCode = item.areaCode;
            state.pagination.pageNo = 1;
            state.isLoadAll = false;
            state.isFinished = false;
            businessData.userList = [];
            getUserListHandler();
        };
        /**
         * 投票
         */
        const voteHandler = (userInfo: User) => {
            console.log('userInfo', userInfo);
            const _uniqueCode = new Date().getTime();
            vote({
                openid: wxState.openid,
                areaCode: userInfo.areaCode,
                userCode: userInfo.userCode,
                uniqueCode: _uniqueCode,
                activityId: 2
            }).then(res => {
                state.isCanNextVote = res.data?.canVote;
                userInfo.voteCnt = res.data?.voteCnt;
            });
        };
        // refs
        const voteRef = ref(null);
        const scrollRef = ref(null);
        onMounted(async() => {
            await getHomepageParamsHandler();
            if (state.status === 1 || state.status === 3 || state.status === 0) {
                (state.interval as any) = setInterval(() => {
                    if (state.expirationDate <= 0) {
                        // 当倒计时结束的时候 判断当前状态 如果活动未开始 则将status置为1或3 开始则置为2
                        state.status = state.status === 0 ? 1 : 2;
                        state.expirationDate = state.timeBeforeVoteEnd - state.timeBeforeVoteStart - 1000;
                    } else {
                        state.expirationDate = state.expirationDate - 1000;
                    }
                }, 1000);
            }
            getUserListHandler();
        });
        onBeforeUnmount(() => {
            clearInterval(state.interval as any);
            state.interval = null;
        });
        return {
            ...toRefs(state),
            ...toRefs(wxState),
            ...toRefs(businessData),
            voteRef,
            scrollRef,
            changeAreaCodeHandler,
            voteHandler
        };
    }
});
</script>
<style lang="less" scoped>
.vote {
    position: relative;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width:none;
    height: 100%;
    width: 100%;
    background: #F8D0D9;
    // padding: 0 30px;
    &::-webkit-scrollbar {
        display: none;
    }
    &.showMask{
        overflow: hidden;
    }
    .topImage {
        position: relative;
        width: 100%;
        img {
            width: 100%;
        }
        .share {
            position: absolute;
            width: 80px;
            height: 130px;
            right: 38px;
            top: 38px;
        }
        .lookRules {
            position: absolute;
            bottom: 40px;
            right: 0;
            // width: 40%;
            // height: 80px;
            // transform: translateX(-50%);
            width: 160px;
            height: 60px;
            background: rgba(255, 255, 255, 0.5);
            border: 2px solid #E7386C;
            border-radius: 31px 0px 0px 31px;
            text-align: center;
            line-height: 60px;
            color: #F2216C;
            font-size: 30px;
            font-weight: 500;
        }
    }
    .content {
        padding: 0 46px;
        overflow: hidden;
        background: #F8D0D9;
        .searchAndRanking {
            display: flex;
            align-items: center;
            .search-cot {
                padding-left: 16px;
                height: 60px;
                display: flex;
                align-items: center;
                background: #F8D0D9;
                border-radius: 50px;
                overflow: hidden;
                border-radius: 12px;
                border: 2px solid #E7386C;
                box-sizing: border-box;
                img {
                    width: 37px;
                    height: 37px;
                }
                .formInput {
                    display: flex;
                    align-items: center;
                    flex: 1;
                    height: 60px;
                    background: #F8D0D9;
                }
                input {
                    width: 100%;
                    height: 100%;
                    font-size: 26px;
                    font-weight: 600;
                    text-indent: 10px;
                    background: #F8D0D9;
                    &::-webkit-input-placeholder { color:#E7386C;}
                    &:-moz-placeholder { color:#E7386C; }
                    &::-moz-placeholder { color:#E7386C;}
                    &:-ms-input-placeholder { color:#E7386C;}
                }
                .searchBtn {
                    width: 90px;
                    height: 60px;
                    text-align: center;
                    line-height: 60px;
                    background: #E7386C;
                    font-size: 28px;
                    color: #fff;
                    font-weight: bold;
                }
            }
            .ranking {
                margin-left: 20px;
                width: 205px;
                height: 60px;
                background: #E7386C;
                border-radius: 12px;
                text-align: center;
                line-height: 60px;
                color: #fff;
                font-weight: 600;
                font-size: 26px;
            }
        }

        .userList {
            padding: 0 18px;
            overflow: hidden;
        }
        .empty {
            padding: 50px 0;
            font-size: 36px;
            text-align: center;
            color: #e7386c;
        }
    }
    .mask {
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        .rules {
            position: relative;
            padding: 40px 30px;
            overflow: auto;
            background: #fff;
            height: 90%;
            width: 90%;
            box-sizing: border-box;
            border-radius: 15px;
            .title {
                margin-bottom: 20px;
                display: inline-block;
                width: 100%;
                font-size: 36px;
                font-weight: bold;
                text-align: center;
            }
            .rules-content {
                margin-bottom: 30px;
                display: flex;
                flex-direction: column;
                p {
                    margin-bottom: 10px;
                    font-size: 32px;
                    font-weight: bold;
                }
                span {
                    font-size: 28px;
                }
            }
        }
        .close {
            position: absolute;
            display: flex;
            align-items: center;
            right: 40px;
            top: 50px;
            font-size: 32px;
            z-index: 99;
            img {
                width: 88px;
                height: 88px;
            }
        }
    }
}
</style>
