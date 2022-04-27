<template>
<div>
    <h2> States you have visited: </h2>
    <p v-for="state in visitedStates" v-bind:key="state.name"> {{ state.name}} </p>

    
</div>   
</template>

<script>

export default {
    name: 'StatesVisited',
    data(){
        return {
            visitedStates: []
        }
    },
    mounted() {
        this.stateVisited()
    },
    methods: {
        stateVisited() {
            this.$stateService.getVisitedStates().then( states => {
                this.visitedStates = states
                this.visitedStates.sort()
            })
            .catch(err => {
                alert('Can\'t fetch visited states')
                console.error(err)
            } )
        }
    }
}
</script>

<style scoped>

</style>
