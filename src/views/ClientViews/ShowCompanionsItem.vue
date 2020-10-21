<template>
<div id='companionsItem' class="col-sm-12 p-0">
    <div class="card">
        <div class="row g-0">
            <div class="col-3 d-flex justify-content-center pt-3">
                <div class='companionsItem__img rounded-circle' style='height: 60px; width: 60px; background-color: #009ffa'></div>
            </div>
            <div class="col-9">
                <div class="card-body">
                    <h5 class="card-title mb-2">{{ companiondata.from + ' - ' + companiondata.to }}</h5>
                    <p class="card-text mb-0"><small class='text-muted'>Время: <span class='font-weight-bold'>{{ companiondata.date }} </span></small></p>
                    <p class="card-text mb-0"><small class='text-muted'>Вид посылки: <span class='font-weight-bold'>{{ companiondata.typePackage }}</span></small></p>
                    <p class="card-text"><small class="text-muted">Цена: <span class='font-weight-bold'>{{ companiondata.price }} тг. </span></small></p>
                </div>
            </div>
        </div>
        <div class="card-footer">
            <button class='btn btn-dark float-right'>Подать заявку</button>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'ShowCompanionsItem',
    props: {
        companiondata: {
            type: Object,
            default () {
                return {}
            }
        }
    }
}
</script>
