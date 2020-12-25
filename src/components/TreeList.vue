<template>
    <div class="wrap">
        <div class="menu-wrap">
            <div
                class="menu-item"
                v-for="item in treeData" :key="item.id"

            >
            <span class="name">{{item.name}}</span>
            <tree-list
                v-if="item._child && item._child.length"
                v-show="treeData.toggle"
                :treeData="item._child"
            ></tree-list>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';

export default defineComponent({
    name: 'TreeList',
    props: {
        treeData: {
            required: true
        }
    },
    setup(props, context) {
        console.log('props', props);
        console.log('context', context);
        const data = reactive({
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
.wrap {
    .menu-wrap {
        .menu-item {
            .name {
                border: 1px solid #ccc;
            }
        }
    }
}
</style>
