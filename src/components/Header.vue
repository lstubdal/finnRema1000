<template>
    <header class="header">
        <Logo />

        <div class="header__information">
            <img @click="displayInformation" src="/icons/information.svg" alt="information icon" class="header__information__icon">
            
            <section v-if="clicked" class="header__information-content">
                <img src="/icons/close.svg" alt="close icon" class="header__information-close" @click="displayInformation">
                <h2 class="header__information-title">HVA GJØR DENNE NETTSIDEN?</h2>
                <p class="header__information-paragraph">Denne nettsiden  viser deg alle 661 Rema1000 butikker i hele Norge! </p>
                <p class="header__information-paragraph">Ved å trykke/hovre over en stedstag vil informasjon om åpningstid, adresse og mail for mulighet til å kontakte butikken,  vises opp i et lite vindu (hover) og øverst på siden (klikk på tag)</p>
                <p class="header__information-paragraph">Nettsiden bruker data fra <a href="https://apiportal.rema.no/" class="informationCard__paragraph--link">Rema1000 sitt API</a></p>
            </section>
        </div>
    </header>
</template>

<script>
    import Logo from '../components/Logo.vue';

    export default {
        data() {
            return {
                clicked: false
            }
        },

        components: {
            Logo,
        },
        
        methods: {
            displayInformation() {
                this.clicked = !this.clicked;
            }
        }

    }
</script>

<style>
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: fixed;
        width: 100vw;
        font-family: var(--main-font);
        padding: var(--padding-small);
    }

    .header__information-icon {
        cursor: pointer;
    }

    .header__information-title {
        color: var(--light);
        font-size: 2.2em;
        padding-bottom: var(--padding-medium);
    }

    .header__information-content {
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

    .header__information-close {
        position: absolute;
        top: 20;
        right: 20;
        padding: var(--medium);
        cursor: pointer;
    }

    .header__information-paragraph {
        width: 70%;
        font-size: 1.8em;
        font-weight: 200;
        text-decoration: none;
        padding: 1%;
        color: var(--light);
    }

    .header__information-paragraph--link {
        color: var(--second-color);
        text-decoration: underline 1px solid;
    }

    .header__information-paragraph--link:hover {
        color: var(--light);
    }

</style>