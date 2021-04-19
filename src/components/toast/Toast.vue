<template>
    <div class="wrap" v-show="showWrap" :class="showContent ?'fadein':'fadeout'">{{text}}</div>
</template>
<script>
import { defineComponent, reactive, toRefs } from 'vue';
export default defineComponent({
    name: 'zct-toast',
    setup() {
        const state = reactive({
            showWrap: false,
            text: '',
            showContent: true
        });
        const show = (msg, duration) => {
            state.showWrap = true;
            state.text = msg;
            setTimeout(() => {
                state.showWrap = false;
            }, duration);
        };
        return {
            ...toRefs(state),
            show
        };
    }
});
</script>
<style scoped>
.wrap{
    position: fixed;
    left: 50%;
    top:50%;
    z-index: 10001;
    background: rgba(0,0,0,.7);
    padding: 20px 30px;
    border-radius: 5px;
    transform: translate(-50%,-50%);
    text-align: center;
    font-size: 30px;
    color:#fff;
}
.fadein {
    animation: animate_in 1s;
 }
.fadeout {
    animation: animate_out 1s;
    opacity: 0;
}
@keyframes animate_in {
    0% {
        opacity: 0;
    }
    100%{
        opacity: 1;
    }
}
@keyframes animate_out {
    0% {
        opacity: 1;
    }
    100%{
        opacity: 0;
    }
}
</style>
