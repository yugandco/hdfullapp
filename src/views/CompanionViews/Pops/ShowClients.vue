<template>
<div class='showclients mt-5 pt-4'>
    <div class="container-fluid">
        <div class="showclients__title h1 mb-0 font-weight-bold mb-3 border-bottom pb-2">Найдено</div>
        <div class="showclients__body" style='height: 77vh; overflow-y: scroll; overflow-x:hidden;'>
            <div class="row gy-2">
                <div class="col-12 d-flex align-items-center text-muted"><i class='material-icons'>arrow_back</i> Назад к поиску</div>
                <div class="col-12" v-for='(client, index) in clients' :key='index'>
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
                        <div class="card-footer">
                            <button @click='submitApplication(client._id)' class='btn btn-dark float-right'>Подать заявку</button>
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
    name: 'ShowClients',
    data() {
        return {
            clients: [],
            arr: [],
            companionOrderID: ''
        }
    },
    created() {
        this.loadClients()
    },
    methods: {
        loadClients() {
            const userid = localStorage.getItem('userID')
            const search = JSON.parse(localStorage.getItem('search'))

            const packageType = search.typePackage
            const replacedPackageType = packageType.replace(/ /g, '-')

            axios.get(`api/companion-home-search-result/${search.typeTransport}/${search.from}/${search.to}/${search.price}/${replacedPackageType}/${search.date}`)
                .then(res => {
                    if (res.status === 200) {
                        console.log(res)
                        this.companionOrderID = res.data.companion._id

                        const datas = res.data.clients

                        datas.forEach(data => {
                            this.clients.push(data)
                        })
                    }
                })
        },
        submitApplication(id) {
            const userid = localStorage.getItem('userID')
            const orderid = this.companionOrderID
            axios.post(`api/companion-home-search-result/${orderid}/${userid}/${id}`, null)
                .then(res => {
                    if (res.status === 200) {
                        console.log(res)
                        if (res.data.title === 'Чтобы подать заявку, нужно создать новое объявление!') {
                            this.$router.push('/companion-home').catch(() => {})
                        }
                        this.arr = this.clients.filter(data => {
                            return (data._id !== id)
                        })

                        this.clients = this.arr
                    }
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
