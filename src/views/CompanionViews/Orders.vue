<template>
<div id='orders' class='orders h-100 overflow-auto' style="">
    <accepted-modal v-if='isAcceptedModalOpen' @closeAcceptedModal='closeAcceptedModal' />
    <div class="container-fluid">
        <div class="row gy-2">
            <div v-if='hideWhenClicked' class='hide'>
                <div>{{isNullOrders}}</div>
                <div class='mt-3'><button @click='allOrders' class='btn btn-primary'>Все заказы</button></div>
            </div>
            <div class="col-sm-12" style="height: 62.5vh; overflow-y: scroll; overflow-x:hidden">
                <div class="row gy-2 mb-5 pb-5">
                    <orders-item v-for=' (order, index) in orders' :key='index' :orderdata='order' @openAcceptedModal='openAcceptedModal(order._id)' />
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import SingleClient from '../CompanionViews/Pops/SingleClient.vue'
import OrdersItem from '../CompanionViews/OrdersItem.vue'
import AcceptedModal from '../CompanionViews/Pops/AcceptedModal.vue'

export default {
    name: 'Orders',
    components: {
        SingleClient,
        OrdersItem,
        AcceptedModal
    },
    data() {
        return {
            isNullOrders: '',
            orders: [],
            singleClient: false,
            isAcceptedModalOpen: false,
            hideWhenClicked: true
        }
    },
    created() {
        if (!localStorage.getItem('searchCompanion')) {
            this.hideWhenClicked = false
            axios.get('api/companionHome/orders')
                .then((res) => {
                    console.log(res.data.clients)
                    const datas = res.data.clients
                    datas.forEach(data => {
                        this.orders.push(data)
                    })
                })
        } else {
            const data = JSON.parse(localStorage.getItem('searchCompanion'))
            axios.get(`api/companionHome/orders/${data.from}/${data.to}/${data.date}/${data.typeTransport}`)
                .then(res => {
                    if (res.status === 200) {
                        if (res.data.clients.length === 0) {
                            this.isNullOrders = 'Ваше объявление подано и заявок по вашему объявление не найдено...'
                            localStorage.removeItem('searchCompanion')
                        } else {
                            res.datas.clients.forEach(order => {
                                this.orders.push(order)
                            })
                            this.hideWhenClicked === true ? this.hideWhenClicked = false : this.hideWhenClicked
                        }
                    }
                })
        }
    },
    mounted() {},
    methods: {
        allOrders() {
            localStorage.removeItem('searchCompanion')
            axios.get('api/companionHome/orders')
                .then((res) => {
                    if (res.status === 200) {
                        this.hideWhenClicked = false
                        console.log(res.data.clients)
                        const datas = res.data.clients
                        this.orders = []

                        datas.forEach(data => {
                            this.orders.push(data)
                        })
                    }
                })
        },
        openAcceptedModal(id) {
            axios.post(`api/companion-home/orders/${id}`, null, {
                    headers: {
                        userid: localStorage.getItem('userID')
                    }
                })
                .then(res => {
                    if (res.status === 200) {
                        console.log(res)
                        this.isAcceptedModalOpen = true

                    } else {
                        console.log('Error')
                    }
                })
        },
        closeAcceptedModal() {
            this.isAcceptedModalOpen === true ? this.isAcceptedModalOpen = false : this.isAcceptedModalOpen
        },
        showSingleClient() {
            this.singleClient === false ? this.singleClient = true : this.singleClient
        },
        closeSC() {
            this.singleClient
        },

    },
    filters: {

    }
}
</script>

<style lang="scss" scoped>

</style>
