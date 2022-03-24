<template>
    <div class="informationCard">
        <img @click="displayInformation" src="/icons/information.svg" alt="information icon" class="informationCard__icon">
        
        <section v-if="clicked" class="informationCard__content">
            <img src="/icons/close.svg" alt="close icon" class="informationCard__close" @click="displayInformation">
            <h2 class="informationCard__title">WHAT DOES THIS WEBSITE DO?</h2>
            <p class="informationCard__paragraph">Search for any place/location to get information about the sunrise, sunset and moonrise for the given place. </p>
            <p class="informationCard__paragraph">Note that some days may lack sunrise/sunset, this indicates that either polar night or polar day is in effect, and some days may lack moonrise, and will show 'no moon' </p>
            <p class="informationCard__paragraph">This website uses information from Meterologisk institution in Norway.</p>
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

        async test() {
            
        }
    }
}
</script>

<style>
    .informationCard__icon {
        cursor: pointer;
    }

    .informationCard__title {
        color: var(--light);
        font-size: 2em;
        padding-bottom: var(--padding-small);
    }

    .informationCard__content {
        position: absolute;
        top: -20;
        left: 0;
        width: 100vw;
        height: 65vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: var(--main-color);
    }

    .informationCard__close {
        position: absolute;
        top: 30;
        right: 35;
        cursor: pointer;
    }

    .informationCard__paragraph {
        width: 60%;
        font-size: 1.5em;
        font-weight: 300;
        text-decoration: none;
        padding: 1%;
        color: var(--light);
    }

</style>