<template>
<div class="Registr">
    <div class="container">
        <div class="registrTitle">
            <h1>Регистрация</h1>
            <div class="divideLine"></div>
        </div>
        <div class="registrForm">
            <form @submit.prevent='submitForm' id='registrForm' methods='post' action='/registr'>
                <input type="text" class='form-control' name='firstName' placeholder="Имя" v-model='firstName'>
                <input type="text" class='form-control' name='lastName' placeholder="Фамилия" v-model='lastName'>
                <input @change='checkInput' id='phoneNumber' class="form-control" type="text" name="phoneNumber" placeholder="Номер телефона" v-model='phoneNumber'>
                <input @change='checkPassword' id='password' type="text" class="form-control" name='password' placeholder="Введите пароль" v-model='password'>
                <p class="passwordRequirment">Пароль должен состоять более 8 символов, используйте Большие буквы и цифры.</p>
                <div class="form-check">
                    <input @change='checkBox' class="form-check-input" type="checkbox" value="" id="terms" v-model='terms'>
                    <label class="form-check-label" for="flexCheckDefault">
                        Согласен с условиями использования и обработками личных данных.
                    </label>
                </div>
                <button class="btn btn-block" type='submit'>Далее</button>
                <div class="hasAccount">
                    <span>У меня есть аккаунт</span>
                    <router-link to='/login'>Войти</router-link>
                </div>
            </form>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Registr',
    data() {
        return {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            password: '',
            terms: '',
            errors: []
        }
    },
    mounted(e) {
        const input = document.getElementById('phoneNumber')
        let value = input.value
        document.querySelector('#phoneNumber').addEventListener('input', (e) => {
            const newVal = e.target
            if (newVal.value.match(/[^0-9]/g)) {
                input.value = value
                return
            }
            value = newVal
        })
    },
    methods: {
        checkInput(e) {
            e.preventDefault()
            const input = e.target
            if (input.value.length < 10) {
                document.querySelector('#phoneNumber').classList.toggle('isValidRed')
            } else {
                document.querySelector('#phoneNumber').classList.toggle('isValidGreen')
            }
        },
        checkPassword(e) {
            e.preventDefault()
            const password = e.target
            if (password.value.length > 8 && password.value.charAt(0) === password.value.charAt(0).toUpperCase() && password.value.match(/\d/g)) {
                document.querySelector('#password').classList.toggle('isValidGreen')
                document.querySelector('.passwordRequirment').classList.toggle('textValidGreen')
            } else {
                document.querySelector('#password').classList.toggle('isValidRed')
                document.querySelector('.passwordRequirment').classList.toggle('textValidRed')
            }
        },
        checkBox(e) {
            e.preventDefault()
            const box = e.target
            if (box.checked) {
                document.querySelector('.form-check-input').classList.toggle('isValidGreen')
                document.querySelector('.form-check-label').classList.toggle('textValidGreen')
            }
        },
        submitForm(e) {
            e.preventDefault()
            const vm = this
            if (this.phoneNumber === '' && this.password === '' && this.terms === '') {
                document.querySelector('#phoneNumber').classList.toggle('isValidRed')
                document.querySelector('#password').classList.toggle('isValidRed')
                document.querySelector('.form-check-input').classList.toggle('isValidRed')
                document.querySelector('.form-check-label').classList.toggle('textValidRed')
            } else {
                vm.handleRegistrSubmit()
            }
        },
        handleRegistrSubmit() {
            const newUser = {
                firstName: this.firstName,
                lastName: this.lastName,
                phoneNumber: this.phoneNumber,
                password: this.password,
                terms: this.terms
            }
            console.log(newUser)
            axios.post('api/registr', newUser)
                .then(res => {
                    if (res.status === 200) {
                        this.$router.push('login')
                    }
                }, err => {
                    console.log(err.response)
                })
        }
    }
}
</script>

<style lang="scss" scoped>
.isValidRed {
    border: 2px solid red;
    color: red;
}

.textValidRed {
    color: red !important;
}

.isValidGreen {
    border: 2px solid rgb(35, 204, 35);
    color: rgba(0, 0, 0, 0.67);
}

.textValidGreen {
    color: rgb(21, 226, 21) !important;
}

.Registr {
    height: 100vh;
    width: 100%;
    background-color: #009FFA;
    position: absolute;
    z-index: 1;
    top: 0;
    overflow-y: scroll;

    .registrTitle {
        height: 26vh;
        padding-top: 13vh;
        color: #fff;

        h1 {
            font-size: 30px;
            font-weight: 800;
        }

        .divideLine {
            background-color: #fff;
        }
    }

    .registrForm {
        outline: 1px solid black;
        height: 62vh;
        overflow-y: scroll;

        input.form-control {
            height: 8vh;
            margin-top: 1vh;
            font-size: 18px;
            font-weight: 500;
        }

        .passwordRequirment {
            font-size: 12px;
            margin-top: 0.5vh;
            padding: 0 1vh;
            color: rgba(255, 255, 255, .7);
        }

        .form-check {
            margin-top: 4vh;

            label {
                color: rgba(255, 255, 255, .7);
            }
        }

        button {
            height: 8vh;
            background-color: #fff;
            font-size: 18px;
            font-weight: 700;
            color: rgba(0, 0, 0, 0.67);
            margin-top: 5vh;
            border-radius: 5px;
        }

        button:hover {
            box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
        }

        .hasAccount {
            margin-top: 5vh;
            display: flex;
            flex-direction: column;
            align-items: center;

            span {
                color: rgba(255, 255, 255, .7);
            }

            a {
                margin-top: 2vh;
                font-size: 1.2em;
                color: rgba(255, 255, 255, .9);
            }
        }
    }
}
</style>
