<template>
    <div class="informationCard">
        <img @click="displayInformation" src="/icons/information.svg" alt="information icon" class="informationCard__icon">
        
        <section v-if="clicked" class="informationCard__content">
            <img src="/icons/close.svg" alt="close icon" class="informationCard__close" @click="displayInformation">
            <h2 class="informationCard__title">HVA GJØR DENNE NETTSIDEN?</h2>
            <p class="informationCard__paragraph">Denne nettsiden  viser deg alle 660 Rema1000 butikker i hele Norge. </p>
            <p class="informationCard__paragraph">Ved å trykke/hovre over en stedstag vil informasjon om åpningstid, adresse og mail for mulighet til å kontakte butikken,  vises opp i et lite vindu (hover) og øverst på siden (klikk på tag)</p>
            <p class="informationCard__paragraph">Nettsiden bruker data fra <a href="https://apiportal.rema.no/" class="informationCard__paragraph--link">Rema1000 sitt API</a></p>
        </section>
    </div>
</template>

<script>
export default {
    data() {
        return {
            clicked: false
        }
    },

    methods: {
        displayInformation() {
            this.clicked = !this.clicked;
        },
    }
}
</script>

<style>
    .informationCard__icon {
        cursor: pointer;
    }

    .informationCard__title {
        color: var(--light);
        font-size: 2.2em;
        padding-bottom: var(--padding-medium);
    }

    .informationCard__content {
        position: absolute;
        top: -10;
        left: 0;
        width: 100vw;
        height: 75vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: var(--main-color);
    }

    .informationCard__close {
        position: absolute;
        top: 20;
        right: 20;
        padding: var(--medium);
        cursor: pointer;
    }

    .informationCard__paragraph {
        width: 70%;
        font-size: 1.8em;
        font-weight: 200;
        text-decoration: none;
        padding: 1%;
        color: var(--light);
    }

    .informationCard__paragraph--link {
        color: var(--second-color);
        text-decoration: underline 1px solid;
    }

    .informationCard__paragraph--link:hover {
        color: var(--light);
    }

</style>