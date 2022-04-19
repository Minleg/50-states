// this will make request to the API
import axios from 'axios'
import { response } from 'express'

export default { // exporting methods that rest of our code will use
    getAllStates() {
        return axios.get('/api/states').then( response => {
            return response.data
        })
    },
    setVisited(stateName, visited) {
        
        let requestData = { visited: visited }
        // api/state/Wisconsin
        return axios.patch('/api/states' + stateName, requestData ).then( response => {
            return response.data
        })
    }

}