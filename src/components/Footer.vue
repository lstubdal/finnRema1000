<template>
  <footer class="footer">
      <Logo />
      
      <p>Oversikt over alle Rema1000 i Norge</p>
      <a href="https://www.rema.no/" class="footer__link">Gå til hovednettside &#8599;</a>
  </footer>
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
        padding: var(--padding-medium);
        color: var(--second-color);
        background-color: var(--dark);
        font-family: var(--main-font);
        font-size: 1.2em;
    }

    .footer__link {
       color: var(--second-color);
       text-decoration: none;
    }

    .footer__link:hover {
        color: var(--light);
        text-decoration: underline 1px solid var(--light);
    }

     @media screen and (max-width: 650px) {
        .footer {
            font-size: 1em;
        }
    }

</style>