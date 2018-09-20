
var url = require('url');
var https = require('https');
var SocksProxyAgent = require('socks-proxy-agent');
const crypto = require('crypto');


const URL = "https://api.binance.com"
const GET_BALANCE = "/api/v3/account"
const GET_PRICE = "/api/v3/ticker/price"
const SECRET_KEY = "gdp9jp5vvo6aVVJsLXieEe47rVKYPmFEcqYVKqHPsW5CMlMhBMmWjsyMXlN3jj32"
const API_KEY = "t4ZwkOJPr7PdF1MJqcRpnBVjNMGeOL8tlDw48ywx0Pdavb3kCROXCmZkbU3iMF3i"
// SOCKS proxy to connect to
const proxy = process.env.socks_proxy || 'socks://127.0.0.1:1080';

function getBalance (req, res, next) {
    console.log('request recieved');
    var currentTime = Date.now();
    var queryStr = 'timestamp='+currentTime;
    queryStr = queryStr+"&signature=" + sha(queryStr);
     
    // HTTP endpoint for the proxy to connect to
    var endpoint = URL + GET_BALANCE + "?" + queryStr;
    var opts = url.parse(endpoint);
    
    // create an instance of the `SocksProxyAgent` class with the proxy server information
    // NOTE: the `true` second argument! Means to use TLS encryption on the socket
    var agent = new SocksProxyAgent(proxy, true);
    opts.agent = agent;
    opts.headers = {"X-MBX-APIKEY":API_KEY}
    var body = '';
    https.get(opts, function (resp) {
        //console.log('"response" event!', res.headers);
        resp.on('data', function(chunk){
            body += chunk;
        });

        resp.on('end', function(){
            var bodyJson = JSON.parse(body);

            res.status(200).json(bodyJson.balances.filter(
                function (entry) {
                    return entry.free > 0 || entry.locked > 0;
                }
            ));
            console.log("Got a response: ", bodyJson.balances.filter(
                function (entry) {
                    return entry.free > 0 || entry.locked > 0;
                }
            ));
        });
    }).on('error', function(e){
        console.log("Got an error: ", e);
     });
}

function getPrice (req, res, next) {
    console.log('get price request recieved');
    var endpoint = URL + GET_PRICE + "?symbol=BNBUSDT";
    var opts = url.parse(endpoint);
    
    // create an instance of the `SocksProxyAgent` class with the proxy server information
    // NOTE: the `true` second argument! Means to use TLS encryption on the socket
    opts.agent = new SocksProxyAgent(proxy, true);

    var body = '';
    https.get(opts, function (resp) {
        resp.on('data', function(chunk){
            body += chunk;
        });

        resp.on('end', function(){
            var bodyJson = JSON.parse(body);

            res.status(200).json(bodyJson);
            console.log("Got a response: ", bodyJson);
        });
    }).on('error', function(e){
        console.log("Got an error: ", e);
     });
}



function sha(queryStr) {
    return  crypto.createHmac('sha256', SECRET_KEY).update(queryStr).digest('hex');
}

module.exports = {
    getBalance,
    getPrice
}

 

