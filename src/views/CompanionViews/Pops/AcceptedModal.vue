<template>
<div class='modaling d-flex align-items-center' style='position: absolute; z-index: 1500; top: 0; left: 0; height: 100vh; width: 100%; background-color: rgba(0,0,0,0.7)'>
    <div class="container">
        <div class="card h-25">
            <div class="card-body text-center">
                <div class="card-title text-success">
                    <i class='material-icons' style='font-size: 2em;'>done_outline</i>
                </div>
                <p class="card-text">
                    Ваш заявка отправлена клиенту. Пожалуйста, ожидайте ответ в разделе <router-link to='/companion-history'>Мои посылки</router-link>!
                </p>
                <button @click='closeAcceptedModal' class='btn btn-dark'>Закрыть</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'AcceptedModal',
    methods: {
        closeAcceptedModal() {
            this.$emit('closeAcceptedModal')
        }
    },
}
</script>
