<template>
    <div class="wrapper">
        <the-header></the-header>
        <section>
            <slot></slot>
        </section>
        <the-footer></the-footer>
    </div>
</template>
<script>
import TheHeader from './TheHeader';
import TheFooter from './TheFooter';

export default {
    name: 'TheLayout',
    components: {
        TheHeader,
        TheFooter
    }
};
</script>
<style lang="less" scoped>
.wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    width: 100%;
    section {
        height: calc(100% - 176px);
        overflow: auto;
    }
}
</style>
