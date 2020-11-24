<template>
<div class='allorders mt-5 pt-4'>
    <div class="container-fluid">
        <div class="allorders__title h1 font-weight-bold mb-3 border-bottom">Все заказы</div>
        <div class="allorders__body">
            <div class="row gx-2">
                <div class="col">
                    <select name="from" id='from' class='form-select mb-3' v-model='from'>
                        <option selected disabled value=''>Откуда</option>
                        <option v-for="location in locations" :key="location.id" :value="location.city">{{location.city}}</option>
                    </select>
                </div>
                <div class="col">
                    <select @change='searchChoose' name="to" id='to' class='form-select mb-3' v-model='to'>
                        <option selected disabled value=''>Куда</option>
                        <option v-for="location in locations" :key="location.id" :value="location.city">{{location.city}}</option>
                    </select>
                </div>
            </div>
            <div class="row gy-2">
                <div class="col-sm-12" v-for='(client, index) in orders' :key="index">
                    <div class="card">
                        <div class="row g-0">
                            <div class="col-3 d-flex justify-content-center pt-3">
                                <div class='companionsItem__img rounded-circle' style='height: 60px; width: 60px; background-color: #009ffa'></div>
                            </div>
                            <div class="col-9">
                                <div class="card-body">
                                    <h5 class="card-title mb-2">{{ client.from + ' - ' + client.to }}</h5>
                                    <p class="card-text mb-0"><small class='text-muted'>Время: <span class='font-weight-bold'>{{ client.date | moment(client.date)}} </span></small></p>
                                    <p class="card-text mb-0"><small class='text-muted'>Вид посылки: <span class='font-weight-bold'>{{ client.typePackage }}</span></small></p>
                                    <p class="card-text"><small class="text-muted">Цена: <span class='font-weight-bold'>{{ client.price }} тг. </span></small></p>
                                </div>
                            </div>
                        </div>
                        <!--
                            <div class="card-footer">
                                <button :id='companion._id' @click='submitApp(companion._id)' class='btn btn-dark float-right'>Подать заявку</button>
                            </div>
                            -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'

export default {
    name: 'AllOrders',
    data() {
        return {
            from: '',
            to: '',
            orders: [],
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
    methods: {
        searchChoose() {
            axios.get(`api/companion-orders/${this.from}/${this.to}`)
                .then(res => {
                    if (res.status === 200) {
                        console.log(res)
                        const datas = res.data.clients

                        datas.forEach(data => {
                            this.orders.push(data)
                        })
                    }
                })
        },
        // submitApp(id) {
        //     const userid = JSON.parse(localStorage.getItem('userID'))
        //     axios.post(`api/submit-client-orders/${userid}/${id}`)
        //         .then(res => {
        //             if (res.status === 200) {
        //                 console.log(res)
        //                 // document.querySelector(`#${id}`).style.display = 'none'
        //                 // document.querySelector(`.${id}`).style.display = 'block'
        //             }
        //         })
        // },
        moment(date) {
            return moment(date)
        }
    },
    filters: {
        moment(date) {
            return moment(date).format('L')
        }
    }
}
</script>
