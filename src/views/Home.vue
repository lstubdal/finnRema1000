<template>
    <div class="dashboard">
        <div class="dashboard__headline">
            <h1 class="dashboard__title"> {{ title }}</h1>
            <span class="dashboard__line"></span>   <!-- fix line from information -->
            <p class="dashboard__lead">{{ lead }}</p>
        </div>

        <main class="dashboard__main">
            <h2 class="dashboard__storeName">{{ storeName }}</h2>

            <section class="storeInformation">
                <div class="storeInformation__details"> 
                    <img src="/icons/location.svg" alt="location icon">
                    <span class="storeInformation__detail">Adresse:</span> 
                    <p class="storeInformation__text">{{ address }}</p>
                </div>

                <div class="storeInformation__details">  
                    <img src="/icons/openingHours.svg" alt="openingHours icon">
                    <span class="storeInformation__detail">Åpnignstider:</span>  
                    <p class="storeInformation__text">{{ openingHours }}</p>
                </div>

                <div class="storeInformation__details"> 
                    <img src="/icons/phone.svg" alt="phone icon">
                    <span class="storeInformation__detail">Phone:</span> 
                    <p class="storeInformation__text">{{ phone }}</p>
                </div>

                <div class="storeInformation__details"> 
                    <img src="/icons/post.svg" alt="post icon">
                    <span class="storeInformation__detail">Post in store:</span> 
                    <p class="storeInformation__text">{{ postInStore }}</p>
                </div>
            </section>

            <div class="map" id="map"></div> <!-- shows map --> 
            <span class="map__text">Klikk og dra for å gå rundt på kartet, og zoom inn/ut</span>
        </main>

        <Footer />
    </div>
</template>

<script>
    import mapboxgl from 'mapbox-gl';

    export default {
        data() {
            return {
                title: 'Rema1000 oversikt',
                lead: 'Her kan du finne alle Rema1000 butikker i Norge, samt adresse, dagens åpningstid og nummer. Klikk eller pek på en plasseringstag for å se informasjon',
                mapbox_token: import.meta.env.VITE_MAPBOX_TOKEN,  // get token hidden token from .env.dev.
                storeName: '',
                address: '',
                openingHours: '',
                websiteLink: '',
                phone: '',
                postInStore: '',
                storeData: [],
                storeFeatures: []
            }
        },

        created() {
            this.pageSetup();
        },

        computed: {
            getCurrentDay() {
                let day = ''
                switch(new Date().getDay()){
                    case 0: {
                        return day = 'sunday';
                    }
                    case 1: {
                        return day = 'monday';
                    }
                    case 2: {
                        return day = 'tuesday';
                    }
                    case 3: {
                        return day = 'wednesday';
                    }
                    case 4: {
                        return day = 'thursday';
                    } 
                    case 5: {
                        return day = 'friday';
                    }
                    case 6: {
                        return day = 'saturday';
                    }
                }
            }
        },

        methods: {
            async pageSetup() {
                const urlWithProxy = `https://api.allorigins.win/get?url=${encodeURIComponent('https://rema.no/api/v2/stores')}`;   // using proxy to get pass CORS without authentication source: https://github.com/gnuns/allorigins  
                const response = await fetch(urlWithProxy);
                const { contents} = await response.json();  // recieves all API data as a string

                const contentsAsObject = JSON.parse(contents)   // parse string to object to access array with store data
                this.storeData = contentsAsObject.results  // save store data from api in array

                this.getTodaysOpeningHour();

                this.createJsonObjects();
                this.displayMap();
            },

            displayMap() {  
                // source: https://docs.mapbox.com/mapbox-gl-js/example/simple-map/ 
                mapboxgl.accessToken = this.mapbox_token;   // access token
                const map = new mapboxgl.Map({  
                    container: 'map', // container ID
                    style: 'mapbox://styles/mapbox/streets-v11',
                    center:  [11.9413731, 65.1928539], // starting position [lng, lat] 
                    zoom: 4 
                });

                this.createMarker(map);
                this.addZoomButtons(map); 
                this.addUserLocation(map) // for user to see their location next to stores
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
                            'website': store.detailUrl,
                            'phone': store.phone,
                            'postInStore': store.postInStore,
                            'iconSize': [24, 30]
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
                    marker.className = 'map__marker';
                    marker.style.backgroundImage = 'url(./icons/locationTag.svg)'
                    marker.style.width = `${width}px`; 
                    marker.style.height = `${height}px`;
                    marker.style.backgroundSize = '100%';

                    // update storedata when marker clicked
                    marker.addEventListener('click', () => {
                        this.onClickUpdateInfo(store);            
                    });

                    /* show storedata card when marker hovered -
                     source: https://docs.mapbox.com/mapbox-gl-js/example/popup/ */
                    marker.addEventListener('mouseenter', () => {
                        
                        const popup = new mapboxgl.Popup({ closeOnClick: false })
                            .setLngLat(store.geometry.coordinates)
                            .setHTML(   `<h1>${store.properties.name}</h1>`) 
                            .addTo(map);    
                    });

                    // Add markers to the map.
                    new mapboxgl.Marker(marker)
                        .setLngLat(store.geometry.coordinates)
                        .addTo(map);
                })
                // soruce: https://docs.mapbox.com/mapbox-gl-js/example/custom-marker-icons/ 
            },

            onClickUpdateInfo(store) {
                this.storeName = store.properties.name;
                this.address = store.properties.address;
                this.openingHours = store.properties.openingHours;  
                this.phone = store.properties.phone;
                this.websiteLink = store.properties.website;
                this.postInStore = store.properties.postInStore === 'false' ? 'Nei' : 'Ja';

                window.scrollTo(0,0); // scroll to top for user to se store data
            },

            getTodaysOpeningHour(){
               
            },

            // how to use function properly?
           /*  getTodaysOpeningHour() {
                Object.values(this.storeData).forEach( store => {
                    const getDay = Object.entries(store.openingHours) // convert openingHours object to array with arrays of days with openinghours to access them
                
                    let indexDay = 0
                    while (indexDay < getDay.length) {
                        if (getDay[indexDay][0] === this.getCurrentDay){
                                return this.openingHours = getDay[indexDay][1];
                        }
                        indexDay++; 
                    }
                }) 
            }, */

            addZoomButtons(map) {
                map.addControl(new mapboxgl.NavigationControl());
            },

            addUserLocation(map) {
                // source: https://docs.mapbox.com/mapbox-gl-js/example/locate-user/
                map.addControl(
                    new mapboxgl.GeolocateControl({
                    positionOptions: {
                    enableHighAccuracy: true,
                },
                trackUserLocation: true,
                showUserHeading: true   // show arrow for users direction
                })
                );
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
        font-weight: 200;
    }

    .dashboard__line {
        width: 780px;
        border: 0.1px solid var(--dark);
        margin: var(--margin-medium);
        opacity: 35%;
    }

    .dashboard__lead {
        text-align: center;
        font-size: 1.7em;
        font-weight: 250;
        padding: 1% 25%;
    }

    .dashboard__main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: var(--margin-medium);
    }

    .dashboard__storeName {
        font-size: 2.2em;
        color: var(--main-color);
        padding: var(--small);
    }

    .storeInformation {
        display: flex;
    }

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

    .map {
        border-radius: var(--map-corners);
        height: 100vh;
        width: 80vw;
        margin-bottom: var(--margin-large);
    }

    .map__marker {
        display: block;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        padding: 0;
    }

    .map__text {
        font-size: 1.2em;
        color: var(--main-color);
        margin-top: -3%;
    }
</style>
