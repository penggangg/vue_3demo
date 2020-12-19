<template>
    <div class="wrap">
        <div class="menu-wrap">

        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';

export default defineComponent({
    name: 'TreeList',
    setup() {
        const data = reactive({

        });

        const refsData = toRefs(data);

        return {
            ...refsData
        };
    }
});
</script>
<style lang="less"  scoped>

</style>
