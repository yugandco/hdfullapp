<template>
<div class="result" ref="resultpopup">
    <div class="result__inner">
        <div class="container-fluid">
            <div class="result__title">
                <div class='h1 mb-0'>Найдено 10 попутчиков</div>
            </div>
            <div class="result__body"></div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'SearchPopup',
    data() {
        return {
            companions: [{
                    id: 1,
                    name: 'Азамат',
                    deliveryThing: 'Документы, коробки, груз до 5кг',
                    deliveryTime: '22:00',
                    deliveryPrice: 3000,
                    companionRanking: 5
                },
                {
                    id: 2,
                    name: 'Таир',
                    deliveryThing: 'Документы, коробки, груз до 5кг',
                    deliveryTime: '21:00',
                    deliveryPrice: 2000,
                    companionRanking: 5
                },
                {
                    id: 3,
                    name: 'Дауылгерей',
                    deliveryThing: 'Документы, коробки, груз до 5кг',
                    deliveryTime: '10:00',
                    deliveryPrice: 2500,
                    companionRanking: 5
                }
            ]
        }
    },
    methods: {
        closePopupResult() {
            this.$emit('closePopupResult')
        },
        chooseCompanion() {}
    },
    mounted() {
        const vm = this
        document.addEventListener('click', (item) => {
            if (item.target === vm.$refs.resultPopup) {
                vm.closePopupResult()
            }
        })
    }
}
</script>

<style lang="scss" scoped>
.resutl {
    height: 100vh;

}
</style>
