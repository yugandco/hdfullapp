<template>
<div class='history mt-5 pt-4' id='CompanionHistory'>
    <div class="container-fluid">
        <div class='history__title h1 mb-0 border-bottom pb-3'>Мои посылки</div>
        <div class="history__body" style='overflow-y: scroll; overflow-x: hidden; height: 78vh;'>
            <div class="row gy-2">
                <div class="col-sm-12 mt-3" v-for='(order, index) in orders' :key='index'>
                    <div class="card">
                        <div class="card-header d-flex align-items-center justify-content-between">
                            <div class="float-left">
                                <div class='h5 mb-0 font-weight-bold'>{{order.from + ' - ' + order.to}}</div>
                            </div>
                            <div class="float-right">
                                <div class="dropdown">
                                    <button id='dropdown-option' class="btn btn-light rounded-circle d-flex align-items-center" style='height: 50px;' data-toggle='dropdown' aria-expanded="false">
                                        <span class='material-icons'>more_vert</span>
                                    </button>
                                    <ul class="dropdown-menu" aria-labelledby="dropdown-option">
                                        <li><a class="dropdown-item" href="#">Изменить заявку</a></li>
                                        <li><a class="dropdown-item" href="#">Удалить заявку</a></li>
                                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title"></h5>
                            <div class="card-subtitle mb-2 text-muted">
                                <p class='mb-0'>Время: <span class='font-weight-bold'>{{ order.date | moment(order.date) }}</span></p>
                                <p class='mb-0'>Цена: <span class='font-weight-bold'>{{ order.price }}</span> тг.</p>
                                <p>Ваша посылка: <span class="font-weight-bold">{{ order.typePackage }}</span></p>
                            </div>
                        </div>
                        <div class="card-footer">
                            <p v-if='order.companion.deliveryStatus.isDelivered.text === "Посылка доставлена"' class='card-text'>Посылка доставлена</p>
                            <button v-else @click='successDelivered(order._id)' class='btn btn-success'>Посылку доставил</button>
                        </div>
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
    name: 'CompanionHistory',
    data() {
        return {
            orders: []
        }
    },
    mounted() {
        this.getAllMyOrders()
    },
    methods: {
        successDelivered(id) {
            const clientOrderID = id
            const companionUserID = localStorage.getItem('userID')
            console.log(clientOrderID, ' ', companionUserID)
            axios.post(`api/companion-history/${clientOrderID}/${companionUserID}`)
                .then(res => {
                    console.log(res)
                })
        },
        getAllMyOrders() {
            const companionUserID = localStorage.getItem('userID')
            axios.get(`api/companion-history/${companionUserID}`)
                .then(res => {
                    console.log(res)
                    const datas = res.data.clients
                    datas.forEach(data => {
                        this.orders.push(data)
                    })

                })
        },
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

<style lang="scss" scoped>
    
</style>
