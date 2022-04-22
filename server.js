// starts our express server running
let express = require('express')
let states_api = require('./routes/states')
let path = require('path')

let app = express() // creates new web server app

let vueAppPath = path.join(__dirname,'client','dist') // path where your vue app is 
app.use(express.static(vueAppPath)) // requests to the application if no particular path is specified, files in dist will be served (by default it will be index.html file in dist directory that will be served)

app.use(express.json())
// Vue client will send messages to the server in JSON format, this line enables processing and ability for web server to understand 
// requests that have JSON data send with them

// any request to /api will pass to states_api (states.js) where continuing path is defined /api/states etc
app.use('/api',states_api)  // this will make all of the routes in state API available at /api /states or sth else as defined in states.js(routes)

// handle error when trying to connect to resource we haven't defined
app.use(function(req, res, next) { // this will handle every other requests that is not to /api or another specific handlers we have created
    res.status(404).send('Not found')
})

// handle error in case of server error
app.use(function( err, req, res, next) {
    console.log(err)
    res.status(500).send('Server error') 
})

// starting our app running. If app is running at Heroku, it will set the process.env.PORT
let server = app.listen(process.env.PORT || 3000, function() {
    console.log('server running on port', server.address().port)
}) 