<template>
    <div>
        <button @click="jumpWxvote">跳转到投票页面</button>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
export default defineComponent({
    name: 'about',
    setup() {
        // todo
        const router = useRouter();
        const jumpWxvote = () => {
            router.push({ path: '/BeautifulShopkeeper' });
        };
        return {
            jumpWxvote
        };
    }
});
</script>
