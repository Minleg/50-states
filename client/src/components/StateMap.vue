<template>
<div class="state-map">
    <h2> The state of {{ state.name }} </h2>

    <p v-if="state.visited">You have visited this state</p>
    <p v-else>You have not visited this state</p>

    <!--to do map here-->

    <div id="map-container" v-if="dataReady">
        <l-map ref="map" v-on:ready="onMapReady" v-bind:center="mapCenter" v-bind:zoom="state.zoom">
            <l-tile-layer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors">
            </l-tile-layer>
        </l-map>
    </div>
</div>
</template>

<script>

import { LMap, LTileLayer } from '@vue-leaflet/vue-leaflet'

export default {
    name: 'StateMap',
    components: { LMap, LTileLayer },
    data() {
        return {
            state: {},
            dataReady: false, // when the API call completes , we set dataReady to true
            mapReady: false // when the map loads, we set mapReady to true
        }
    },
    mounted() {
        this.state.name = this.$route.params.state // this is the route for the state in index.js
        this.fetchStateData()
    },
    methods: {
        fetchStateData(){
            this.$stateService.getOneState(this.state.name).then( state => {
                this.state = state // stata data overwritten with state info from the API
                this.dataReady = true // API call completes
            }).catch( err => {
                // 404 not found
                if ( err.response && err.response.status == 404 ){
                    this.state.name = '?' // better way to communicate to user
                } else {
                    // 500 server error
                    alert('Sorry, error fetching data for this state')
                    console.error(err)  // for the developer
                }
            })
        },
        
        onMapReady(){
            this.mapReady = true
        },

        setMapView() {
            if (this.mapReady && this.dataReady) {
                //todo - make sure map shows correct part of the world and zoom level
                this.$refs.map.leafletObject.setView(this.mapCenter, this.zoom)

            }
        }
    },
    computed: {
        mapCenter() {
            return [this.state.lat, this.state.lon ]
        }
    }
}
</script>

<style scoped>

#map-container{
    height: 30rem;
}
</style>
