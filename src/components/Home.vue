<template>
   <div class="dashboard">
       <header class="header">
           <RouterLink :to="{name: 'home' }">
                <img src="/icons/logo.svg" alt="rema1000 logo">
           </RouterLink>

           <InformationCard />
       </header>
   </div>
</template>

<script>
    import InformationCard from '../components/InformationCard.vue';

    export default {
        components: {
            InformationCard
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
        padding: var(--padding-small);
    }
</style>
