// Includes
var restify = require('restify');
var mongojs = require("mongojs");
var path = require('path');

// -----------------------------------------------------------------------------
// VARIABLES
// -----------------------------------------------------------------------------

// Paths
var informationPath = '/information';
var purchasesPath = '/purchases';
var salesPath = '/sales';
var authorizePath = '/authorize';
var statusPath = '/status';

var debugUsersPath = '/debugusers';
var debugTxnsPath = '/debugtxns';


// Server Address/Port
var addr = process.env.IP;
var addrDB="mongodb://heroku:aV_VFpl7Asrj5x1edZMdqUZT7is1pK-LVG4FkF_Kig91HsregNy80kIcACpeerjdTyOvrsPMU2DHfVXlBAZrNw@kahana.mongohq.com:10030/app26199420";
var port = process.env.PORT;

// -----------------------------------------------------------------------------
// SET UP
// -----------------------------------------------------------------------------

// Mongo Setup
//var databaseUrl = addr + ':27017/openiou';
var databaseUrl = addrDB;
var collections = ["users", "transactions"];
var db = mongojs.connect(databaseUrl, collections);
console.log("Mongo listening at " + databaseUrl);

// REST API
var serverRest = restify.createServer({
    "name":"openiou"
    });
serverRest.listen(process.env.PORT ,addr, function(){
    console.log('%s listening at %s ', serverRest.name , serverRest.url);
});

// RESTify Options
serverRest.use(restify.queryParser());
serverRest.use(restify.bodyParser());
serverRest.use(restify.CORS());

// -----------------------------------------------------------------------------
// Define Endpoints
// -----------------------------------------------------------------------------
serverRest.get({path : '/' , version : '0.0.1'} , base);

// Gets the information on a specific user
serverRest.post({path : informationPath +'/:uid' , version : '0.0.1'} , information);
serverRest.get({path : informationPath +'/:uid' , version : '0.0.1'} , information);

// Gets the purchases a specific user made (payer)
serverRest.post({path : purchasesPath +'/:uid' , version : '0.0.1'} , purchases);
serverRest.get({path : purchasesPath +'/:uid' , version : '0.0.1'} , purchases);

// Gets the sales made to a specific (payee)
serverRest.post({path : salesPath +'/:uid' , version : '0.0.1'} , sales);
serverRest.get({path : salesPath +'/:uid' , version : '0.0.1'} , sales);

// Authorizes a transaction
serverRest.post({path : authorizePath +'/:payer/:payee' , version : '0.0.1'} , authorize);

// Tests if Service is running
serverRest.get({path : statusPath, version : '0.0.1'} , status);

// DEBUGGING
serverRest.get({path : debugUsersPath , version : '0.0.1'} , debugUsers);
serverRest.get({path : debugTxnsPath , version : '0.0.1'} , debugTxns);

// -----------------------------------------------------------------------------
// Methods
// -----------------------------------------------------------------------------
function base (req, res , next){
    res.send(200 , "Welcome to OpenIOU");
}

function information(req, res , next){
    db.users.find({_id:mongojs.ObjectId(req.params.uid)}).limit(1).sort({name : -1} , function(err , success){
        if(success){
            console.log('Response success '+ success);
            res.send(200 , success);
            return next();
        }else{
            console.log('Response error '+err);
            return next(err);
        }
    });
}

function purchases (req, res , next) {
    db.transactions.find({payer: req.params.uid}).sort({date : -1} , function(err , success){
        if(success){
            console.log('Response success '+ success);
            res.send(200 , success);
            return next();
        }else{
            console.log('Response error '+err);
            return next(err);
        }
    });
}

function sales (req, res , next) {
    db.transactions.find({payee: req.params.uid}).sort({date : -1} , function(err , success){
        if(success){
            console.log('Response success '+ success);
            res.send(200 , success);
            return next();
        }else{
            console.log('Response error '+err);
            return next(err);
        }
    });   
}

function authorize (req, res , next) {
    var txn = {};
    
    txn.date = new Date();
    txn.payer = req.params.payer;
    txn.payee = req.params.payee;
    txn.approval = makeid(15);
    txn.metadata = "{ location: 'Burlington Store', amount: '592.24', currency: 'USD', display_name: 'Apple Store', payment_provider: 'AppleID' }";
 
    db.transactions.save(txn , function(err , success){
        console.log('Response success '+success);
        console.log('Response error '+err);
        if(success){
            res.send(201 , txn);
            return next();
        }else{
            return next(err);
        }
    });
}

function status (req, res , next) {
    var stat = {status: "active"};
    res.send(200 , stat);
}



// -----------------------------------------------------------------------------
// UTIL
// -----------------------------------------------------------------------------
function makeid(size)
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < size; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

// -----------------------------------------------------------------------------
// DEBUGGING
// -----------------------------------------------------------------------------
function debugTxns (req, res , next){
    db.transactions.find().limit(20).sort({name : -1} , function(err , success){
        if(success){
            console.log('Response success '+success);
            res.send(200 , success);
            return next();
        }else{
            console.log('Response error '+err);
            return next(err);
        }
    });
}

function debugUsers (req, res , next){
    db.users.find().limit(20).sort({name : -1} , function(err , success){
        if(success){
            console.log('Response success '+success);
            res.send(200 , success);
            return next();
        }else{
            console.log('Response error '+err);
            return next(err);
        }
    });
}