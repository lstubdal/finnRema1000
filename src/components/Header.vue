<template>
    <header class="header">
        <Logo />
        <InformationCard />
    </header>
</template>

<script>
    import Logo from '../components/Logo.vue';
    import InformationCard from '../components/InformationCard.vue';

    export default {
        components: {
            Logo,
            InformationCard,
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