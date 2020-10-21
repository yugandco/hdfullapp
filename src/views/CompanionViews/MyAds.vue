<template>
<div id='myads' class='myads h-100 overflow-auto' style=''>
    <div class="container-fluid">
        <div class="row gy-2">
            <div class="col-sm-12 px-0 pb-2 border-bottom">
                <button @click='newOrderRouter' class="btn btn-dark btn-block">Новое объявление</button>
            </div>
            <div class="col-sm-12" style='height: 62.5vh; overflow-y: scroll; overflow-x:hidden;'>
                <div class="row gy-2 mb-5 pb-5 ">
                    <my-ads-item v-for='(item, index) in ads' :key='index' :addata='item' />
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import NewOrder from '../CompanionViews/Pops/NewOrder.vue'
import axios from 'axios'
import moment from 'moment'
import MyAdsItem from './MyAdsItem.vue'

export default {
    name: 'MyAds',
    components: {
        NewOrder,
        MyAdsItem
    },
    data() {
        return {
            ads: [],
        }
    },
    created() {
        this.getAds()

    },
    methods: {
        newOrderRouter() {
            this.$router.push('/companion-new-order').catch(() => {})
        },
        moment(date) {
            return moment(date)
        },
        getAds() {
            axios.get('api/companionHome/myads', {
                    headers: {
                        token: localStorage.getItem('toke'),
                        userid: localStorage.getItem('userID')
                    }
                })
                .then(res => {
                    console.log(res.data.companions)
                    const datas = res.data.companions
                    // datas.forEach(data => {
                    //     this.ads.push(data)
                    // })
                    this.ads = datas.map(data => ({
                        ...data
                    }))

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
