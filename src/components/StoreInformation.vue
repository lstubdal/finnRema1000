<template>
    <div class="storeInformation__details"> 
        <img :src="imageSource" :alt="alterrnativeText">
        <span class="storeInformation__detail">{{ informationType }}</span> 
        <p class="storeInformation__text">{{ informationData }}</p>
    </div>
</template>

<script>
    export default {
        props: {
            informationType: {
                type: String
            },

            informationData: {
                type: String
            },

            imageSource: {
                type: String
            },



            alterrnativeText: {
                type: String
            }
        }

    }
</script>

<style>
    .storeInformation__details {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: var(--padding-large);
    }

    .storeInformation__detail {
        font-size: 1.5em;
        font-weight: 200;
        padding: var(--padding-small);
    }

    .storeInformation__text {
        font-size: 1.8em;
        color: var(--main-color);
    }
</style>