const express=require('express');
const app = express();
const bodyparser = require('body-parser');

var dbReference = require('./modules/dbWrapper')
var dbWrapper = dbReference({});

console.log('sample hI');

app.use(bodyparser.urlencoded({ extended: true }))

app.get('/', function (req, res) {
    //res.send('Hello');
    res.sendFile(__dirname + '/index.html');
});

app.post('/quotes', (req, res) => {
    console.log(req.body);

    var callBack = (err, response) => {
        res.send('done');
    }

    dbWrapper.addDataToCollection({
        collectionName: 'quotes',
        data: req.body
    }, callBack);
});

app.get('/getquotes', (req, res) => {
    console.log(req.body);

    var callBack = (err, response) => {
        res.json(response);
    }

    dbWrapper.findfromCollections({
        collectionName: 'quotes',
        data: req.body
    }, callBack);
})

dbWrapper.connectToDb((connected) => {
    if (connected) {
        app.listen(3000, function () {
            console.log('listening on 3000');
        })
    }
    else {
        console.log('cannot continue without connecting to Db');
    }
}
)

//https://zellwk.com/blog/crud-express-mongodb/