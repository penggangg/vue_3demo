<template>
    <div class="time-cot" v-if="isHomeOptionsFinished">
        <div class="time" v-if="status!==2">
            <div>
                <span>{{days}}</span>
                <b>天</b>
            </div>
            <div>
                <span>{{hours}}</span>
                <b>时</b>
            </div>
            <div>
                <span>{{minutes}}</span>
                <b>分</b>
            </div>
        </div>
        <span class="title" v-if="status!==2">后{{status === 0 ? '开始' : '结束'}}</span>
        <span class="title" v-else>投票已结束</span>
    </div>
</template>
<script>
import { defineComponent, computed } from 'vue';
export default defineComponent({
    name: 'Countdown',
    props: ['status', 'expirationDate', 'isHomeOptionsFinished'],
    setup(props) {
        const MILESECONDS_OF_DAY = 1000 * 60 * 60 * 24;
        const MILESECONDS_OF_HOUR = 1000 * 60 * 60;
        const MILESECONDS_OF_MINUTE = 1000 * 60;
        // 日期
        const days = computed(() => {
            if (!props.expirationDate) {
                return '00';
            } else {
                const t = parseInt((props.expirationDate / MILESECONDS_OF_DAY).toString());
                return t >= 0 ? (t < 10 ? `0${t}` : String(t)) : '00';
            }
        });
        const hours = computed(() => {
            if (!props.expirationDate) {
                return '00';
            } else {
                const t = parseInt(((props.expirationDate % MILESECONDS_OF_DAY) / MILESECONDS_OF_HOUR).toString());
                return t >= 0 ? (t < 10 ? `0${t}` : String(t)) : '00';
            }
        });
        const minutes = computed(() => {
            if (!props.expirationDate) {
                return '00';
            } else {
                const t = parseInt((props.expirationDate % MILESECONDS_OF_DAY % MILESECONDS_OF_HOUR / MILESECONDS_OF_MINUTE).toString());
                return t >= 0 ? (t < 10 ? `0${t}` : String(t)) : '00';
            }
        });
        return {
            days,
            hours,
            minutes
        };
    }
});
</script>
<style lang="less" scoped>
.time-cot {
    margin: 10px 0 30px 0;
    height: 78px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 14px;
    .title {
        margin-left: 5px;
        font-size: 24px;
        color: #E7386C;
        font-weight: bold;
    }
    .time {
        display: flex;
        align-items: center;
        >div {
            display: flex;
            align-items: center;
            b {
                margin: 0 5px;
                display: inline-block;
                color: #E7386C;
                font-size: 24px;
            }
            span {
                padding: 0 10px;
                display: inline-block;
                height: 40px;
                line-height: 42px;
                background: #E7386C;
                border-radius: 6px;
                color: #fff;
                font-size: 26px;
                font-weight: bold;
            }
        }
    }
}
</style>
