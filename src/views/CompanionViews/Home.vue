<template>
<div id='companion' class="home mt-5 pt-4">
    <div class="container-fluid">
        <div class="home__title h1 mb-0 border-bottom font-weight-bold pb-3">Поиск посылок</div>
        <div class="home__body mt-3">
            <div class="row">
                <div class="col-6">
                    <button id='orders' class='btn btn-light btn-block' style='border:none; outline: none;'>Заказы</button>
                </div>
                <div class="col-6">
                    <button id='myads' class='btn btn-light btn-block' style='border:none; outline: none;'>Мои объявлении</button>
                </div>
                <div class="col-sm-12 mt-4" style='height: 69vh;'>
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
    name: "CompanionHome",
    mounted() {
        this.mask()
    },
    methods: {
        mask() {
            const orders = document.querySelector('#orders')
            const myads = document.querySelector('#myads')

            if (this.$router.history.current.fullPath === '/companionHome/myads') {
                myads.style.backgroundColor = '#fd7e14'
                myads.style.color = '#fff'
                orders.style.backgroundColor = '#f8f9fa'
                orders.style.color = '#000'
            } else {
                orders.style.backgroundColor = '#fd7e14'
                orders.style.color = '#fff'
                myads.style.backgroundColor = '#f8f9fa'
                myads.style.color = '#000'
            }

            myads.addEventListener('click', () => {
                myads.style.backgroundColor = '#fd7e14'
                myads.style.color = '#fff'
                orders.style.backgroundColor = '#f8f9fa'
                orders.style.color = '#000'
                this.$router.push('/companionHome/myads').catch(() => {})
            })

            orders.addEventListener('click', () => {
                orders.style.backgroundColor = '#fd7e14'
                orders.style.color = '#fff'
                myads.style.backgroundColor = '#f8f9fa'
                myads.style.color = '#000'
                this.$router.push('/companionHome/orders').catch(() => {})
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
