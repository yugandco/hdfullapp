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
                        <div v-if='companions.length === 0' class='col-sm-12'>{{text}}</div>
                        <div v-for='(companion, index) in companions' :key='index' class="col-sm-12">
                            <div class="card">
                                <div class="row g-0">
                                    <div class="col-3 d-flex justify-content-center pt-3">
                                        <div class="appfromme__img rounded-circle" style='height: 60px; width: 60px; background-color: #009ffa'></div>
                                    </div>
                                    <div class="col-9">
                                        <div class="card-body">
                                            <h5 class='card-title mb-2'>{{companion.fullName}}</h5>
                                            <p class='card-text mb-0'>
                                                <small class='text-muted'>
                                                    <i class='material-icons' style='color: #fd7e14'>{{ companion.typeTransport }}</i> <span class='font-weight-bold'>{{ companion.from + ' - ' + companion.to }}</span>
                                                </small>
                                            </p>
                                            <p class='card-text mb-0'><small class='text-muted'>Время: <span class='font-wieght-bold'>{{ companion.date }}</span></small></p>
                                            <p class='card-text mb-0'><small class="text-muted">Цена: <span class='font-wieght-bold'>{{ companion.price }} тг.</span></small></p>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-footer">
                                    <p v-if='isAccepted'>Вашу заявку приняли, свяжитесь с попутчиком <a :href='"tel:" + companion.phoneNumber'>{{companion.phoneNumber}}</a></p>
                                    <p v-else class='card-text'>Ваша заявка еще не принята</p>
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
    name: 'AppFromClientMe',
    data() {
        return {
            companions: [],
            text: 'Вы еще не подавали заявки',
            isRespond: false,
            storageID: localStorage.getItem('userID'),
            isShow: false,
            isAccepted: ''
        }
    },
    created() {},
    mounted() {
        this.getAppsFromMe()

    },
    methods: {
        getAppsFromMe() {
            const userid = localStorage.getItem('userID')
            const orderid = localStorage.getItem('clientOrderID')
            axios.get(`api/client-applications-from-me/${userid}/${orderid}`)
                .then(res => {
                    console.log(res)
                    if (res.status === 200) {
                        const datas = res.data.companions
                        datas.forEach(data => {
                            this.companions.push(data)
                        })
                        this.companions.forEach(data => {
                            data.client.find(d => {
                                if(d.id === userid && d.deliveryStatus.isAdopted.status === true){
                                    this.isAccepted = d.id
                                }
                                return this.isAccepted
                            })
                        })
                    }
                })
        },
        backToSearch() {
            this.$router.push('/history').catch(() => {})
        }
    },
}
</script>

<style lang="scss" scoped>
    
</style>
