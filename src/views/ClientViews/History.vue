<template>
<div class='history mt-5 pt-4'>
    <div class="container-fluid">
        <div class='history__title h1 mb-0 font-weight-bold border-bottom pb-3'>Мои заказы</div>
        <div class="history__body mb-5" style='overflow-y: scroll; overflow-x: hidden; height: 78vh;'>
            <div class="row mb-5 gy-2">
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
                            <div class='text-center mb-3 pb-2 font-weight-bold border-bottom'>Заявки от:</div>
                            <div class="d-flex mb-2">
                                <div class="row">
                                    <div class="col-6">
                                        <button class='btn btn-light btn-block'>Меня <span class='badge bg-danger' style=''>0</span></button>
                                    </div>
                                    <div class="col-6">
                                        <button class='btn btn-dark btn-block m-0'>Попутчиков <span class='badge bg-danger' style=''>10</span></button>
                                    </div>
                                </div>
                            </div>
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
// import Applications from './Applications.vue'

export default {
    name: 'History',
    components: {
        // Applications
    },
    created() {
        this.updateData()
    },
    data() {
        return {
            orders: [],
            isShowApplication: false
        }
    },
    mounted() {

    },
    methods: {
        closeApplications() {
            this.isShowApplication === true ? this.isShowApplication = false : this.isShowApplication
        },
        showApplications() {
            this.isShowApplication === false ? this.isShowApplication = true : this.isShowApplication
        },
        moment(date) {
            return moment(date)
        },
        updateData() {
            axios.get('api/history', {
                    headers: {
                        userid: localStorage.getItem('userID')
                    }
                })
                .then(res => {
                    res.status === 200 ? console.log(res) : console.log('Error')
                    const datas = res.data.clients
                    datas.forEach(data => {
                        this.orders.push(data)
                    })
                })
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
