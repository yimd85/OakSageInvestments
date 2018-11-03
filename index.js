const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();

const username = process.env.DB_USERJL;
const password = process.env.DB_PASSWORDJL;

const x = require('./stocks');

const auth = 'Basic ' + new Buffer(username + ':' + password).toString('base64');

app.get('/', (request, response) => {  
    response.send('x');
});

app.get('/filinginformation', async (request, response) => {
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



app.get('/cash', async (request, response) => {
                    for (let i = 0; i < x.russell3000D.length; i++) { 
                
                        await axios.get(`https://api.intrinio.com/data_point?identifier=${x.russell3000D[i]}&item=cashandequivalents,totalliabilities,weightedavedilutedsharesos,adj_close_price`,
                            {
                                headers: {'Authorization': auth}
                            }).then(response => {
                                console.log(x.russell3000D[i],'!',response.data.data[0]);
                                console.log(x.russell3000D[i],'!',response.data.data[1]);
                                console.log(x.russell3000D[i],'!',response.data.data[2]);
                                console.log(x.russell3000D[i],'!',response.data.data[3]);
                            }).catch(() => {
                                console.log('null could not get');
                        });
                    }    
                response.send('x');
});


app.get('/calculation', async (request, response) => {
    for (let i = 0; i < x.russell3000Y.length; i++) { 
        await axios.get(`https://api.intrinio.com/financials/standardized?identifier=${x.russell3000Y[i]}&statement=calculations&type=QTR`,
            {
                headers: {'Authorization': auth}
            }).then(response => {
                console.log(x.russell3000Y[i],'!',response.data.data);
            }).catch(() => {
                console.log('null could not get');
        });   
    }
response.send('x');
});

app.get('/balancesheet', async (request, response) => {
    for (let i = 0; i < x.russell3000X.length; i++) { 
        await axios.get(`https://api.intrinio.com/financials/standardized?identifier=${x.russell3000X[i]}&statement=balance_sheet&type=QTR`,
  
            {
                headers: {'Authorization': auth}
            }).then(response => {
                console.log(x.russell3000X[i],'!',response.data.data);
            }).catch(() => {
                console.log('null could not get');
        });   
    }
response.send('x');
});



app.get('/incomestatement', async (request, response) => {
    for (let i = 0; i < x.russell3000Y.length; i++) { 
        await axios.get(`https://api.intrinio.com/financials/standardized?identifier=${x.russell3000Y[i]}&statement=income_statement&type=QTR`,
  
            {
                headers: {'Authorization': auth}
            }).then(response => {
                console.log(x.russell3000Y[i],'!',response.data.data);
            }).catch(() => {
                console.log('null could not get');
        });   
    }
response.send('x');
});


app.get('/test', async (request, response) => {
    for (let i = 0; i < x.russell3000Y.length; i++) { 
        await axios.get(`https://api.intrinio.com/financials/standardized?identifier=${x.russell3000Y[i]}&statement=cash_flow_statement&type=QTR`,
  
            {
                headers: {'Authorization': auth}
            }).then(response => {
                console.log(x.russell3000Y[i],'!',response.data.data);
            }).catch(() => {
                console.log('null could not get');
        });   
    }
response.send('x');
});


app.listen(8000, () => {
    console.log('listening on port 8000');
});




//Financials - Intrinio Calculations (done)
//https://api.intrinio.com/financials/standardized?identifier=SBUX&statement=calculations&type=QTR

//Financials - Balance Sheet (done)
//https://api.intrinio.com/financials/standardized?identifier=SBUX&statement=balance_sheet&type=QTR

//Financials - Income Statement (done)
//https://api.intrinio.com/financials/standardized?identifier=${x.russell3000Y[i]}&statement=income_statement&type=QTR

//Financials - Cash Flow (done)
//https://api.intrinio.com/financials/standardized?identifier=SBUX&statement=cash_flow_statement&type=QTR



