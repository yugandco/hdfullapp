<template>
<div class='login__wrap' style='padding-top: 5%; min-height: 100vh; width: 100vw; position: absolute; top: 0; bottom: 0; left: 0; right: 0p; background-color: #009ffa; z-index: 2000;'>
    <div class="login">
        <div class="container-fluid text-white">
            <div class="login__pretitle h3 text-center font-weight-bold mb-5">Human Delivery</div>
            <div class="login__title h1 font-weight-normal mb-2 mt-5">Войти</div>
            <div class="login__body mt-3">
                <div class="row">
                    <div class="col-12">
                        <form @submit.prevent='submitLogin' action="/login" method="post">
                            <label for="phoneNumber" class='form-label mb-0'>Номер телефона</label>
                            <input type="text" id='phoneNumber' class='form-control mb-2' name='phoneNumber' placeholder="87074040505" v-model='phoneNumber'>
                            <div id='error-phoneNumber'>{{ error.phn }}</div>
                            <label for="password" class='form-label mb-0'>Пароль</label>
                            <input type="password" id='password' class='form-control mb-5' name='password' placeholder="*******" v-model='password'>
                            <div id='error-password'>{{ error.psw }}</div>
                            <button class='btn btn-light btn-block' style='background-color: #fd7e14; color: #fff;'>Войти</button>
                            <div class='text-ligt mt-3 text-center'>или</div>
                            <router-link to='/registr' class='text-light d-flex justify-content-center mt-3 mb-4'>У меня нет аккаунта</router-link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Login',
    data() {
        return {
            phoneNumber: '',
            password: '',
            error: {
                phn: '',
                psw: ''
            }
        }
    },
    created() {
        if (this.$router.history.current.fullPath === '/login') {
            document.querySelector('#bottom-nav').style.display = 'none'
            document.querySelector('#menu').style.display = 'none'
        }
    },
    methods: {
        submitLogin() {
            const user = {
                phoneNumber: this.phoneNumber,
                password: this.password
            }

            axios.post('api/login', user)
                .then(res => {
                    if (res.status === 200) {
                        localStorage.setItem('token', res.data.token)
                        localStorage.setItem('userID', res.data.user_id)
                        localStorage.setItem('isCompanion', res.data.userIsCompanion)
                        localStorage.setItem('isClient', res.data.userIsClient)
                        localStorage.setItem('userPhoneNumber', res.data.userPhoneNumber)
                        localStorage.setItem('userFullName', res.data.userFullName)
                        document.querySelector('#bottom-nav').style.display = 'block'
                        document.querySelector('#menu').style.display = 'block'
                        if (res.data.userIsCompanion === true && res.data.userIsClient === false) {
                            this.$router.push('/companion-home').catch(() => {})
                            document.querySelector('#bottom-nav').style.display = 'block'
                            document.querySelector('#menu').style.display = 'block'
                        } else {
                            this.$router.push('/').catch(() => {})
                        }
                    }
                })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
