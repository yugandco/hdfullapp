<template>
<div class='registr__wrap' style='padding-top: 5%;min-height: 100vh; width: 100vw; position: abosulte; top: 0; left: 0; bottom: 0; right: 0; background-color: #009ffa; z-index: 2000;'>
    <div class='registr'>
        <div class="container-fluid text-white">
            <div class='registr__pretitle h3 font-weight-bold mb-5 text-center'>Human Delivery</div>
            <div class="registr__title h1 font-weight-normal mb-2 mt-5">Регистрация</div>
            <div class="registr__body mt-3">
                <div class="row">
                    <div class="col-12">
                        <form @submit.prevent='submitForm' action="/registr" method="post">
                            <label for="firstName" class='form-label mb-0'>Имя</label>
                            <input id="firstName" type="text" class='form-control mb-2' name='firstName' placeholder="Вон" v-model='firstName'>
                            <label for="lastName" class='form-label mb-0'>Фамилия</label>
                            <input type="text" id="lastName" class='form-control mb-2' name='lastName' placeholder="Роу" v-model='lastName'>
                            <label for="phoneNumber" class='form-label mb-0'>Номер телефона</label>
                            <input type="text" id='phoneNumber' class='form-control' name='phoneNumber' placeholder="87014040505" v-model='phoneNumber'>
                            <div class='mb-2'>
                                <small class='text-light'><span class='font-weight-bold'>Формат номер телефона:</span> 8ХХХ1112233</small>
                            </div>
                            <label for="password" class='form-label mb-0'>Пароль</label>
                            <input type="password" id='password' class="form-control" name='password' placeholder="********">
                            <small class='text-light'><span class='font-weight-bold'>Для пароля используйте:</span> не менее 8 символов, с Заглавной буквы, и цифры</small>
                            <div class='mb-4'>
                                <div class="form-check mt-3">
                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                                    <label class="form-check-label" for="flexCheckDefault">
                                        <small>Соглашаюсь с обработкой персональных данных</small>
                                    </label>
                                </div>
                                <button class='btn btn-light btn-block mt-5' style='background-color: #fd7e14; color: #fff;'>Далее</button>
                                <div class='text-light mt-3 text-center'>или</div>
                                <router-link to='/login' class='text-light d-flex justify-content-center'>У меня есть аккаунт</router-link>

                            </div>
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
    created() {
        if (this.$router.history.current.fullPath === '/registr') {
            document.querySelector('#bottom-nav').style.display = 'none'
            document.querySelector('#menu').style.display = 'none'
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
</style>
