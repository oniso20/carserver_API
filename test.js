'use strict';

// const { getAllModels } = require('./carstorage');

// console.log(getAllModels());

const typesArray = ['Fast GT', 'Errare', 'MbW'];

console.log(`<li>${typesArray.join('</li><li>')}</li>`);

const numbers = [1, 2, 3, 4, 5];

console.log(numbers.join());
console.log(numbers.join('+'));
console.log(numbers.join(' + '));
console.log(numbers.join('),('));
console.log(numbers.join('),(') + ')');
console.log(numbers.join(`),(')})`));
console.log(numbers.join(` ## hi ##`));