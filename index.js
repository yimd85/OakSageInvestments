const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();

const username = process.env.DB_USERRY;
const password = process.env.DB_PASSWORDRY;

const x = require('./stocks');

const auth = 'Basic ' + new Buffer(username + ':' + password).toString('base64');

app.get('/', async (request, response) => {
    for (let i = 0; i < x.russell3000C.length; i++) {
            await axios.get(`https://api.intrinio.com/fundamentals/standardized?identifier=${x.russell3000C[i]}&statement=income_statement&type=QTR&date=2018-09-27&page_size=1`,
                {
                    headers: {'Authorization': auth}
                }).then(response => {
                    console.log(x.russell3000C[i],'!',response.data.data[0].filing_date);
                }).catch(() => {
                    console.log('null could not get');
            });

        }


    response.send('x');
});



app.get('/what', (request, response) => {
    // console.log(z);
    //this is a test
        // let ops = [];
    // const numPages = await yarray.length;
    // console.log(yarray.length);
    // console.log(yarray[0]);
                // await axios.get(`https://api.intrinio.com/data_point?identifier=${x.yarray[i]}&item=cashandequivalents,totalliabilities,weightedavedilutedsharesos,adj_close_price`,
            // await axios.get(`https://api.intrinio.com/data_point?identifier=${pp[i]}&item=sector,industry_group`,
             // await axios.get(`https://api.intrinio.com/data_point?identifier=${y[i]}&item=next_earnings_date`,
                                 // console.log(response.data.data[1]);
                    // console.log(y[2]);
                    // console.log(y.length);
                    // ops.push(response.data)
});

app.listen(8000, () => {
    console.log('listening on port 8000');
});


// "https://api.intrinio.com/data_point?identifier=CL&item=cashandequivalents,totalliabilities,weightedavedilutedsharesos,adj_close_price"
