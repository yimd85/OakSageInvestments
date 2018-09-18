const express = require('express');
const axios = require("axios");
require('dotenv').config()

const app = express();

const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

const auth = "Basic " + new Buffer(username + ':' + password).toString('base64');

app.get('/', (request, response) => {

    axios.get("https://api.intrinio.com/data_point?identifier=CL&item=cashandequivalents,totalliabilities,weightedavedilutedsharesos,adj_close_price",
    {
        headers: {"Authorization": auth}
    }).then(function (response) {
        // handle success
        console.log(response.data);
    }).catch(function (error) {
        // handle error
        console.log(error);
    })
});

app.listen(8000, () => {
    console.log('listening on port 8000');
});
