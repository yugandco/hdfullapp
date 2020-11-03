<template>
<div class="Login">
    <div class="container">
        <div class="loginTitle">
            <h1>Войти</h1>
            <div class="divideLine"></div>
        </div>
        <div class="loginContent">
            <input inputmode="tel" v-model='phoneNumber' class='form-control' type="text" name='phoneNumber' placeholder="Номер телефона">
            <input v-model='password' type="text" class='form-control' name='password' placeholder="Введите пароль">
            <p class="forgotPassword">Забыли пароль?</p>
            <button id='submitBtn' class="btn btn-block" v-on:click='submitLogin'>Войти</button>
            <div>{{ error }}</div>
            <div class="hasAccount">
                <span>У меня нет Аккаунта</span>
                <router-link to='/registr'>Регистрация</router-link>
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
            error: ''
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
                        if (res.data.userIsCompanion === true && res.data.userIsClient === false) {
                            this.$router.push('/companionHome/orders').catch(() => {})
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
.Login {
    height: 775px;
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 1;
    background-color: #009FFA;

    .loginTitle {
        height: 196px;
        padding-top: 98px;

        h1 {
            font-size: 30px;
            color: #fff;
        }

        .divideLine {
            background-color: #fff;
        }
    }

    .loginContent {
        overflow-y: scroll;

        input.form-control {
            height: 60px;
            margin-top: 1vh;
            font-size: 18px;
            font-weight: 500;
        }

        .forgotPassword {
            margin-top: 15px;
            padding: 0 11.3px;
            color: rgba(255, 255, 255, .7);
        }

        #submitBtn {
            height: 50px;
            background-color: #fff;
            font-size: 18px;
            font-weight: 700;
            margin-top: 37.7px;
            color: rgba(0, 0, 0, 0.67);
        }

        .hasAccount {
            margin-top: 37.7px;
            display: flex;
            flex-direction: column;
            align-items: center;

            span {
                font-size: 16px;
                color: rgba(255, 255, 255, .7);
            }

            a {
                color: rgba(255, 255, 255, .9);
                margin-top: 15px;
                font-size: 1.2em;
            }
        }
    }
}
</style>
