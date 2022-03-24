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

   </div>
</template>

<script>
    import InformationCard from '../components/InformationCard.vue';

    export default {
        data() {
            return {
                title: 'Rema1000 oversikt',
                lead: 'Her kan du finne alle Rema1000 butikker i Norge, samt adresse, åpningstid og mail'
            }
        },

        components: {
            InformationCard
        }
    }
</script>

<style>
    .dashboard {
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
    }

    .dashboard__title {
        font-size: 2.5em;
        color: var(--dark);
        font-weight: 200;
        padding-top: 5%;
    }

    .dashboard__line {
        width: 780px;
        border: 0.1px solid var(--dark);
        margin: var(--margin-medium);
        opacity: 35%;
    }

    .dashboard__lead {
        text-align: center;
        font-size: 1.5em;
        font-weight: 300;
        padding: 1% 28%;
    }
</style>
