<template>
<div class='showcompanions mt-5 pt-4'>
    <div class="container-fluid">
        <div @click='backToSearch' class='showcompanions__back d-flex align-items-center mb-3 text-muted'>
            <i class='material-icons'>arrow_back</i>
            <span>Назад к поиску</span>
        </div>
        <div class="showcompanions__title h1 mb-0 border-bottom pb-3">Найдено</div>
        <div class="showcompanions__body">
            <div class="row gy-2">
                <div class="col-sm-12" style="height: 70vh; overflow-y: scroll; overflow-x:hidden">
                    <div class="row gy-2 mb-5 pb-5">
                        <show-companions-item v-for='(companion, index) in companions' :key='index' :companiondata='companion' @submitApplication='submitApplication(companion._id)' />
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
import ShowCompanionsItem from './ShowCompanionsItem.vue'

export default {
    name: "ShowCompanions",
    components: {
        ShowCompanionsItem
    },
    data() {
        return {
            companions: []
        }
    },
    mounted() {
        this.getCompanions()
    },
    methods: {
        backToSearch() {
            this.$router.push('/').catch(() => {})
            localStorage.removeItem('search')
        },
        submitApplication(id) {
            const userid = localStorage.getItem('userID')
            const orderid = id
            console.log(orderid)
            axios.post(`api/show-companions/${id}/${userid}`, null)
                .then(res => {
                    if (res.status === 200) {
                        let filterCompanions = this.companions.filter(companion => {
                            return (companion._id !== orderid)
                        })
                        this.companions = filterCompanions
                    }

                })
            console.log(id)
        },
        getCompanions() {
            const search = JSON.parse(localStorage.getItem('search'))
            console.log(search)
            const searchItem = {
                from: search.from,
                to: search.to,
                date: search.date,
                price: search.price,
                typePackage: search.packageType,
                transport: search.transport
            }
            const packageType = search.packageType
            const replacedPackageType = packageType.replace(/ /g, '-')
            console.log(replacedPackageType)
            axios.get(`/show-companions/${search.from}/${search.to}/${search.date}/${search.price}/${replacedPackageType}/${search.transport}`)
                .then(res => {
                    res.status === 200 ? console.log(res) : console.log('Error can not get companions Data')
                    const datas = res.data.companions
                    console.log(datas)
                    datas.forEach(data => {
                        this.companions.push(data)
                    })
                })
        }
    }
}
</script>
