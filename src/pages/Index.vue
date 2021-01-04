<template>
    <the-layout>
        <tree-list
            :treeData="treeData"
            :activeIds="ids"
            @change="activeIdsChange"
        ></tree-list>
    </the-layout>
</template>
<script lang="ts">
import TheLayout from '@/components/TheLayout.vue';
import TreeList from '@/components/TreeList.vue';

import { defineComponent, reactive, toRefs, ref, watchEffect, watch } from 'vue';
import treeData from '@/assets/js/menu';
console.log('data1', treeData);
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
        const activeId = 7;
        /**
         * 获取已经选中id (父)
         */
        const findPath = (menus: any, targetId: any) => {
            let ids: number[] = [];
            const traverse = (subMenus: any, prev: any) => {
                if (ids.length) {
                    return;
                }

                if (!subMenus) {
                    return;
                }
                subMenus.forEach((subMenu: any) => {
                    if (subMenu.id === targetId) {
                        ids = [...prev, targetId];
                        return;
                    }
                    traverse(subMenu._child, [...prev, subMenu.id]);
                });
            };
            traverse(menus, []);
            console.log(ids, 'ids');
            return ids;
        };
        const _ids = findPath(treeData, activeId);
        const ids = ref(_ids);
        const activeIdsChange = (newIds: []) => {
            ids.value = newIds;
            console.log('当前选中的id路径', newIds);
            console.log(ids);
        };
        // return {
        //     ids,
        //     activeIdsChange,
        //     treeData
        // };
        const data: Dataprops = reactive({
            showMask: false,
            activeIdsChange,
            detailsInfo: {
                name: 'penggang',
                age: 12
            },
            src: '',
            count: 0,
            count1: 0,
            treeData: treeData,
            ids
        });
        const refsData = toRefs(data);
        watchEffect(() => {
            console.log(refsData.count.value);
        });
        watch([refsData.count, refsData.count1], ([count, count1], [oldCount, oldCount1]) => {
            console.log(count, oldCount);
            console.log(count1, oldCount1);
        });
        return {
            ...refsData
        };
    },
    components: {
        TheLayout,
        TreeList
    }

});
</script>
<style lang="less" scoped>

</style>
