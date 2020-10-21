<template>
<div class='SingleClient'>
    <div class="SingleClient__inside">
        <div class="container">
            <slot></slot>
            <div @click='closeSingleClient' class='closeSingleClient'>ЗАКРЫТЬ</div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'SingleClient',
    methods: {
        closeSingleClient() {
            this.$emit('closeSClient')
        }
    }
}
</script>

<style lang="scss" scoped>
.SingleClient {
    height: 100vh;
    width: 100%;
    position: absolute;
    top: -22vh;
    background-color: rba(0, 0, 0, .4);
    z-index: 11;
    left: 0;
    right: 0;

    &__inside {
        position: relative;
        height: 90vh;
        width: 100%;
        top: 10vh;
        left: 0;
        right: 0;
        background-color: #f3f3f3;
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
        padding-top: 20px;

        .closeSingleClient {
            margin-top: 30px;
            font-size: 1.2em;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 500;
            color: rgba(0, 0, 0, .5);
        }
    }
}
</style>
