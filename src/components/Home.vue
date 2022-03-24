<template>
    <div class="dashboard">
        <header class="header">
            <RouterLink :to="{name: 'home' }">
                <img src="/icons/logo.svg" alt="rema1000 logo">
            </RouterLink>

            <InformationCard />
        </header>

        <div class="dashboard__headline">
            <h1 class="dashboard__title"> {{ title }}</h1>
            <span class="dashboard__line"></span>
            <p class="dashboard__lead">{{ lead }}</p>
        </div>

        <main class="dashboard__main">
            <section class="storeInformation">
                <div class="storeInformation__detail"> 
                    <img src="/icons/location.svg" alt="location icon">
                    <span class="storeInformation__address">Adresse:</span> 
                    <p class="storeInformation__text">{{ address }}</p>
                </div>

                <div class="storeInformation__detail">  
                    <img src="/icons/clock.svg" alt="clock icon">
                    <span class="storeInformation__openingHours">Åpnignstider:</span>  
                    <p class="storeInformation__text">{{ openingHours }}</p>
                </div>

                <div class="storeInformation__detail"> 
                    <img src="/icons/mail.svg" alt="mail icon">
                    <span class="storeInformation__mail">Mail:</span> 
                    <p class="storeInformation__text">{{ mail }}</p>
                </div>
            </section>

            <section class="map" id="map">map</section> <!-- shows map --> 
        </main>
    </div>
</template>

<script>
    import InformationCard from '../components/InformationCard.vue';

    export default {
        data() {
            return {
                title: 'Rema1000 oversikt',
                lead: 'Her kan du finne alle Rema1000 butikker i Norge, samt adresse, åpningstid og mail',
                address: '',
                openingHours: '',
                mail: ''
            }
        },

        components: {
            InformationCard
        }
    }
</script>

<style>
    .dashboard {
        width: 100vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-family: var(--main-font);
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: fixed;
        width: 100vw;
        padding: var(--padding-small);
    }

    .dashboard__headline {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: var(--margin-xlarge);
    }

    .dashboard__title {
        font-size: 2.7em;
        color: var(--dark);
        font-weight: 150;
    }

    .dashboard__line {
        width: 780px;
        border: 0.1px solid var(--dark);
        margin: var(--margin-medium);
        opacity: 35%;
    }

    .dashboard__lead {
        text-align: center;
        font-size: 1.8em;
        font-weight: 250;
        padding: 1% 20%;
    }

    .dashboard__main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: var(--margin-medium);
    }

    .storeInformation {
        display: flex;
    }

    .storeInformation__detail {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: var(--padding-large);
    }

    .storeInformation__address, .storeInformation__openingHours, .storeInformation__mail {
        font-size: 1.5em;
        font-weight: 200;
        padding: var(--padding-small);
    }


</style>
