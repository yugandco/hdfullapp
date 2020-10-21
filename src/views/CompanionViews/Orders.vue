<template>
<div id='orders' class='orders h-100 overflow-auto' style="">
    <accepted-modal v-if='isAcceptedModalOpen' @closeAcceptedModal='closeAcceptedModal' />
    <div class="container-fluid">
        <div class="row gy-2">
            <div class="col-sm-12 p-0 pb-2 border-bottom">
                <div class="float-right">
                    <div class="dropdown">
                        <button id='dropdown-option' class="btn btn-light rounded-circle d-flex align-items-center" style='height: 50px;' data-toggle='dropdown' aria-expanded="false">
                            <span class='material-icons'>more_vert</span>
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdown-option">
                            <li><a class="dropdown-item" href="#">Показать все виды транспорта</a></li>
                            <li><a class="dropdown-item" href="#">Показать Авиа заказы</a></li>
                            <li><a class="dropdown-item" href="#">Показать ЖД заказы</a></li>
                            <li><a class="dropdown-item" href="#">Показать Авто заказы</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-sm-12" style="height: 62.5vh; overflow-y: scroll; overflow-x:hidden">
                <div class="row gy-2 mb-5 pb-5">
                    <orders-item v-for=' (order, index) in orders' :key='index' :orderdata='order' @openAcceptedModal='openAcceptedModal' />
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
            orderFromClients: [{
                directions: '',
                from: '',
                to: '',
                typePackage: '',
                date: '',
                price: '',
                avatar: '',
            }],
            orders: [],
            singleClient: false,
            isAcceptedModalOpen: false
        }
    },
    created() {
        axios.get('api/companionHome/orders')
            .then((res) => {
                console.log(res.data.clients)
                const datas = res.data.clients
                datas.forEach(data => {
                    this.orders.push(data)
                })
            })
    },
    mounted() {
        this.searchBtn()
    },
    methods: {
        openAcceptedModal() {
            this.isAcceptedModalOpen === false ? this.isAcceptedModalOpen = true : this.isAcceptedModalOpen
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
