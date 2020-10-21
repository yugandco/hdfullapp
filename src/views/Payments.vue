<template>
<div class="payments mt-5 pt-4">
    <div class="container-fluid">
        <div class="payments__title h1 mb-0 border-bottom font-weight-bold pb-3">Платежи</div>
        <div class="payments__body mt-5">
            <div class="row">
                <div class="col-sm-12 .col-md-4">
                    <button class='btn btn-light btn-block font-weight-bold'>Пополнить счет с <span class='bg-warning'>Kaspi.kz</span></button>
                </div>
                <div class="col-sm-12 .col-md-4 mt-4">
                    <button class='btn btn-light btn-block font-weight-bold'>Пополнить счет с <span class='bg-dark text-white'>Карты</span></button>
                </div>
                <div class="col-sm-12 .col-md-4 mt-4">
                    <button class='btn btn-light btn-block font-weight-bold'>Пополнить счет с <span class='bg-light'>Qiwi</span></button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'Payments'
}
</script>

<style lang="scss" scoped>
</style>
