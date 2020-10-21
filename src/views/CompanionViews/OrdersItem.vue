<template>
<div id='ordersItem' class="col-sm-12 p-0">
    <div class="card">
        <div class="row g-0">
            <div class="col-3 d-flex justify-content-center pt-3">
                <div class='ordersItem__img rounded-circle' style='height: 60px; width: 60px; background-color: #009ffa'></div>
            </div>
            <div class="col-9">
                <div class="card-body">
                    <h5 class="card-title mb-2">{{ orderdata.from + ' - ' + orderdata.to }}</h5>
                    <p class="card-text mb-0"><small class='text-muted'>Время: <span class='font-weight-bold'>{{ orderdata.date | moment(orderdata.date) }} </span></small></p>
                    <p class="card-text mb-0"><small class='text-muted'>Вид посылки: <span class='font-weight-bold'>{{ orderdata.typePackage }}</span></small></p>
                    <p class="card-text"><small class="text-muted">Цена: <span class='font-weight-bold'>{{ orderdata.price }} тг. </span></small></p>
                </div>
            </div>
        </div>
        <div class="card-footer">
            <button @click='openAcceptedModal' class='btn btn-primary float-right'>Смогу забрать</button>
        </div>
    </div>
</div>
</template>

<script>
import moment from 'moment'
export default {
    name: 'OrdersItem',
    props: {
        orderdata: {
            type: Object,
            default () {
                return {}
            }
        }
    },
    methods: {
        moment(date) {
            return moment(date)
        },
        openAcceptedModal() {
            this.$emit('openAcceptedModal')
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
