<template>
    <the-layout>
        <tree-list
            :treeData="treeData"
            :activeIds="ids"
            :depth="depth"
            @change="activeIdsChange"
        ></tree-list>
    </the-layout>
</template>
<script lang="ts">
import TheLayout from '@/components/TheLayout.vue';
import TreeList from '@/components/TreeList.vue';

import { defineComponent, reactive, toRefs } from 'vue';
import treeData from '@/assets/js/menu';
console.log('data1', treeData);
interface DetailsInfo {
    name: string;
    age: number;
}
interface Dataprops {
    depth: number;
    ids: number[];
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
        const ids = findPath(treeData, activeId);
        const data: Dataprops = reactive({
            depth: 0,
            treeData: treeData,
            ids
        });
        const activeIdsChange = (newIds: []) => {
            data.ids = newIds;
            console.log('当前选中的id路径', newIds);
        };
        const refsData = toRefs(data);
        return {
            ...refsData,
            activeIdsChange
        };
    },
    components: {
        TreeList,
        TheLayout
    }

});
</script>
<style lang="less" scoped>

</style>
