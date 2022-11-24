'use strict';

const http = require('http');

const { port, host } = require('./config.json');

const { getAllCars, getAllModels, getCar } = require('./carstorage');

const server = http.createServer((req, res) => {
    const {
        pathname,
        searchParams,
    } = new URL(`http://${req.headers.host}${req.url}`);


    const route = decodeURIComponent(pathname); //Deals with äöå/ÖÄÅ characters

    let result = [];

    if (route === '/cars') {
        result = getAllCars();
    }

    else if (route === '/cartypes') {
        result = getAllModels();
    }

    else if (route === '/search/bylicense') {
        result = getCar('license', searchParams.get('value'));
    }

    else if (route === '/search/bymodel') {
        result = getCar('model', searchParams.get('value'));
    }

    else {
        result = { message: 'not found' };
    }

    res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*' //CORS Serving from different origin
    });

    res.end(JSON.stringify(result, null, 2)); // Output as JSON && null, 2 formats our JSON nicely with two spaces.
});

server.listen(port, host, () => {
    console.log(`Server ${host}: ${port} is running...`);
});