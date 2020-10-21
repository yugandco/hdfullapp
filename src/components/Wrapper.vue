<template>
<div class="wrapper">
    <Nav />
    <Content />
    <BottomNav />
</div>
</template>

<script>
import Nav from './Nav.vue'
import Content from './Content.vue'
import BottomNav from './BottomNav.vue'

export default {
    name: 'Wrapper',
    components: {
        Nav,
        Content,
        BottomNav
    }
}
</script>
