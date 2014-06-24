//var addr = process.env.MONGOHQ_URL;
var addr="mongodb://heroku:aV_VFpl7Asrj5x1edZMdqUZT7is1pK-LVG4FkF_Kig91HsregNy80kIcACpeerjdTyOvrsPMU2DHfVXlBAZrNw@kahana.mongohq.com:10030/app26199420";
var mongojs = require("mongojs");

console.log(addr);

//var databaseUrl = addr + ':27017/openiou';
var databaseUrl = addr;
var collections = ["users", "transactions"]
var db = mongojs.connect(databaseUrl, collections);
/*
db.users.save({
    email: "ken.pickering@gmail.com",
    type: "payer", 
    cert: "-----BEGIN CERTIFICATE-----MIIBuTCCASKgAwIBAgIQNdNhtuV5GbNHYZsf+LvM0zANBgkqhkiG9w0BAQUFADAbMRkwFwYDVQQDExBFZGlkZXYgU21va2VUZXN0MB4XDTA4MTExMjE5NTEzNVoXDTM5MTIzMTIzNTk1OVowGzEZMBcGA1UEAxMQRWRpZGV2IFNtb2tlVGVzdDCBnzANBgkqhkiG9w0BAQEFAAOBjQAwgYkCgYEAm6zGzqxejwswWTNLcSsa7P8xqODspX9VQBuq5W1RoTgQ0LNR64+7ywLjH8+wrb/lB6QV7s2SFUiWDeduVesvMJkWtZ5zzQyl3iUaCBpT4S5AaO3/wkYQSKdI108pXH7Aue0e/ZOwgEEX1N6OaPQn7AmAB4uq1h+ffw+rRKNHqnsCAwEAATANBgkqhkiG9w0BAQUFAAOBgQCZmj+pgRsN6HpoICawK3XXNAmicgfQkailX9akIjD3xSCwEQx4nG6tZjTz30u4NoSffW7pch58SxuZQDqW5NsJcQNqNgo/dMoqqpXdi2/0BYEcJ8pjsngrFm+fM2BnyGpXH7aWuKsWjVFGlWlF+yi8I35Q8wFJt2Z/XGA7WWDjvw==-----END CERTIFICATE-----",
    accounts: "Paypal, VISA, American Express, Square, Amazon, Google, Circle (Bitcoin)",
    preferred_account: "Amazon"}
    , function(err, saved) {
  if( err || !saved ) console.log("User not saved");
  else console.log("User saved");
});

db.users.save({
    email: "tyson.kopczynski@taosage.net",
    type: "payer",
    cert: "-----BEGIN CERTIFICATE-----MIIBuTCCASKgAwIBAgIQNdNhtuV5GbNHYZsf+LvM0zANBgkqhkiG9w0BAQUFADAbMRkwFwYDVQQDExBFZGlkZXYgU21va2VUZXN0MB4XDTA4MTExMjE5NTEzNVoXDTM5MTIzMTIzNTk1OVowGzEZMBcGA1UEAxMQRWRpZGV2IFNtb2tlVGVzdDCBnzANBgkqhkiG9w0BAQEFAAOBjQAwgYkCgYEAm6zGzqxejwswWTNLcSsa7P8xqODspX9VQBuq5W1RoTgQ0LNR64+7ywLjH8+wrb/lB6QV7s2SFUiWDeduVesvMJkWtZ5zzQyl3iUaCBpT4S5AaO3/wkYQSKdI108pXH7Aue0e/ZOwgEEX1N6OaPQn7AmAB4uq1h+ffw+rRKNHqnsCAwEAATANBgkqhkiG9w0BAQUFAAOBgQCZmj+pgRsN6HpoICawK3XXNAmicgfQkailX9akIjD3xSCwEQx4nG6tZjTz30u4NoSffW7pch58SxuZQDqW5NsJcQNqNgo/dMoqqpXdi2/0BYEcJ8pjsngrFm+fM2BnyGpXH7aWuKsWjVFGlWlF+yi8I35Q8wFJt2Z/XGA7WWDjvw==-----END CERTIFICATE-----",
    accounts: "VISA, American Express, Square, Amazon, Google",
    preferred_account: "Square"}
    , function(err, saved) {
  if( err || !saved ) console.log("User not saved");
  else console.log("User saved");
});

db.users.save({
    email: "daniel.chiang@gmail.com",
    type: "payer",
    cert: "-----BEGIN CERTIFICATE-----MIIBuTCCASKgAwIBAgIQNdNhtuV5GbNHYZsf+LvM0zANBgkqhkiG9w0BAQUFADAbMRkwFwYDVQQDExBFZGlkZXYgU21va2VUZXN0MB4XDTA4MTExMjE5NTEzNVoXDTM5MTIzMTIzNTk1OVowGzEZMBcGA1UEAxMQRWRpZGV2IFNtb2tlVGVzdDCBnzANBgkqhkiG9w0BAQEFAAOBjQAwgYkCgYEAm6zGzqxejwswWTNLcSsa7P8xqODspX9VQBuq5W1RoTgQ0LNR64+7ywLjH8+wrb/lB6QV7s2SFUiWDeduVesvMJkWtZ5zzQyl3iUaCBpT4S5AaO3/wkYQSKdI108pXH7Aue0e/ZOwgEEX1N6OaPQn7AmAB4uq1h+ffw+rRKNHqnsCAwEAATANBgkqhkiG9w0BAQUFAAOBgQCZmj+pgRsN6HpoICawK3XXNAmicgfQkailX9akIjD3xSCwEQx4nG6tZjTz30u4NoSffW7pch58SxuZQDqW5NsJcQNqNgo/dMoqqpXdi2/0BYEcJ8pjsngrFm+fM2BnyGpXH7aWuKsWjVFGlWlF+yi8I35Q8wFJt2Z/XGA7WWDjvw==-----END CERTIFICATE-----",
    accounts: "Paypal, VISA, Square, Amazon, Google, Circle (Bitcoin)",
    preferred_account: "Paypal"}
    , function(err, saved) {
  if( err || !saved ) console.log("User not saved");
  else console.log("User saved");
});

db.users.save({
    email: "payments@apple.com",
    type: "business",
    cert: "-----BEGIN CERTIFICATE-----MIIBuTCCASKgAwIBAgIQNdNhtuV5GbNHYZsf+LvM0zANBgkqhkiG9w0BAQUFADAbMRkwFwYDVQQDExBFZGlkZXYgU21va2VUZXN0MB4XDTA4MTExMjE5NTEzNVoXDTM5MTIzMTIzNTk1OVowGzEZMBcGA1UEAxMQRWRpZGV2IFNtb2tlVGVzdDCBnzANBgkqhkiG9w0BAQEFAAOBjQAwgYkCgYEAm6zGzqxejwswWTNLcSsa7P8xqODspX9VQBuq5W1RoTgQ0LNR64+7ywLjH8+wrb/lB6QV7s2SFUiWDeduVesvMJkWtZ5zzQyl3iUaCBpT4S5AaO3/wkYQSKdI108pXH7Aue0e/ZOwgEEX1N6OaPQn7AmAB4uq1h+ffw+rRKNHqnsCAwEAATANBgkqhkiG9w0BAQUFAAOBgQCZmj+pgRsN6HpoICawK3XXNAmicgfQkailX9akIjD3xSCwEQx4nG6tZjTz30u4NoSffW7pch58SxuZQDqW5NsJcQNqNgo/dMoqqpXdi2/0BYEcJ8pjsngrFm+fM2BnyGpXH7aWuKsWjVFGlWlF+yi8I35Q8wFJt2Z/XGA7WWDjvw==-----END CERTIFICATE-----",
    accounts: "Paypal, VISA, MasterCard, American Express, Discover, AppleID, Circle (Bitcoin)",
    preferred_account: "AppleID"}
    , function(err, saved) {
  if( err || !saved ) console.log("User not saved");
  else console.log("User saved");
});
*/
/*
db.transactions.save({
    date: "2014-06-01T17:59:07.849Z",
    payer : "53978902a4fd9200003f3582",
    payee: "53978902a4fd9200003f3585",
    approval: "ZZjkshjds9017727",
    metadata: "Location: Natick Store, Amount: 592.24, Currency: USD"
    }
    , function(err, saved) {
  if( err || !saved ) console.log("Data not saved");
  else console.log("Data saved");
});

db.transactions.save({
    date: "2014-06-02T17:59:07.849Z",
    payer : "53978902a4fd9200003f3583",
    payee: "53978902a4fd9200003f3585",
    approval: "ZZjkshjds901727",
    metadata: "Location: Natick Store, Amount: 1992.24, Currency: USD"
    }
    , function(err, saved) {
  if( err || !saved ) console.log("Data not saved");
  else console.log("Data saved");
});
*/

//db.transactions.remove({_id : mongojs.ObjectId("53978e1b8af3bc00001fa941")});
//db.transactions.remove({_id : mongojs.ObjectId("53978c618011f3000070d965")});
//db.transactions.remove({_id : mongojs.ObjectId("53978c618011f3000070d964")});

// READ
db.transactions.find().limit(20).toArray(function(err, results){
    console.log(results);
});
