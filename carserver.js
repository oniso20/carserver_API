'use strict';

const http = require('http');

const { port, host } = require('./config.json');

const storage = require('./carstorage');

const server = http.createServer((req, res) => {
    const {
        pathname,
        searchParams,
    } = new URL(`http://${req.headers.host}${req.url}`);

    let resultHtml = '';
    if (pathname === '/cars') {
        resultHtml = createCarsHtml(storage.getAllCars());
    }

    else if (pathname === '/cartypes') {
        resultHtml = createCarTypes(storage.getAllModels());
    }

    else if (pathname === '/search/bylicense') {
        const value = searchParams.get('value');
        resultHtml = createCarsHtml(storage.getCar('license', value));
    }

    else if (pathname === '/search/bymodel') {
        const value = searchParams.get('value');
        resultHtml = createCarsHtml(storage.getCar('model', value));
    }

    else {
        resultHtml = `<h1>Error</h1>`;
    }

    res.writeHead(200, { 'content-Type': 'text/html; charset=utf-8' });
    res.end(resultHtml);
});

server.listen(port, host, () => {
    console.log(`Server ${host}: ${port} is running...`);
});

function createCarsHtml(carArray) {
    let htmlString = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Cars</title>
    </head>
    <body>
        <h1>Search result</h1>`;

    if (carArray.length === 0) {
        htmlString += `<h2>No cars found</h2>`;
    }

    else {
        htmlString += ` <table>
        <thead>
            <th>Model</th>
          <th>License</th>
        </thead>
        <tbody>`;

        for (const car of carArray) {
            htmlString += `
            <tr>
                <td>${car.model}</td>
                <td>${car.license}</td>
            </tr>
            `;
        }

        htmlString += `
        </tbody>

            </table>
            `;

    }

    htmlString += `
            </body>
            </html>
            `;



    return htmlString;
}

function createCarTypes(typesArray) {
    let htmlString = `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Types</title>
  </head>
  <body>
    <h1>Car models</h1>
    <ul>
        <li>${typesArray.join('</li><li>')}</li>
    </ul>
  </body>
</html>
    `;
    return htmlString;
}