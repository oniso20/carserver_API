'use strict';

const http = require('http');

const { port, host } = require('./config.json');

const storage = require('./carstorage');
const { createHistogram } = require('perf_hooks');

const server = http.createServer((req, res) => {
    const {
        pathname,
        searchParams,
    } = new URL(`http://${req.headers.host}${req.url}`);

    let resultHtml = '';
    if (pathname === '/cars') {
        resultHtml = createCarsHtml(storage.getAllCars());

    } else {
        res.end(); //later change
    }

    res.writeHead(200, { 'content-Type': 'text/html; charset=utf-8' });
    res.end(resultHtml);
});

server.listen(port, host, () => {
    console.log(`Server ${host}: ${port} is running...`);
});

function createCarsHtml(carArray) {
    return `<pre>${carArray}</pre>`;
}