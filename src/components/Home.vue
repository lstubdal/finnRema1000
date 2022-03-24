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

            <div class="map" id="map"></div> <!-- shows map --> 
        </main>
    </div>
</template>

<script>
    import InformationCard from '../components/InformationCard.vue';
    import mapboxgl from 'mapbox-gl';

    export default {
        data() {
            return {
                title: 'Rema1000 oversikt',
                lead: 'Her kan du finne alle Rema1000 butikker i Norge, samt adresse, åpningstid og mail',
                mapbox_token: import.meta.env.VITE_MAPBOX_TOKEN,  // get token hidden token from .env.dev.
                address: '',
                openingHours: '',
                mail: '',
                storeData: [],
                storeFeatures: []
            }
        },

        created() {
            this.pageSetup();
        },

        components: {
            InformationCard
        },

        methods: {
            async pageSetup() {
                const urlWithProxy = `https://api.allorigins.win/get?url=${encodeURIComponent('https://rema.no/api/v2/stores')}`;   // using proxy to get pass CORS without authentication source: https://github.com/gnuns/allorigins  
                const response = await fetch(urlWithProxy);
                const { contents} = await response.json();  // recieves all API data as a string

                const contentsAsObject = JSON.parse(contents)   // parse string to object to access array with store data
                this.storeData = contentsAsObject.results  // save store data from api in array

                this.createJsonObjects();
                this.displayMap();
            },

            displayMap() {
                mapboxgl.accessToken = this.mapbox_token;   // access token
                const map = new mapboxgl.Map({
                    container: 'map', // container ID
                    style: 'mapbox://styles/mapbox/streets-v11', // style URL
                    center:  [11.9413731, 65.1928539], // starting position [lng, lat] 
                    zoom: 5 //starting zoom
                });

                this.createMarker(map);
                // source: https://docs.mapbox.com/mapbox-gl-js/example/simple-map/ 
            },

            createJsonObjects() {
                /* Fill empty array with mapped store json-objects to use in createMarker */
                this.storeFeatures = this.storeData.map(store => {
                    return {
                        'type': 'Feature',
                        'properties': {
                            'name': store.name,
                            'address': store.visitAddress,
                            'openingHours': store.openingHours,
                            'nettside': store.detailUrl,
                            'phone': store.phone,
                            'postInStore': store.postInStore,
                            'iconSize': [25, 31]
                            },
                            'geometry': {
                                'type': 'Point',
                                'coordinates': [store.longitude, store.latitude]
                            }
                    }
                })
            },

            createMarker(map) {
                // store-json (aka geojson) iterate in feature array with json ojects created */
                const storeJson = {
                    'type': 'FeaturesCollection',
                    'features': this.storeFeatures
                }

                // create custom marker per store
                storeJson.features.forEach(store => {
                    const marker = document.createElement('div');
                    const width = store.properties.iconSize[0];
                    const height = store.properties.iconSize[1];
                    marker.className = 'marker';
                    marker.style.backgroundImage = 'url(./icons/locationTag.svg)'
                    marker.style.width = `${width}px`; 
                    marker.style.height = `${height}px`;
                    marker.style.backgroundSize = '100%';

                    // show store data based on location of marker 
                    marker.addEventListener('click', () => {    
                        window.alert('KLIKKET');
                    });

                    // Add markers to the map.
                    new mapboxgl.Marker(marker)
                        .setLngLat(store.geometry.coordinates)
                        .addTo(map);
                })
                // soruce: https://docs.mapbox.com/mapbox-gl-js/example/custom-marker-icons/ 
            }
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

    .storeInformation__address, 
    .storeInformation__openingHours, 
    .storeInformation__mail {
        font-size: 1.5em;
        font-weight: 200;
        padding: var(--padding-small);
    }

    #map {
        border-radius: var(--corner-radius);
        height: 100vh;
        width: 80vw;
        margin-bottom: var(--margin-large);

    }

    .marker {
        display: block;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        padding: 0;
    }
</style>
