const app = require( "express" )();
const server = require( "http" ).Server( app );
const bodyParser = require( "body-parser" );
const Datastore = require( "nedb" );
const async = require( "async" );


app.use( bodyParser.json() );

module.exports = app;

 
let supplierDB = new Datastore( {
    filename: process.env.APPDATA+"/POS/server/databases/suppliers.db",
    autoload: true
} );


supplierDB.ensureIndex({ fieldName: '_id', unique: true });
app.get( "/", function ( req, res ) {
    res.send( "Supplier API" );
} );


  
app.get( "/all", function ( req, res ) {
    supplierDB.find( {}, function ( err, docs ) {
        res.send( docs );
    } );
} );

 
app.post( "/supplier", function ( req, res ) {
    let newSupplier = req.body;
    newSupplier._id = Math.floor(Date.now() / 1000); 
    supplierDB.insert( newSupplier, function ( err, supplier) {
        if ( err ) res.status( 500 ).send( err );
        else res.sendStatus( 200 );
    } );
} );



app.delete( "/supplier/:supplierId", function ( req, res ) {
    supplierDB.remove( {
        _id: parseInt(req.params.supplierId)
    }, function ( err, numRemoved ) {
        if ( err ) res.status( 500 ).send( err );
        else res.sendStatus( 200 );
    } );
} );

 

 
app.put( "/supplier", function ( req, res ) {
    supplierDB.update( {
        _id: parseInt(req.body.id)
    }, req.body, {}, function (
        err,
        numReplaced,
        supplier
    ) {
        if ( err ) res.status( 500 ).send( err );
        else res.sendStatus( 200 );
    } );
});



 