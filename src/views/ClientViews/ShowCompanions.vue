<template>
<div class='showcompanions mt-5 pt-4'>
    <div class="container-fluid">
        <div class="showcompanions__title h1 mb-0 border-bottom pb-3">Найдено</div>
        <div class="showcompanions__body">
            <div class="row gy-2">
                <div class="col-sm-12" style="height: 70vh; overflow-y: scroll; overflow-x:hidden">
                    <div class="row gy-2 mb-5 pb-5">
                        <show-companions-item v-for='(companion, index) in companions' :key='index' :companiondata='companion' />
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
            axios.get('/show-companions', {
                    params: searchItem
                })
                .then(res => {
                    res.status === 200 ? console.log(res) : console.log('Error can not get companions Data')
                    const datas = res.data.companions
                    datas.forEach(data => {
                        this.companions.push(data)
                    })
                })
        }
    }
}
</script>
