
module.exports = (config) =>{

    const MongoClient = require('mongodb').MongoClient;

   
    var db;
    var mongo = {
        
        connectToDb: (callback) => {

            MongoClient.connect('mongodb://sa:password123@ds121171.mlab.com:21171/testmongo', (err, database) => {
                if (err) {
                    console.log(err);
                    callback(false);
                }
                db = database
                callback(true);
            });

        },
        addDataToCollection: (params, cb) =>{
            
            db.collection(params.collectionName).save(params.data, (err, result) => {
                if (err) {
                    console.log(err)
                    cb(true);
                }
                console.log('saved to database')
                cb(undefined,true);
                
            })

        },
        findfromCollections: (params, cb) => {
            var collectionName = params.collectionName;

            db.collection(collectionName).find().toArray((err, result) => {
                if (err) {
                    console.log(err)
                    cb(true);
                }
                console.log('saved to database')
                cb(undefined, { result: result });
                
            })
        }

    }
    return mongo;
}