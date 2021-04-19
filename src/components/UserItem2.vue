<template>
    <div class="user-item">
        <div class="img-cot" @click="gotoDetailHandler(userInfo.userCode)">
        <img :src="`${baseImgUrl}${userInfo.userCode}.jpg`" alt="">
        </div>
        <div class="info">
            <span class="name">{{userInfo.userCode}}: {{userInfo.userName}}</span>
            <span class="num">{{userInfo.voteCnt}}票</span>
        </div>
        <div class="userCode" v-if="userInfo.title">
            <span>{{userInfo.title}} </span>
        </div>
        <div class="btn" v-if="status===1 || status===3">
            <img v-if="canVote && isCanNextVote" src="../assets/images/vote2.png" alt="" srcset="" @click="voteHandler">
            <img v-else src="../assets/images/noteVote2.png" alt="" srcset="" @click="notVoteHandler">
        </div>
        <div class="btn" v-if="status===2">
            <img src="../assets/images/end2.png" alt="" srcset="" >
        </div>
        <div class="btn" v-if="status===0">
            <img src="../assets/images/notStart2.png" alt="" srcset="">
        </div>
    </div>
</template>
<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
    name: 'UserItem',
    props: {
        userInfo: {
            type: Object
        },
        canVote: {
            type: Boolean
        },
        isCanNextVote: {
            type: Boolean
        },
        status: {
            type: Number
        },
        index: {
            type: Number
        }
    },
    setup(props, context) {
        const baseImgUrl = ref('https://zctcdn.winzct.com/img/srvote2/');
        const voteHandler = () => {
            context.emit('vote', props.userInfo);
        };
        const notVoteHandler = () => {
            context.emit('vote', props.userInfo);
        };
        const gotoDetailHandler = (userCode) => {
            context.$router.push({ path: '/beautifulSrDetail', query: { userCode } });
        };
        return {
            baseImgUrl,
            voteHandler,
            notVoteHandler,
            gotoDetailHandler
        };
    }

});
</script>
<style lang="less" scoped>
    .user-item {
        position: relative;
        margin-bottom: 40px;
        width: 295px;
        &:nth-child(even) {
            float: right;
        }
        &:nth-child(odd) {
            float: left;
        }
        .img-cot {
            border-radius: 10px;
            border: 1px solid #E7386C;
            overflow: hidden;
            width: 295px;
            height: 295px;
            >img {
                display: inline-block;
                width: 100%;
                height: 100%;
            }
        }
        .info {
            padding: 15px 0 10px 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            .name {
                font-size: 26px;
                color: #E7386C;
                font-weight: 600;
            }
            .num {
                font-size: 22px;
                color: #E7386C;
            }
        }
        .userCode {
            position: absolute;
            padding: 0 10px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            top: 0px;
            left: 0;
            width: 275px;
            height: 50px;
            background: rgba(0, 0, 0, .3);
            text-align: right;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            font-weight: bold;
            span {
                color: #fff;
                font-size: 30px;
            }
        }
        .btn {
            margin-bottom: 10px;
            display: flex;
            justify-content: center;
            width: 100%;
            height: 50px;
            img {
                width: 224px;
                height: 100%;
            }
        }
    }
</style>
