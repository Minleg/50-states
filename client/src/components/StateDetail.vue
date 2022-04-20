<template>

<div class="state-info">
    
    <span class="state-name">{{ state.name }}</span>

    <div>
        <input class="visit-state" type="checkbox" v-model="visited" v-on:change="updateVisited">
    </div>

    <div> 
        <!--This basically figures out what the route should be with the name StateMap(map/:state) and whatever the state name is from the props -->
        <router-link v-bind:to=" {name: 'StateMap', params: {state: state.name} }"><!--name is the name set in index.js, state.name is the state prop-->
            <!-- /map/Iowa or /map/Georgia -->
            <img class="map-icon" src="@/assets/map_icon.png">
        </router-link>
    </div>
</div>
    
</template>

<script>

export default {
    name: 'StateDetail',
    emits: ['update-visited'],
    props: {
        state: Object // dont modify props
    },
    data() {
        return {
            visited: this.state.visited // ok to modify data
        }
    },
    methods: {
        updateVisited() {
            this.$emit('update-visited', this.state.name, this.visited)
        }
    }
}
</script>

<style scoped>

.state-info {
    padding: 1rem;
    height: 8rem;
    width: 10rem;
    border: 1px gainsboro solid;
    border-radius: .3rem;
    background-color: whitesmoke;
}

.visit-state {
    margin: 1rem;
    text-align: center;
}

.map-icon {
    width: 2rem;
    height: 2rem;
}
</style>
