<template>
<div class="neworder mt-5 pt-4" style=''>
    <div class="container-fluid">
        <div @click='backToMain' class="neworder__back mb-4 d-flex align-items-center text-muted">
            <i class="material-icons">arrow_back</i><span>Назад на главную</span>
        </div>
        <div class='neworder__title h1 mb-0 font-weight-bold border-bottom pb-3'>Новое объявление</div>
        <div class='neworder__body mt-3'>
            <div class="row">
                <div class="col-sm-12 col-xs-12">
                    <select name='transport' id='transport' class="form-select mb-3" v-model='ads.typeTransport'>
                        <option selected disabled value=''>Выбираем вид транспорта</option>
                        <option value='airplanemode_active'>Авиа</option>
                        <option value='train'>ЖД</option>
                        <option value='directions_car'>Авто</option>
                    </select>
                    <select name="from" id='from' class='form-select mb-3' v-model='ads.from'>
                        <option selected disabled value=''>Откуда забрать посылку</option>
                        <option v-for="(location, index) in locations" :key="index" :value="location.city">{{location.city}}</option>
                    </select>
                    <select name="to" id='to' class='form-select mb-3' v-model='ads.to'>
                        <option selected disabled value=''>Куда отвезти</option>
                        <option v-for="(location, index) in locations" :key="index" :value="location.city">{{location.city}}</option>
                    </select>
                    <div class="input-group mb-3">
                        <label class="input-group-text" for='date'>
                            <i class='material-icons'>today</i>
                        </label>
                        <input id='date' type='datetime-local' class='form-control' v-model='ads.date'>
                    </div>
                    <select name="package" id="package" class='form-select mb-3' v-model='ads.typePackage'>
                        <option selected disabled value=''>Выбираем посылку</option>
                        <option v-for='(item, index) in packages' :key='index' :value='item.type'>{{ item.type }}</option>
                    </select>
                    <select name="price" id="price" class='form-select mb-4' v-model='ads.price'>
                        <option selected disabled value="">Определяем цену</option>
                        <option v-for='(price, index) in prices' :key='index' :value='price.type'>{{ price.type }} тг.</option>
                    </select>
                    <button @click='submitAds' class='btn btn-block shadow' style='background-color: #fd7e14; color: #fff; border: none; outline: none; height: 50px; font-weight: 700'>Подать объявление</button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'NewOrder',
    data() {
        return {
            ads: {
                from: '',
                to: '',
                price: '',
                date: '',
                typePackage: '',
                typeTransport: ''
            },
            prices: [{
                    type: 1000
                },
                {
                    type: 1500
                },
                {
                    type: 2000
                },
                {
                    type: 2500
                },
                {
                    type: 3000
                }
            ],
            packages: [{
                    type: '1 Пакет(Стандартный)'
                },
                {
                    type: '2 Пакет(Стандартный)'
                },
                {
                    type: 'Конверт 1-5 кол.'
                },
                {
                    type: 'Конверт более 5 кол.'
                },
                {
                    type: 'Коробка 1 шт.'
                }
            ],
            locations: [{
                    city: 'Нур-Султан'
                },
                {
                    city: 'Алматы'
                },
                {
                    city: 'Шымкент'
                },
                {
                    city: 'Тараз'
                },
                {
                    city: 'Кызылорда'
                },
                {
                    city: 'Актобе'
                },
                {
                    city: 'Уральск'
                },
                {
                    city: 'Атырау'
                },
                {
                    city: 'Актау'
                },
                {

                    city: 'Костанай'
                },
                {

                    city: 'Павлодар'
                },
                {

                    city: 'Петропавлск'
                },
                {

                    city: 'Кокшетау'
                },
                {

                    city: 'Семей'
                },
                {

                    city: 'Ускаменагорск'
                },
                {

                    city: 'Туркестан'
                },
                {

                    city: 'Караганда'
                },
                {

                    city: 'Жезказган'
                },
                {

                    city: 'Талдыкурган'
                }
            ]

        }
    },
    methods: {
        submitAds() {
            const ads = {
                from: this.ads.from,
                to: this.ads.to,
                price: this.ads.price,
                date: this.ads.date,
                typePackage: this.ads.typePackage,
                typeTransport: this.ads.typeTransport
            }
            const vm = this
            axios.post('api/companion-new-order', ads, {
                    headers: {
                        token: localStorage.getItem('token'),
                        userid: localStorage.getItem('userID')
                    }
                })
                .then(res => {
                    res.status === 200 ? console.log(res) : console.log('Error')
                    if (this.ads.from === '' || this.ads.to === '' || this.ads.price === '' || this.ads.date === '' || this.ads.typePackage === '' || this.ads.typeTransport === '') {
                        console.log('Пожалуйста заполните все данные...')
                    } else {
                        this.$router.push('/companionHome/orders').catch(() => {})
                    }
                })
        },
        backToMain() {
            this.$router.push('/companionHome/orders').catch(() => {})
        }
    },
}
</script>

<style lang="scss" scoped>
.neworder__back:hover {
    color: rgba(0, 0, 0, .7) !important;

    span {
        text-decoration: underline;
    }
}
</style>
