<template>
<div class='applications'>
    <div class="applications__inside">
        <div class="container">
            <h1 class="applications__inside__title">Предложении</h1>
            <div class="applications__inside__wrapBox">
                <div class="box">
                    <div class="box__head">
                        <div class="box__head__image">
                            <div class="box__head__image__rounded"></div>
                        </div>
                        <div class="box__head__title">
                            <div class="box__head__title__fullname">Умбетали Ернар</div>
                            <div class="box__head__title__ranking">
                                <i class='material-icons'>star</i>
                                <i class='material-icons'>star</i>
                                <i class='material-icons'>star</i>
                                <i class='material-icons'>star</i>
                                <i class='material-icons'>star</i>
                            </div>
                        </div>
                    </div>
                    <div class="box__body">
                        <div class="box__body__price">3000 тг.</div>
                    </div>
                    <div class="box__footer">
                        <div class="box__footer__cancel">
                            <button class='btn btn-default'>Отменить</button>
                        </div>
                        <div class="box__footer__accept">
                            <button class='btn btn-primary'>Принять</button>
                        </div>
                    </div>
                </div>
                <!-- Box -->
            </div>
            <!-- WrapBox -->
            <div class="cancelApp" style='display: flex; justify-content: center'>
                <button @click='closeApplications' class='btn btn-default'>ЗАКРЫТЬ</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'Applications',
    methods: {
        closeApplications() {
            this.$emit('closeApplications')
        }
    },
}
</script>

<style lang="scss" scoped>
.applications {
    height: 100vh;
    width: 100%;
    position: absolute;
    top: 0;
    background-color: rgba(0, 0, 0, .3);
    z-index: 1;

    &__inside {
        height: 92vh;
        width: 100%;
        position: relative;
        margin-top: 8vh;
        background-color: #f8f8f8;
        padding: 16px 0;

        &__title {
            font-weight: 700;
        }

        &__wrapBox {
            margin-top: 20px;
            height: 75vh;
            overflow-y: scroll;
            overflow-x: hidden;

            .box {
                margin-top: 2vh;
                height: 23vh;
                width: 100%;
                background-color: #fff;
                padding-top: 10px;
                border-radius: 5px;

                &__head {
                    display: flex;
                    flex-direction: row;
                    height: 7vh;
                    width: 100%;
                    border-bottom: 1px solid rgb(177, 177, 177);

                    &__image {
                        height: 7vh;
                        width: 30%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding-bottom: 10px;

                        &__rounded {
                            height: 55px;
                            width: 55px;
                            border-radius: 50%;
                            background-color: #009ffa;
                        }
                    }

                    &__title {
                        height: 7vh;
                        width: 70%;

                        &__fullname {
                            font-size: 1.3em;
                            font-weight: 500;
                        }

                        &__ranking {
                            i {
                                font-size: 1em;
                                color: #ff8b1e;

                            }
                        }
                    }
                }

                &__body {
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    &__price {
                        margin-top: 15px;
                        font-size: 2em;
                        font-weight: bold;
                    }
                }

                &__footer {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: center;
                    margin-top: 20px;
                }
            }
        }
    }
}
</style>
