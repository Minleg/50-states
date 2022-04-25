let express = require('express')
let States = require('../models').States

let router = express.Router()

// fetch all of the states
router.get('/states', function(req, res, next){ // finds all of the states defined in db, order by name
    States.findAll({ order: ['name']}).then ( states => {
        return res.json(states) // each row of states read is converted into javaScript object and send it back as response to the client
    })
    .catch( err => next(err))
})

// get all information about one state, /state/Iowa or /state/Wisconsin
router.get('/state/:name', function(req, res, name) {
    let stateName = req.params.name
    States.findOne( {where: {name: stateName}})
        .then( state => {
            if(state){
                return res.json(state)
            } else {
                return res.status(404).send('State not found')
            }
        })
        .catch( err => next(err) )

})

// API route to get all the visited states
router.get('/visitedstates',function(req, res, next){
    States.findAll({ where: { visited: true} }).then ( states => { // finds all the states where visited is true
        console.log(states.name)
        return res.json(states)
    })
    .catch( err => next(err))
})

// patch route to update a state - whether visited or not

router.patch('/states/:name', function(req, res, next) {
    let stateName = req.params.name
    let stateVisited = req.body.visited  // true or false

    States.update( { visited: stateVisited }, { where: {name: stateName }})
        .then( rowsUpdated => {
            let numberOfRowsUpdated = rowsUpdated[0]
            if (numberOfRowsUpdated == 1) { // if state is in the db
                return res.send('ok')
            }
            return res.status(404).send('State not found') // if not in db
        })
        .catch( err => next(err)) // any other issue would be handled by general error handler to return 500 status code

})

module.exports = router // anything that imports this states.js will be able to access the router with the get route /states