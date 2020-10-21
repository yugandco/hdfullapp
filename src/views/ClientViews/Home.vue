<template>
<div class="home mt-5 pt-4" style=''>
    <div class="container-fluid">
        <div class='home__title h1 mb-0 font-weight-bold border-bottom pb-3'>Поиск лучших попутчиков</div>
        <div class='home__body mt-3'>
            <div class="row">
                <div class="col-sm-12 col-xs-12">
                    <select name='transport' id='transport' class="form-select mb-3" v-model='selectedData.transport'>
                        <option selected disabled value=''>Выбираем вид транспорта</option>
                        <option value='airplanemode_active'>Авиа</option>
                        <option value='train'>ЖД</option>
                        <option value='directions_car'>Авто</option>
                    </select>
                    <select name="from" id='from' class='form-select mb-3' v-model='selectedData.from'>
                        <option selected disabled value=''>Откуда забрать посылку</option>
                        <option v-for="location in locations" :key="location.id" :value="location.city">{{location.city}}</option>
                    </select>
                    <select name="to" id='to' class='form-select mb-3' v-model='selectedData.to'>
                        <option selected disabled value=''>Куда отвезти</option>
                        <option v-for="location in locations" :key="location.id" :value="location.city">{{location.city}}</option>
                    </select>
                    <div class="input-group mb-3">
                        <label class="input-group-text" for='date'>
                            <i class='material-icons'>today</i>
                        </label>
                        <input id='date' type='date' class='form-control' v-model='selectedData.date'>
                    </div>
                    <select name="package" id="package" class='form-select mb-3' v-model='selectedData.packageType'>
                        <option selected disabled value="">Выбираем посылку</option>
                        <option v-for='item in packages' :key='item.id' :value='item.type'>{{ item.type }}</option>
                    </select>
                    <select name="price" id="price" class='form-select mb-4' v-model='selectedData.price'>
                        <option selected disabled value="">Определяем цену</option>
                        <option v-for='price in prices' :key='price.id' :value='price.type'>{{ price.type }} тг.</option>
                    </select>
                    <button @click='submitSearch' class='btn btn-block shadow' style='background-color: #fd7e14; color: #fff; border: none; outline: none; height: 50px; font-weight: 700'>ПОИСК ПОПУТЧИКОВ</button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import SearchPopup from './Pops/SearchPopup.vue'

export default {
    name: 'Home',
    components: {
        SearchPopup
    },
    data() {
        return {
            selectedData: {
                transport: '',
                from: '',
                to: '',
                packageType: '',
                date: '',
                price: ''
            },
            prices: [{
                    id: 1,
                    type: 1000
                },
                {
                    id: 2,
                    type: 1500
                },
                {
                    id: 3,
                    type: 2000
                },
                {
                    id: 4,
                    type: 2500
                },
                {
                    id: 5,
                    type: 3000
                }
            ],
            packages: [{
                    id: 1,
                    type: '1 Пакет(Стандартный)'
                },
                {
                    id: 2,
                    type: '2 Пакет(Стандартный)'
                },
                {
                    id: 3,
                    type: 'Конверт 1-5 кол.'
                },
                {
                    id: 4,
                    type: 'Конверт более 5 кол.'
                },
                {
                    id: 5,
                    type: 'Коробка 1 шт.'
                }
            ],
            locations: [{
                    id: 1,
                    city: 'Нур-Султан'
                },
                {
                    id: 2,
                    city: 'Алматы'
                },
                {
                    id: 3,
                    city: 'Шымкент'
                },
                {
                    id: 4,
                    city: 'Тараз'
                },
                {
                    id: 5,
                    city: 'Кызылорда'
                },
                {
                    id: 6,
                    city: 'Актобе'
                },
                {
                    id: 7,
                    city: 'Уральск'
                },
                {
                    id: 8,
                    city: 'Атырау'
                },
                {
                    id: 9,
                    city: 'Актау'
                },
                {
                    id: 10,
                    city: 'Костанай'
                },
                {
                    id: 11,
                    city: 'Павлодар'
                },
                {
                    id: 12,
                    city: 'Петропавлск'
                },
                {
                    id: 13,
                    city: 'Кокшетау'
                },
                {
                    id: 14,
                    city: 'Семей'
                },
                {
                    id: 15,
                    city: 'Ускаменагорск'
                },
                {
                    id: 16,
                    city: 'Туркестан'
                },
                {
                    id: 17,
                    city: 'Караганда'
                },
                {
                    id: 18,
                    city: 'Жезказган'
                },
                {
                    id: 19,
                    city: 'Талдыкурган'
                }
            ]
        }
    },
    created() {
        if (!localStorage.getItem('token')) {
            this.$router.push('/login')
        }
    },
    mounted() {

    },
    methods: {
        submitSearch() {
            const vm = this
            const homeSearchForm = {
                transport: this.selectedData.transport,
                from: this.selectedData.from,
                to: this.selectedData.to,
                packageType: this.selectedData.packageType,
                date: this.selectedData.date,
                price: this.selectedData.price
            }
            axios.post('api/homeSearch', homeSearchForm, {
                    headers: {
                        token: localStorage.getItem('token'),
                        userid: localStorage.getItem('userID')
                    }
                })
                .then((res) => {
                    console.log(JSON.parse(res.config.data))
                    localStorage.setItem('search', res.config.data)
                    if (res.status === 200) {
                        this.$router.push('/show-companions')
                    }
                })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
