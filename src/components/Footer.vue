<template>
  <div class="footer">
      <Logo />
      <p>Oversikt over alle Rema1000 i Norge</p>
      <a href="https://www.rema.no/" class="footer__link">Gå hoved nettside</a>
  </div>
</template>

<script>
    import Logo from '../components/Logo.vue';

    export default {
        components: {
            Logo
        }
    }
</script>

<style>
    .footer {
        width: 100%;
        height: 20%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top: 2px solid var(--main-color);
        margin-top: var(--margin-large);
        padding: var(--padding-small);
        color: var(--main-color);
        font-size: 1.2em;
    }

    .footer__link {
       color: var(--main-color)
    }

</style>