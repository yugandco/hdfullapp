<template>
<div class="sidenav mt-5 pt-4">
    <div class="container-fluid">
        <div class="sidenav__title h1 mb-0 border-bottom font-weight-bold"></div>
        <div class="side__body mt-2">
            <div class="row">
                <div class="col-sm-12">
                    <div class="card">
                        <div class="row g-0">
                            <div class="col-3 d-flex justify-content-center pt-3" style=''>
                                <div class="sidenav__body__img rounded-circle" style='height: 60px; width: 60px; background-color: #009ffa;'></div>
                            </div>
                            <div class="col-9">
                                <div class="card-body">
                                    <h5 class="card-title mb-2">{{ userFullName }}</h5>
                                    <p class='card-text text-warning'>
                                        <i class='material-icons'>star</i>
                                        <i class='material-icons'>star</i>
                                        <i class='material-icons'>star</i>
                                        <i class='material-icons'>star</i>
                                        <i class='material-icons'>star</i>
                                    </p>
                                    <p class='card-text'>Ваш баланс: {{ balans }}</p>
                                    <p class='card-text'><small class='text-muted'>Редактировать профиль</small></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12 mt-4">
                    <div class="list-group">
                        <div @click='goPayments' class="list-group-item list-group-item-action">Платежи</div>
                        <div class="list-group-item list-group-item-action">Конфигурация сайта</div>
                        <div class="list-group-item list-group-item-action">Тех. поддержка</div>
                        <div class="list-group-item list-group-item-action">Конфидециальность данных</div>
                        <div class="list-group-item list-group-item-action">Условия использования сайта</div>
                    </div>
                </div>
                <div class="col-sm-12 mt-4">
                    <button @click='becomeCompanion' class='btn btn-block companion' style='background-color: #fd7e14; color: #fff; border: none; outline: none; height: 50px; font-weight: 700'>Стать попутчиком</button>
                    <button @click='becomeClient' class='btn btn-block client' style='background-color: #fd7e14; color: #fff; border: none; outline: none; height: 50px; font-weight: 700'>Стать клиентом</button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'SideNav',
    data() {
        return {
            isCompanion: '',
            isClient: '',
            userPhoneNumber: '',
            userFullName: '',
            balans: '',
        }
    },
    mounted() {
        document.querySelector('.companion').style.display = 'none'
        document.querySelector('.client').style.display = 'none'
        if (localStorage.getItem('token') !== null) {
            this.getUser()
        }
    },
    methods: {
        goPayments() {
            this.$router.push('/payments').catch(() => {})
        },
        logout() {
            localStorage.clear()
            this.$router.push('/login')
        },
        getUser() {
            axios.get('api/userData', {
                    headers: {
                        token: localStorage.getItem('token')
                    }
                })
                .then((res) => {
                    console.log(res.data.user)
                    const user = res.data.user
                    this.userFullName = user.firstName + ' ' + user.lastName
                    this.userPhoneNumber = user.phoneNumber
                    this.balans = user.balans
                    if (res.data.user.isCompanion === true && res.data.user.isClient === false) {
                        document.querySelector('.companion').style.display = 'none'
                        document.querySelector('.client').style.display = 'block'
                    } else {
                        document.querySelector('.companion').style.display = 'block'
                        document.querySelector('.client').style.display = 'none'
                    }
                })
        },
        becomeCompanion() {
            localStorage.removeItem('isCompanion')
            localStorage.removeItem('isClient')
            const cc = {
                isCompanion: true,
                isClient: false
            }
            axios.post('api/becomeCompanion', cc, {
                    headers: {
                        token: localStorage.getItem('token'),
                        userid: localStorage.getItem('userID')
                    }
                })
                .then(res => {
                    if (res.status === 200) {
                        console.log('You become a companion')
                        localStorage.setItem('isCompanion', cc.isCompanion)
                        localStorage.setItem('isClient', cc.isClient)
                        this.$router.push('/companionHome/orders')
                    } else {
                        console.log('You dont able to a companion')
                    }
                })
                .then(() => {
                    this.isCompanion = true
                    this.isClient = false
                    document.querySelector('.companion').style.display = 'none'
                    document.querySelector('.client').style.display = 'block'
                })
        },
        becomeClient() {
            localStorage.removeItem('isCompanion')
            localStorage.removeItem('isClient')
            const cc = {
                isCompanion: false,
                isClient: true
            }
            axios.post('api/becomeClient', cc, {
                    headers: {
                        token: localStorage.getItem('token'),
                        userid: localStorage.getItem('userID')
                    }
                })
                .then(res => {
                    if (res.status === 200) {
                        console.log('You become a client')
                        localStorage.setItem('isCompanion', cc.isCompanion)
                        localStorage.setItem('isClient', cc.isClient)
                        this.$router.push('/')
                    } else {
                        console.log('You become a companion')
                    }
                })
                .then(() => {
                    this.isCompanion = false
                    this.isClient = true
                    document.querySelector('.client').style.display = 'none'
                    document.querySelector('.companion').style.display = 'block'
                })
        }
    }
}
</script>

<style lang="scss">

</style>
