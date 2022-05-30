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

</style>