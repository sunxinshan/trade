var express = require('express')
var path = require('path')
var compression = require('compression')
var pg = require('pg');
var xenditRouter = require('./xendit/xenditRouter')
var boshRouter = require('./bosh/boshRouter')
var tradeRouter = require('./trade/tradeRouter')
const connectionString = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/xendit';

var app = express()
app.use(compression())

// serve our static stuff like index.css
app.use(express.static(path.join(__dirname, '../../build')))

// send all requests to index.html so browserHistory in React Router works
app.get('/index.html', function (req, res) {
    res.sendFile(path.join(__dirname, '../../build','index.html'))
})

app.use('/xendit', xenditRouter)
app.use('/bosh', boshRouter)
app.use('/trade', tradeRouter)


var PORT = process.env.PORT || 8080
app.listen(PORT, function() {
    console.log('Production Express server running at localhost:' + PORT)
    if(process.argv.length > 4) {
        console.log('Database url:' + process.argv[2])
        console.log('Rail:' + process.argv[3])
    }

})