<template>
<div class='welcome' style='padding-top: 10%; min-height: 100vh; width: 100vw; position: absolute; top: 0; bottom: 0; left: 0; right: 0p; background-color: #009ffa; z-index: 2000;'>
    <div class="container-fluid">
        <div class="welcome__inner">
            <div class="welcome__title h1 font-weight-bold text-white mt-3">Найди попутчиков <br /> в любом направлении</div>
            <div class="welcome__subtitle h4 font-weight-bold mt-4 mb-5" style='color: rgba(254,254,254, .69)'>Отправляй посылки вместе с нами</div>
            <div class="welcome__body mt-4">
                <div class="row">
                    <div class="col-12">
                        <img :src='require("../assets/welcome.png")' alt="Красивая картина добро пожаловать)">
                    </div>
                    <div class="col-12 fixed-bottom">
                        <button @click='goLogin' class='btn btn-light btn-block font-weight-bold mb-5' style='height: 6vh'>Войти</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'Welcome',
    methods: {
        goLogin() {
            this.$router.push('/login')
        }
    },
}
</script>

<style lang="scss" scoped>

</style>
