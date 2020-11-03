<template>
<div class='menu' id='menu'>
    <nav class="navbar fixed-top navbar-dark shadow" style='background-color: #009ffa'>
        <div class="container">
            <router-link to='/' class='navbar-brand'>HumanDelivery</router-link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span>ЕУ</span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <div class="nav-link">Профиль</div>
                    <div @click='logout' class="nav-link">Выйти</div>
                </div>
            </div>
        </div>
    </nav>
</div>
</template>

<script>
// import { mapActions } from 'vuex'
import axios from 'axios'

export default {
    name: 'Nav',
    data() {
        return {
            userPhoneNumber: '',
        }
    },
    mounted() {
        if (localStorage.getItem('token') !== null) {
            this.getUser()
        }
    },
    methods: {
        getUser() {
            const token = localStorage.getItem('token')
            axios.get(`api/userData/`, {
                    headers: {
                        token: token
                    }
                })
                .then((res) => {
                    console.log(res.data.user.phoneNumber)
                    const user = res.data.user
                    this.userPhoneNumber = user.phoneNumber.charAt(0)
                })
        },
        logout() {
            localStorage.clear()
            this.$router.push('/login')
        }
    },

}
</script>

<style lang="scss" scoped>

</style>
