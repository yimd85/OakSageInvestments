const express = require('express');
const https = require("https");

require('dotenv').config()

const app = express();


var username = process.env.DB_USER;
var password = process.env.DB_PASSWORD;


var auth = "Basic " + new Buffer(username + ':' + password).toString('base64');

app.get('/', (request, response) => {
    var request = https.request({
        method: "GET",
        host: "api.intrinio.com",
        path: "/data_point?identifier=CL&item=cashandequivalents,totalliabilities,weightedavedilutedsharesos,adj_close_price",
        headers: {
            "Authorization": auth
        }
    }, function(response) {
        var json = "";
        response.on('data', function (chunk) {
            json += chunk;
        });
        response.on('end', function() {
            var company = JSON.parse(json);
            console.log(company);
        });
    });
    
    request.end();


    response.send(response.data)
});

app.listen(8000, () => {
    console.log('listening on port 8000');
});
