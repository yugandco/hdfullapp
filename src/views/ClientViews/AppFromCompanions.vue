<template>
<div class='appfromcompanions mt-5 pt-4'>
    <div class="container-fluid">
        <div @click='backToSearch' class='appfromme__back d-flex align-items-center mb-3 text-muted'>
            <i class='material-icons'>arrow_back</i>
            <span>Назад к поиску</span>
        </div>
        <div class="appfromcompanions__title h1 mb-0 border-bottom pb-3">Заявки от попутчиков</div>
        <div class="appfromcompanions__body">
            <div class="row gy-2">
                <div class="col-sm-12" style='height: 70vh; overflow-y: scroll; overflow-x:hidden'>
                    <div class="row gy-2 mb-5 pb-5">
                        <div class='col-12' v-if='companions.length === 0'>Пока нет заявок от попутчиков</div>
                        <div v-for='(companion, index) in companions' :key='index' class="col-sm-12">
                            <div class="card">
                                <div class="row g-0">
                                    <div class="col-3 d-flex justify-content-center pt-3">
                                        <div class="appfromcompanions__img rounded-circle" style='height: 60px; width: 60px; background-color: #009ffa'></div>
                                    </div>
                                    <div class="col-9">
                                        <div class="card-body">
                                            <h5 class='card-title mb-2'>{{ companion.fullName }}</h5>
                                            <p class='card-text mb-0'>
                                                <small class='text-muted'>
                                                    <i class='material-icons' style='color: #fd7e14'>{{ companion.typeTransport }}</i> {{companion.from + ' - ' + companion.to}}
                                                </small>
                                            </p>
                                            <p class='card-text mb-0'><small class='text-muted'>Время: <span class='font-wieght-bold'>{{ companion.date }}</span></small></p>
                                            <p class='card-text mb-0'><small class="text-muted">Посылка: <span class='font-wieght-bold'>{{ companion.typePackage }} тг.</span></small></p>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-footer">
                                    <button @click='acceptCompanionOrder(companion._id)' class='btn btn-primary float-right'>Принять заказ</button>
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
    name: 'AppFromCompanions',
    data() {
        return {
            companions: [],
            arr: [],
            userid: localStorage.getItem('userID')
        }
    },
    mounted() {
        this.getAppsFromCompanions()
    },
    methods: {
        acceptCompanionOrder(id) {
            const orderid = id
            const clientUserID = localStorage.getItem('userID')
            axios.post(`api/client-applications-from-companions/${clientUserID}/${orderid}`)
                .then(res => {
                    if (res.status === 200) {
                        console.log(res)
                        // let filterCompanions = this.companions.filter(client => {
                        //     return (companion._id !== orderid)
                        // })
                        // this.companions = filterCompanions
                    }
                })
        },
        getAppsFromCompanions() {
            const clientUserID = localStorage.getItem('userID')
            const orderid = localStorage.getItem('clientOrderID')
            axios.get(`api/client-applications-from-companions/${clientUserID}/${orderid}`)
                .then(res => {
                    if (res.status === 200) {
                        console.log(res)
                        const datas = res.data.companions

                        datas.forEach(companion => {
                            this.arr.push(companion)
                        })

                        this.companions = this.arr
                    } else {
                        console.log('error')
                    }
                })
        },
        backToSearch() {
            this.$router.push('/history').catch(() => {})
        }
    },

}
</script>

<style lang="scss">
    
</style>
