<template>
    <div class="dashboard">
        <section class="dashboard__headline">
            <h1 class="dashboard__title"> {{ title }}</h1>
            <span class="dashboard__line"></span>   <!-- fix line from information -->
            <p class="dashboard__lead">{{ lead }}</p>
        </section>

        <main class="dashboard__main">
            <h2 class="dashboard__storeName">{{ storeName }}</h2>

            <section class="storeInformation">
                <StoreInformation :informationType="'Adresse'" :informationData="address" :imageSource="'/icons/location.svg'" :alterrnativeText="'location icon'" />
                <StoreInformation :informationType="'Åpningstider'" :informationData="openingHours" :imageSource="'/icons/openingHours.svg'" :alterrnativeText="'clock icon'" />
                <StoreInformation :informationType="'Telefon'" :informationData="phone" :imageSource="'/icons/phone.svg'" :alterrnativeText="'phone icon'" />
                <StoreInformation :informationType="'Post i butikk'" :informationData="postInStore" :imageSource="'/icons/post.svg'" :alterrnativeText="'post icon'" />
            </section>

            <div class="map" id="map"></div> <!-- shows map --> 
            <span class="map__text">Klikk og dra for å gå rundt på kartet, og zoom inn/ut</span>
        </main>
    </div>
</template>

<script>
    import mapboxgl from 'mapbox-gl';
    import StoreInformation from '../components/StoreInformation.vue';

    export default {
        data() {
            return {
                title: 'Rema1000 oversikt',
                lead: 'Her kan du finne alle Rema1000 butikker i Norge, samt adresse, dagens åpningstid og nummer. Klikk eller pek på en plasseringstag for å se informasjon',
                storeName: '',
                address: '',
                openingHours: '',
                websiteLink: '',
                phone: '',
                postInStore: '',
                storeData: [],
                storeFeatures: [],
                error: ''
            }
        },

        async created() {
            this.pageSetup();
        },

        components: {
            StoreInformation
        },

        computed: {
            getCurrentDay() {
                let day = 0;
                switch(new Date().getDay()){
                    case 0: {
                        return day = 0;
                    }
                    case 1: {
                        return day = 1;
                    }
                    case 2: {
                        return day = 2;
                    }
                    case 3: {
                        return day = 3;
                    }
                    case 4: {
                        return day = 4;
                    } 
                    case 5: {
                        return day = 5;
                    }
                    case 6: {
                        return day = 6;
                    }
                }
            }
        },

        methods: {
            async pageSetup() {
                const urlWithProxy = `https://api.allorigins.win/get?url=${encodeURIComponent('https://rema.no/api/v2/stores')}`;   // using proxy to get pass CORS without authentication source: https://github.com/gnuns/allorigins  
                const options = {
                    'Access-Control-Allow-Origin': '*'
                };
                const response = await fetch(urlWithProxy, options);

                try {
                    await this.responseHandeling(response);
                } catch(error) {
                    this.error = error.message;
                }

                this.createJsonObjects();
                this.displayMap();
            },

            async responseHandeling(response){
                if (response.ok) {
                    const { contents } = await response.json();  // recieves all API data as a string
                    const contentsAsObject = JSON.parse(contents)   // parse string to object to access array with store data
                    this.storeData = contentsAsObject.results  // save store data from api in array
                } else {
                    if (response.status === 404) {
                        throw new Error("Can't find url")
                    } else if (response.status === 500) {
                        throw new Error("Server error")
                    } else {
                        throw new Error("something went wrong");
                    }
                }
            },

            displayMap() {      
                // obs, don't hardcode mapbox key, but netlify couldn't find key. as 'import.meta.env.VITE_MAPBOX_TOKEN' 
                mapboxgl.accessToken = "pk.eyJ1IjoibHN0dWJkYWwiLCJhIjoiY2wwZ2ZpYmszMTJoMTNibnkxdGN5aHZwbCJ9.ykXNg8DZ6siiQwiqHZg6ng";   // access token
                
                const map = new mapboxgl.Map({  
                    container: 'map', // container ID
                    style: 'mapbox://styles/mapbox/streets-v11',
                    center:  [11.9413731, 65.1928539], // starting position [lng, lat] 
                    zoom: 4 
                });
                // source: https://docs.mapbox.com/mapbox-gl-js/example/simple-map/

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
                // store-json iterate in feature array with json ojects created */
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
                this.openingHours = Object.values(store.properties.openingHours)[this.getCurrentDay];
                this.phone = store.properties.phone;
                this.websiteLink = store.properties.website;
                this.postInStore = store.properties.postInStore === 'false' ? 'Nei' : 'Ja';

                window.scrollTo(0,0); // scroll to top for user to se store data 
            },

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

    @media screen and (max-width: 950px) {
        .dashboard__title {
            font-size: 2.2em;
        }

        .dashboard__line {
            width: 600px
        }

        .dashboard__lead {
            font-size: 1.3em;
        }

        .storeInformation__details {
            padding: var(--padding-medium);
        }

        .storeInformation__detail {
            font-size: 1.2em;
        }

        .storeInformation__text {
            font-size: 1.5em;
        }

        .dashboard__storeName {
            font-size: 1.7em;
        }
    }

    @media screen and (max-width: 750px) {
        .dashboard__line {
            width: 400px;
        }

        .dashboard__lead, .storeInformation__text, .storeInformation__detail {
            font-size: 1.1em;
        }

        .dashboard__storeName {
            font-size: 1.4em;
        }

        .storeInformation__details {
            padding: var(--padding-small);
        }

        .map__text {
            font-size: 1em;
        }
        
    }
</style>
