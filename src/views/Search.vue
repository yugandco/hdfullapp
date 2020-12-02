<template>
<div class="Search">
    <div class="container">
        <div class="searchInputs">
            <form action="/search" methods='post'>
                <select name="from" id="from" class="form-select">
                    <option value="">Нур-Султан</option>
                </select>
                <button class='btn'>
                    <i class="material-icons">swap_horiz</i>
                </button>
                <select name="to" id="to" class='form-select'>
                    <option value="">Алматы</option>
                </select>
            </form>
        </div>
        <div class="searchOutputs">
            <div class="searchTitleText">
                <div class="searchTitle">Найдено</div>
                <div class="searchResultFounds">40 попутчиков</div>
            </div>
            <div class="searchFounds">
                <div class="resultCard">
                    <div class="cardLeft">
                        <div class="cardLeftImage">
                        </div>
                        <div class="cardLeftRanking">
                            <span class="material-icons">star_rate</span>
                            <span class="material-icons">star_rate</span>
                            <span class="material-icons">star_rate</span>
                            <span class="material-icons">star_rate</span>
                            <span class="material-icons">star_rate</span>
                        </div>
                    </div>
                    <div class="cardCenter">
                        <div class="cardCenterUsername">
                            <span>Ашуров Азамат</span>
                        </div>
                        <div class="cardCenterText">
                            <span>Документы, коробки, груз до 5кг</span>
                            <span>Время: 22:00, 15 августа</span>
                            <span>Цена: 3000 тг.</span>
                        </div>
                    </div>
                    <div class="cardRight">
                        <div class="cardRightTransportIcon">
                            <i class="material-icons">airplanemode_active</i>
                        </div>
                    </div>
                </div>
                <div class="resultCard">
                    <div class="cardLeft">
                        <div class="cardLeftImage">
                        </div>
                        <div class="cardLeftRanking">
                            <span class="material-icons">star_rate</span>
                            <span class="material-icons">star_rate</span>
                            <span class="material-icons">star_rate</span>
                            <span class="material-icons">star_rate</span>
                            <span class="material-icons">star_rate</span>
                        </div>
                    </div>
                    <div class="cardCenter">
                        <div class="cardCenterUsername">
                            <span>К. Алишер</span>
                        </div>
                        <div class="cardCenterText">
                            <span>Документы, коробки, груз до 5кг</span>
                            <span>Время: 22:00, 15 августа</span>
                            <span>Цена: 3000 тг.</span>
                        </div>
                    </div>
                    <div class="cardRight">
                        <div class="cardRightTransportIcon">
                            <i class="material-icons">airplanemode_active</i>
                        </div>
                    </div>
                </div>
                <div class="resultCard">
                    <div class="cardLeft">
                        <div class="cardLeftImage">
                        </div>
                        <div class="cardLeftRanking">
                            <span class="material-icons">star_rate</span>
                            <span class="material-icons">star_rate</span>
                            <span class="material-icons">star_rate</span>
                            <span class="material-icons">star_rate</span>
                            <span class="material-icons">star_rate</span>
                        </div>
                    </div>
                    <div class="cardCenter">
                        <div class="cardCenterUsername">
                            <span>Ашуров Азамат</span>
                        </div>
                        <div class="cardCenterText">
                            <span>Документы, коробки, груз до 5кг</span>
                            <span>Время: 22:00, 15 августа</span>
                            <span>Цена: 3000 тг.</span>
                        </div>
                    </div>
                    <div class="cardRight">
                        <div class="cardRightTransportIcon">
                            <i class="material-icons">airplanemode_active</i>
                        </div>
                    </div>
                </div>
                <div class="resultCard">
                    <div class="cardLeft">
                        <div class="cardLeftImage">
                        </div>
                        <div class="cardLeftRanking">
                            <span class="material-icons">star_rate</span>
                            <span class="material-icons">star_rate</span>
                            <span class="material-icons">star_rate</span>
                            <span class="material-icons">star_rate</span>
                            <span class="material-icons">star_rate</span>
                        </div>
                    </div>
                    <div class="cardCenter">
                        <div class="cardCenterUsername">
                            <span>Ашуров Азамат</span>
                        </div>
                        <div class="cardCenterText">
                            <span>Документы, коробки, груз до 5кг</span>
                            <span>Время: 22:00, 15 августа</span>
                            <span>Цена: 3000 тг.</span>
                        </div>
                    </div>
                    <div class="cardRight">
                        <div class="cardRightTransportIcon">
                            <i class="material-icons">airplanemode_active</i>
                        </div>
                    </div>
                </div>
                <div class="resultCard">
                    <div class="cardLeft">
                        <div class="cardLeftImage">
                        </div>
                        <div class="cardLeftRanking">
                            <span class="material-icons">star_rate</span>
                            <span class="material-icons">star_rate</span>
                            <span class="material-icons">star_rate</span>
                            <span class="material-icons">star_rate</span>
                            <span class="material-icons">star_rate</span>
                        </div>
                    </div>
                    <div class="cardCenter">
                        <div class="cardCenterUsername">
                            <span>Ашуров Азамат</span>
                        </div>
                        <div class="cardCenterText">
                            <span>Документы, коробки, груз до 5кг</span>
                            <span>Время: 22:00, 15 августа</span>
                            <span>Цена: 3000 тг.</span>
                        </div>
                    </div>
                    <div class="cardRight">
                        <div class="cardRightTransportIcon">
                            <i class="material-icons">airplanemode_active</i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<style lang="scss" scoped>
.searchInputs {
    height: 15vh;
    padding-top: 4vh;

    form {
        display: flex;
        justify-content: space-between;

        select {
            width: 45%;
            height: 7vh;
            font-size: 1.1em;
            font-weight: 500;
            border: 1px solid #FA7800;
        }

        button {
            height: 5.5vh;
            width: 5.5vh;
            position: absolute;
            z-index: 1;
            top: 12.5vh;
            left: 44%;
            border-radius: 50%;
            background-color: #009FFA;
            display: flex;
            justify-content: center;
            align-items: center;
            box-shadow: 0 4px 7px rgba(0, 0, 0, 0.25);

            i {
                font-size: 2em;
                color: #fff;
            }
        }
    }
}

.searchOutputs {
    .searchTitleText {
        .searchTitle {
            font-size: 2rem;
            font-weight: bold;
        }

        .searchResultFounds {
            font-size: 1.1rem;
            font-weight: 700;
            color: rgba(0, 0, 0, 0.4);
        }
    }
}

.searchFounds {
    padding-top: 0vh;
    height: 58.5vh;
    overflow-y: scroll;
    overflow-x: hidden;
}

.resultCard {
    height: 15vh;
    width: 100%;
    background-color: #fff;
    border-radius: 5px;
    display: flex;
    margin-top: 2vh;

    .cardLeft {
        width: 30%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .cardLeftImage {
            height: 8vh;
            width: 8vh;
            border-radius: 50%;
            background-color: #009FFA;
            box-shadow: 0 4px 7px rgba(136, 136, 136, .36);
            margin-bottom: 1.4vh;
        }

        .cardLeftRanking {
            span {
                font-size: 1em;
                color: #FF8B03;
            }
        }
    }

    .cardCenter {
        display: flex;
        flex-direction: column;
        padding-top: 1.5vh;

        .cardCenterUsername {
            font-size: 1.3rem;
            font-weight: 500;
        }

        .cardCenterText {
            display: flex;
            flex-direction: column;

            span {
                font-size: 0.8em;
                color: #969696;
            }

            &>span {
                margin-top: 0.5vh;
            }
        }
    }

    .cardRight {
        display: flex;
        align-items: flex-end;
        position: relative;
        left: 4%;

        .cardRightTransportIcon {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 4vh;
            width: 4vh;
            background-color: #FF8B03;
            color: #fff;
            border-top-left-radius: 5px;
            border-bottom-right-radius: 5px;
        }
    }
}

.resultCard:hover {
    box-shadow: 0 12px 19px rgba(164, 160, 160, .25);
}
</style>
