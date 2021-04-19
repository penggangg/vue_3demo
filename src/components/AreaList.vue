<template>
    <div class="areaList">
        <span v-for="item in areaList" :key="item.areaCode" :class="{active: areaCode === item.areaCode}" @click="onChangeAreaCode(item)">{{item.areaName}}</span>
    </div>
</template>
<script>
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'AreaList',
    props: ['areaList', 'areaCode'],
    setup(props, context) {
        const onChangeAreaCode = (item) => {
            context.emit('changeAreaCode', item);
        };
        return {
            onChangeAreaCode
        };
    }
});
</script>
<style lang="less" scoped>
.areaList {
    margin: 20px 0;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-content: flex-start;
    &:after{
        content: '';
        width: 155px;
        border:1px solid transparent;
    }
    span {
        margin-bottom: 20px;
        display: inline-block;
        width: 155px;
        height: 50px;
        font-size: 26px;
        color: #E7386C;
        border-radius: 12px;
        text-align: center;
        line-height: 50px;
        background: transparent;
        border: 2px solid #E7386C;
        &.active {
            background: #E7386C;
            color: #F8D0D9;
            font-weight: 600;
        }
    }
}
</style>
