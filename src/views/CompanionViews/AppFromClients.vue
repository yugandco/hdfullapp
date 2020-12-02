<template>
<div class='appfromme mt-5 pt-4'>
    <div class="container-fluid">
        <div @click='backToSearch' class='appfromme__back d-flex align-items-center mb-3 text-muted'>
            <i class='material-icons'>arrow_back</i>
            <span>Назад к поиску</span>
        </div>
        <div class="appfromme__title h1 mb-0 border-bottom pb-3">Заявки от клиентов</div>
        <div class="appfromme__body">
            <div class="row gy-2">
                <div class="col-sm-12" style='height: 70vh; overflow-y: scroll; overflow-x:hidden'>
                    <div class="row gy-2 mb-5 pb-5">
                        <div v-for='(client, index) in clients' :key='index' class="col-sm-12">
                            <div class="card">
                                <div class="row g-0">
                                    <div class="col-3 d-flex justify-content-center pt-3">
                                        <div class="appfromme__img rounded-circle" style='height: 60px; width: 60px; background-color: #009ffa'></div>
                                    </div>
                                    <div class="col-9">
                                        <div class="card-body">
                                            <h5 class='card-title mb-2'>{{ client.fullName }}</h5>
                                            <p class='card-text mb-0'>
                                                <small class='text-muted'>
                                                    <i class='material-icons' style='color: #fd7e14'>{{ client.typeTransport }}</i> {{client.from + ' - ' + client.to}}
                                                </small>
                                            </p>
                                            <p class='card-text mb-0'><small class='text-muted'>Время: <span class='font-wieght-bold'>{{ client.date }}</span></small></p>
                                            <p class='card-text mb-0'><small class="text-muted">Посылка: <span class='font-wieght-bold'>{{ client.typePackage }} тг.</span></small></p>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-footer">
                                    <p v-if='client.companion.id === storageID' class='card-text'>Вы заявку приняли, свяжитесь с клиентом <a :href='"tel:" + client.phoneNumber'>{{client.phoneNumber}}</a></p>
                                    <button v-else @click='acceptClientOrder(client._id)' class='btn btn-primary float-right'>Принять заявку</button>
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
export default {
    name: 'AppFromClients',
    data() {
        return {
            clients: [],
            arr: [],
            storageID: localStorage.getItem('userID')
        }
    },
    created() {},
    mounted() {
        this.getAppsFromClients()
    },
    methods: {
        acceptClientOrder(id) {
            const clientOrderID = id
            const companionUserID = localStorage.getItem('userID')
            axios.post(`api/companion-applications-from-clients/${companionUserID}/${clientOrderID}`)
                .then(res => {
                    if (res.status === 200) {
                        console.log(res)
                        // const datas = res.data.clients
                        // datas.forEach(data => {
                        //     this.clients.push(data)
                        // })
                    }
                })
        },
        getAppsFromClients() {
            const companionUserID = localStorage.getItem('userID')
            axios.get(`api/companion-applications-from-clients/${companionUserID}`)
                .then(res => {
                    if (res.status === 200) {
                        console.log(res)
                        const datas = res.data.clients

                        datas.forEach(client => {
                            this.arr.push(client)
                        })

                        this.clients = this.arr
                        // .filter(client => {
                        //     return (client.companion.id !== userid)
                        // })
                    } else {
                        console.log('error')
                    }
                })
        },
        backToSearch() {
            this.$router.push('/companion-history').catch(() => {})
        }
    },
}
</script>

<style lang="scss" scoped>
    
</style>
