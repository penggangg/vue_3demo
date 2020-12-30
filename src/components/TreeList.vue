<template>
    <div class="menu">
        <div
            class="menu-item"
            v-for="item in treeData" :key="item.id"
            :class="`menu-item${depth}`"
        >
        <span class="name">{{item.name}}</span>
        <tree-list
            v-if="item._child && item._child.length"
            :treeData="subMenu"
            :activeIds="activeIds"
            :depth="depth + 1"
        ></tree-list>
        </div>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, ref, toRefs, watch } from 'vue';

export default defineComponent({
    name: 'TreeList',
    props: ['treeData', 'depth', 'activeIds'],
    setup(props) {
        const activeId = ref<number | null | undefined>(null);
        const activeIds = reactive(props.activeIds);
        console.log(activeIds, 'activeIds');
        const depth = props.depth || 0;
        watch(
            () => activeIds,
            (newActiveIds) => {
                if (newActiveIds) {
                    const newActiveId = newActiveIds[depth];
                    if (newActiveId) {
                        activeId.value = newActiveId;
                    }
                }
            },
            {
                immediate: true,
                flush: 'sync'
            }
        );
        /**
         * 获取子节点数据
         */
        const getActiveSubMenu = () => {
            const { treeData } = props;
            console.log(treeData, 'props.treeData');
            treeData.map((item: any, index: any) => {
                console.log(item);
                console.log(index);
            });
            // return props.treeData.find(({ id }: {id: number}) => id === activeId.value)._child;
        };
        const subMenu = computed(getActiveSubMenu);

        const data = reactive({
            treeData: props.treeData,
            depth,
            activeId,
            subMenu,
            activeIds
        });
        const refsData = toRefs(data);
        return {
            ...refsData
        };
    }
});
</script>
<style lang="less"  scoped>
.menu {
    width: 7em;
    font-size: 28px;
    .menu-item {
        .name {
            padding: 0.5em 1em;
            box-sizing: border-box;
            display: inline-block;
            font-size: 28px;
            width: 7em;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        &.menu-item0 {
            background: #ffccc7;
        }
        &.menu-item1 {
            background: #fff7e6;
        }
        &.menu-item2 {
            background:green;
        }
    }
}
</style>
