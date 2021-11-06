const app = require( "express" )();
const server = require( "http" ).Server( app );
const bodyParser = require( "body-parser" );
const Datastore = require( "nedb" );
const async = require( "async" );
const fileUpload = require('express-fileupload');
const multer = require("multer");
const fs = require('fs');


const storage = multer.diskStorage({
    destination: process.env.APPDATA+'/POS/uploads',
    filename: function(req, file, callback){
        callback(null, Date.now() + '.jpg'); // 
    }
});


let upload = multer({storage: storage});

app.use(bodyParser.json());


module.exports = app;

 
let inventoryDB = new Datastore( {
    filename: process.env.APPDATA+"/POS/server/databases/inventory.db",
    autoload: true
} );


inventoryDB.ensureIndex({ fieldName: '_id', unique: true });

 
app.get( "/", function ( req, res ) {
    res.send( "Inventory API" );
} );


 
app.get( "/product/:productId", function ( req, res ) {
    if ( !req.params.productId ) {
        res.status( 500 ).send( "ID field is required." );
    } else {
        inventoryDB.findOne( {
            _id: parseInt(req.params.productId)
        }, function ( err, product ) {
            res.send( product );
        } );
    }
} );


 
app.get( "/products", function ( req, res ) {
    inventoryDB.find( {}, function ( err, docs ) {
        res.send( docs );
    } );
} );


 
app.post( "/product", upload.single('imagename'), function ( req, res ) {

    let image = '';
    console.log("req: ")
    console.log(req.file.originalname)

    if(req.body.img != "") {
        image = req.body.img;     
        console.log("image: ")
        console.log(image)   
    }

    if(req.file) {
        image = req.file.originalname;  
        //console.log("filename: ")
        //console.log(image)
    }
 

    if(req.body.remove == 1) {
        const path = './resources/app/public/uploads/product_image/'+ req.file.originalname;
        try {
          fs.unlinkSync(path)
        } catch(err) {
          console.error(err)
        }

        if(!req.file) {
            image = '';
        }
    }
    
    let Product = {
        _id: parseInt(req.body.id),
        name: req.body.name,
        code: req.body.code,
        category: req.body.category,
        supplier: req.body.supplier,
        cost: req.body.cost,
        price: req.body.price,
        taxes: req.body.taxes,
        quantity: req.body.quantity == "" ? 0 : req.body.quantity,
        ordered: req.body.ordered == "" ? 0 : req.body.ordered,
        minimum_inventory: req.body.minimum_inventory,
        stock_visibility: req.body.stock == "on" ? 0 : 1,    
        img: image        
    }

    if(req.body.id == "") { 
        Product._id = Math.floor(Date.now() / 1000);
        inventoryDB.insert( Product, function ( err, product ) {
            if ( err ) res.status( 500 ).send( err );
            else res.send( product );
        });
    }
    else { 
        inventoryDB.update( {
            _id: parseInt(req.body.id)
        }, Product, {}, function (
            err,
            numReplaced,
            product
        ) {
            if ( err ) res.status( 500 ).send( err );
            else res.sendStatus( 200 );
        } );

    }

});



 
app.delete( "/product/:productId", function ( req, res ) {
    inventoryDB.remove( {
        _id: parseInt(req.params.productId)
    }, function ( err, numRemoved ) {
        if ( err ) res.status( 500 ).send( err );
        else res.sendStatus( 200 );
    } );
} );

 

app.post( "/product/sku", function ( req, res ) {
    var request = req.body;
    inventoryDB.findOne( {
            _id: parseInt(request.skuCode)
    }, function ( err, product ) {
         res.send( product );
    } );
} );

 


app.decrementInventory = function ( products ) {

    async.eachSeries( products, function ( transactionProduct, callback ) {
        inventoryDB.findOne( {
            _id: parseInt(transactionProduct.id)
        }, function (
            err,
            product
        ) {
    
            if ( !product || !product.quantity ) {
                callback();
            } else {
                let updatedQuantity =
                    parseInt( product.quantity) -
                    parseInt( transactionProduct.quantity );

                inventoryDB.update( {
                        _id: parseInt(product._id)
                    }, {
                        $set: {
                            quantity: updatedQuantity
                        }
                    }, {},
                    callback
                );
            }
        } );
    } );
};