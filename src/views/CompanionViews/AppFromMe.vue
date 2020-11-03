<template>
<div class='appfromme mt-5 pt-4'>
    <div class="container-fluid">
        <div @click='backToSearch' class='appfromme__back d-flex align-items-center mb-3 text-muted'>
            <i class='material-icons'>arrow_back</i>
            <span>Назад к поиску</span>
        </div>
        <div class="appfromme__title h1 mb-0 border-bottom pb-3">Мои заявки</div>
        <div class="appfromme__body">
            <div class="row gy-2">
                <div class="col-sm-12" style='height: 70vh; overflow-y: scroll; overflow-x:hidden'>
                    <div class="row gy-2 mb-5 pb-5">
                        <div v-if='clients.length === 0' class='col-sm-12'>{{text}}</div>
                        <div v-for='(client, index) in clients' :key='index' class="col-sm-12">
                            <div class="card">
                                <div class="row g-0">
                                    <div class="col-3 d-flex justify-content-center pt-3">
                                        <div class="appfromme__img rounded-circle" style='height: 60px; width: 60px; background-color: #009ffa'></div>
                                    </div>
                                    <div class="col-9">
                                        <div class="card-body">
                                            <h5 class='card-title mb-2'>{{client._id}}</h5>
                                            <p class='card-text mb-0'>
                                                <small class='text-muted'>
                                                    <i class='material-icons' style='color: #fd7e14'>{{ client.typeTransport }}</i> <span class='font-weight-bold'>{{ client.from + ' - ' + client.to }}</span>
                                                </small>
                                            </p>
                                            <p class='card-text mb-0'><small class='text-muted'>Время: <span class='font-wieght-bold'>{{ client.date }}</span></small></p>
                                            <p class='card-text mb-0'><small class="text-muted">Цена: <span class='font-wieght-bold'>{{ client.price }} тг.</span></small></p>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-footer">
                                    <button v-if='client.companion.id !== userid' class='btn btn-light float-right'>Клиент заявку еще не принял</button>
                                    <button v-else class='btn btn-success float-right'>Заявка принята</button>
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
    name: 'AppFromMe',
    data() {
        return {
            clients: [],
            text: 'Вы еще не подавали заявки',
            userid: localStorage.getItem('userID')
        }
    },
    created() {},
    mounted() {
        this.getAppsFromMe()
    },
    methods: {
        getAppsFromMe() {
            const companionUserID = localStorage.getItem('userID')

            axios.get(`api/companion-applications-from-me/${companionUserID}`)
                .then(res => {
                    console.log(res)
                    if (res.status === 200) {
                        const datas = res.data.clients
                        datas.forEach(data => {
                            this.clients.push(data)
                        })
                    } else {
                        console.log(err)
                    }
                })
        },
        backToSearch() {
            this.$router.push('/companionHome/myads').catch(() => {})
        }
    },
}
</script>

<style lang="scss" scoped>
    
</style>
