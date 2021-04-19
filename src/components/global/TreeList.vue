<template>
    <div class="menu">
        <div
            class="menu-item"
            v-for="item in treeData"
            :key="item.id"
            :class="`menu-item${depth}`"
        >
            <span class="name" @click="onMenuItemClick(item)">{{item.name}}</span>
            <tree-list
                v-if="subMenu && subMenu.length && activeIds.indexOf(item.id) > -1"
                :treeData="subMenu"
                :activeIds="activeIds"
                :depth="depth + 1"
                @change="onSubActiveIdChange"
            ></tree-list>
        </div>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, ref, toRefs, watch } from 'vue';

export default defineComponent({
    name: 'TreeList',
    props: ['treeData', 'depth', 'activeIds'],
    setup(props, context) {
        const activeId = ref<number | null | undefined>(null);
        /**
         * 这里 activeIds 也可能是异步获取到的 所以用 watch 保证初始化
         */
        watch(
            () => props.activeIds,
            (newActiveIds) => {
                console.log('改变了吗', newActiveIds);
                if (newActiveIds) {
                    const newActiveId = newActiveIds[props.depth];
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
            const _child = props.treeData && props.treeData.find(({ id }: {id: number}) => id === activeId.value);
            return _child && _child._child;
        };
        const subMenu = computed(getActiveSubMenu);

        /**
         * 递归收集子菜单第一项的 id
         */
        const getSubIds = (child: []) => {
            const subIds: any = [];
            const traverse = (data: any[]) => {
                if (data && data.length) {
                    const first: any = data[0];
                    subIds.push(first.id);
                    traverse(first._child);
                }
            };
            traverse(child);
            return subIds;
        };
        /**
         * 点击某一项
         */
        const onMenuItemClick = (menuItem: any) => {
            const newActiveId = menuItem.id;
            // if (newActiveId !== activeId.value) {
            activeId.value = newActiveId;
            const child = getActiveSubMenu();
            const subIds = getSubIds(child);
            // 把子菜单的默认第一项 ids 也拼接起来 向父组件 emit
            context.emit('change', [newActiveId, ...subIds]);
            // }
        };

        const onSubActiveIdChange = (ids: []) => {
            context.emit('change', [activeId.value, ...ids]);
        };

        const data = reactive({
            // depth,
            activeId,
            subMenu,
            onMenuItemClick,
            onSubActiveIdChange,
            treeData: props.treeData
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
        &.menu-item3 {
            background: blue;
        }
    }
}
</style>
