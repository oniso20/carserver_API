'use strict';

const http = require('http');

const { port, host } = require('./config.json');

const storage = require('./carstorage');

const server = http.createServer((req, res) => {
    const {
        pathname,
        searchParams,
    } = new URL(`http://${req.headers.host}${req.url}`);

    let results = '';
    if (pathname === '/cars') {
        results = storage.getAllCars();
    }

    else if (pathname === '/cartypes') {
        results = storage.getAllModels();
    }

    else if (pathname === '/search/bylicense') {
        const value = searchParams.get('value');
        results = storage.getCar('license', value);
    }

    else if (pathname === '/search/bymodel') {
        const value = searchParams.get('value');
        results = storage.getCar('model', value);
    }

    else {
        results = ``;
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(results));
});

server.listen(port, host, () => {
    console.log(`Server ${host}: ${port} is running...`);
});