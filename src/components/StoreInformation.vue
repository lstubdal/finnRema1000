<template>
    <div class="storeInformation__details"> 
        <img :src="imageSource" :alt="alterrnativeText">
        <span class="storeInformation__detail">Adresse:</span> 
        <p class="storeInformation__text">{{ type }}</p>
    </div>
</template>

<script>
    export default {
        props: {
            type: {
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

</style>