<template>
    <the-layout>
        <div>中间内容</div>
    </the-layout>
</template>
<script lang="ts">
import TheLayout from '@/components/TheLayout.vue';
import { defineComponent, reactive, toRefs, watch } from 'vue';
interface DetailsInfo {
    name: string;
    age: number;
}
interface Dataprops {
    showMask: boolean;
    src: string;
    count: number;
    detailsInfo: DetailsInfo;
    [propname: string]: any;
}
export default defineComponent({
    name: 'index',
    setup() {
        const data: Dataprops = reactive({
            showMask: false,
            detailsInfo: {
                name: 'penggang',
                age: 12
            },
            src: '',
            count: 0,
            count1: 0
        });
        const refsData = toRefs(data);
        // watchEffect(() => {
        //     console.log(refsData.count.value);
        // });
        watch([refsData.count, refsData.count1], ([count, count1], [oldCount, oldCount1]) => {
            console.log(count, oldCount);
            console.log(count1, oldCount1);
        });
        return {
            ...refsData
        };
    },
    components: {
        TheLayout
    }

});
</script>
<style lang="less" scoped>

</style>
