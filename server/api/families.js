const app = require( "express" )();
const server = require( "http" ).Server( app );
const bodyParser = require( "body-parser" );
const Datastore = require( "nedb" );
const async = require( "async" );


app.use( bodyParser.json() );

module.exports = app;

 
let familyDB = new Datastore( {
    filename: process.env.APPDATA+"/POS/server/databases/families.db",
    autoload: true
} );


familyDB.ensureIndex({ fieldName: '_id', unique: true });
app.get( "/", function ( req, res ) {
    res.send( "Family API" );
} );


  
app.get( "/all", function ( req, res ) {
    familyDB.find( {}, function ( err, docs ) {
        res.send( docs );
    } );
} );

 
app.post( "/family", function ( req, res ) {
    let newFamily = req.body;
    newFamily._id = Math.floor(Date.now() / 1000); 
    familyDB.insert( newFamily, function ( err, family) {
        if ( err ) res.status( 500 ).send( err );
        else res.sendStatus( 200 );
    } );
} );



app.delete( "/family/:familyId", function ( req, res ) {
    familyDB.remove( {
        _id: parseInt(req.params.familyId)
    }, function ( err, numRemoved ) {
        if ( err ) res.status( 500 ).send( err );
        else res.sendStatus( 200 );
    } );
} );

 

 
app.put( "/family", function ( req, res ) {
    familyDB.update( {
        _id: parseInt(req.body.id)
    }, req.body, {}, function (
        err,
        numReplaced,
        family
    ) {
        if ( err ) res.status( 500 ).send( err );
        else res.sendStatus( 200 );
    } );
});



 