<template>
<div id="app">
    <Wrapper />
</div>
</template>

<script>
import Wrapper from './components/Wrapper.vue'

export default {
    name: 'App',
    components: {
        Wrapper
    }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap');

body {
    margin: 0;
    padding: 0;
}

#app {
    font-family: 'Montserrat', sans-serif;
}
</style>
