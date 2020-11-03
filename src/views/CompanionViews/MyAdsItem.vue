<template>
<div id='myadsitem' class='col-sm-12 p-0'>
    <div class="card">
        <div class="card-header d-flex align-items-center justify-content-between">
            <h5 class="card-title float-left">{{ addata.from + ' - ' + addata.to }}</h5>
            <div class="float-right">
                <div class="dropdown">
                    <button id='dropdown-option' class="btn btn-light rounded-circle d-flex align-items-center" style='height: 50px;' data-toggle='dropdown' aria-expanded="false">
                        <span class='material-icons'>more_vert</span>
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdown-option">
                        <li><a class="dropdown-item" href="#">Изменить</a></li>
                        <li><a class="dropdown-item" href="#">Удалить</a></li>
                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="card-body">
            <div class="card-subtitle">
                <i class='material-icons' style='color: #fd7e14'>{{ addata.typeTransport }}</i>
            </div>
            <p class='card-text mb-0 text-muted'>Вид посылки: <span class='font-weight-bold'>{{addata.typePackage}}</span></p>
            <p class='card-text mb-0 text-muted'>Цена: <span class='font-weight-bold'>{{addata.price}} тг.</span></p>
            <p class='card-text mb-0 text-muted'>Время: <span class='font-weight-bold'>{{addata.date | moment(addata.date)}}</span></p>
        </div>
        <div class="card-footer text-center">
            <div class='border-bottom mt-2 pb-3 font-weight-bold'>Заявки от:</div>
            <div class="row mt-3 pb-2">
                <div class="col">
                    <button @click='openAppFromMe(addata._id)' class='btn btn-outline-secondary btn-block'>Меня <span class='badge bg-danger' style=''></span></button>
                </div>
                <div class="col">
                    <button @click='openAppFromClients(addata._id)' class='btn btn-dark btn-block'>Клиентов <span class='badge bg-danger' style=''></span></button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import moment from 'moment'

export default {
    name: 'MyAdsItem',
    props: {
        addata: {
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
        openAppFromClients(id) {
            console.log(id)
            localStorage.setItem('orderid', id)
            this.$router.push('/companion-applications-from-clients').catch(() => {})
        },
        openAppFromMe(id) {
            console.log(id)
            localStorage.setItem('orderid', id)
            this.$router.push('/companion-applications-from-me').catch(() => {})
        }
    },
    filters: {
        moment(date) {
            return moment(date).format('l')
        }
    }
}
</script>
