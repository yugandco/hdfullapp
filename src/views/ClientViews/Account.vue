<template>
<div class='Account'>
    <div class="container">
        <div class="accountTitle">
            <h5>Личный кабинет</h5>
            <div class="divideLine"></div>
        </div>
        <div class="accountContent">
            <div class="accountProfile">
                <div class="accountImage"></div>
                <div class="accountNameBlock">
                    <span class="accountName">Доспаев Таир</span>
                    <span class="accountBalance">Баланс: 0.00</span>
                    <span class="accountSettings">Редактировать данные</span>
                </div>
            </div>
            <div class="accountStatistics">
                <span>Статистика аккаунта</span>
            </div>
            <div class="accountInfo">
                <div class="accountFrom infos">
                    <label for="city">Город</label>
                    <div id="city">Нур-Султан</div>
                </div>
                <div class="accountPhoneNumber infos">
                    <label for="number">Номер телефона</label>
                    <div id="number">+7(778)624-85-53</div>
                </div>
                <div class="accountPassportNumber infos">
                    <label for="passportNumber">Номер уд. личности</label>
                    <div id="passportNumber">034323543</div>
                </div>
                <div class="accountPassportID infos">
                    <label for="passportID">ИИН</label>
                    <div id="passportID">9707292312312</div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'Account'
}
</script>

<style lang="scss" scoped>
.accountTitle {
    height: 18vh;
    padding-top: 5vh;

    h5 {
        font-size: 2rem;
        font-weight: bold;
    }
}

.accountContent {
    .accountProfile {
        display: flex;
        flex-direction: row;
        justify-content: space-around;

        .accountImage {
            height: 13vh;
            width: 13vh;
            border-radius: 50%;
            background: #009FFA;
            box-shadow: 0 5px 8px rgba(0, 159, 250, .30);
        }

        .accountNameBlock {
            display: flex;
            flex-direction: column;

            .accountName {
                font-size: 1.3em;
                font-weight: 600;
            }

            .accountBalance {
                font-weight: 300;
                position: relative;
                margin-top: .3vh;
            }

            .accountSettings {
                font-weight: 300;
                color: rgba(0, 0, 0, 0.3);
                position: relative;
                top: 2vh;
            }

            .accountSettings:hover {
                color: rgba(0, 0, 0, 0.8);
                text-decoration: underline;
            }
        }
    }

    .accountStatistics {
        height: 6vh;
        width: 100%;
        background-color: #efefef;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 2.5vh;
        border-radius: 5px;

        span {
            font-weight: 500;
        }
    }

    .accountInfo {
        height: 42vh;
        padding-top: 3vh;

        &>.infos {
            margin-top: 1vh;
        }

        .accountFrom {
            label {
                font-size: 1.1em;
                font-weight: 300;
                color: rgba(0, 0, 0, 0.35);
            }

            #city {
                font-size: 1.4em;
                font-weight: 500;
            }
        }

        .accountPhoneNumber {
            label {
                font-size: 1.1em;
                font-weight: 300;
                color: rgba(0, 0, 0, 0.35);
            }

            #number {
                font-size: 1.4em;
                font-weight: 500;
            }
        }

        .accountPassportNumber {
            label {
                font-size: 1.1em;
                font-weight: 300;
                color: rgba(0, 0, 0, 0.35);
            }

            #passportNumber {
                font-size: 1.4em;
                font-weight: 500;
            }
        }

        .accountPassportID {
            label {
                font-size: 1.1em;
                font-weight: 300;
                color: rgba(0, 0, 0, 0.35);
            }

            #passportID {
                font-size: 1.4em;
                font-weight: 500;
            }
        }
    }
}
</style>
