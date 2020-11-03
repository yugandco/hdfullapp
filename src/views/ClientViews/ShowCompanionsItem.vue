<template>
<div id='companionsItem' class="col-sm-12">
    <div class="card">
        <div class="row g-0">
            <div class="col-3 d-flex justify-content-center pt-3">
                <div class='companionsItem__img rounded-circle' style='height: 60px; width: 60px; background-color: #009ffa'></div>
            </div>
            <div class="col-9">
                <div class="card-body">
                    <h5 class="card-title mb-2">{{ companiondata.from + ' - ' + companiondata.to }}</h5>
                    <p class="card-text mb-0"><small class='text-muted'>Время: <span class='font-weight-bold'>{{ companiondata.date | moment(companiondata.date)}} </span></small></p>
                    <p class="card-text mb-0"><small class='text-muted'>Вид посылки: <span class='font-weight-bold'>{{ companiondata.typePackage }}</span></small></p>
                    <p class="card-text"><small class="text-muted">Цена: <span class='font-weight-bold'>{{ companiondata.price }} тг. </span></small></p>
                </div>
            </div>
        </div>
        <div class="card-footer">
            <button @click='submitApplication()' class='btn btn-dark float-right'>Подать заявку</button>
        </div>
    </div>
</div>
</template>

<script>
import moment from 'moment'
export default {
    name: 'ShowCompanionsItem',
    props: {
        companiondata: {
            type: Object,
            default () {
                return {}
            }
        }
    },
    data() {
        return {
            isClicked: ''
        }
    },
    mounted() {

    },
    methods: {
        moment(date) {
            return moment(date)
        },
        submitApplication(id) {
            this.$emit('submitApplication', id)
        },
        changedBeforeLoad() {
            if (this.$router.history.current.fullPath === '/show-companions') {
                console.log('hau')
            }
        }
    },
    filters: {
        moment(date) {
            return moment(date).format('LLL')
        }
    }
}
</script>
