'use strict';

const fruits = ["apple", "banana", "orange", " grape", "kiwi"];
const vegetables = [];

console.log(fruits);
console.log(`There are ${fruits.length} fruits`);
console.log(`The second fruit is ${fruits[1]}`);
console.log(`The last fruit is ${fruits[fruits.length - 1]}`);

for (let i = 1; i <= 3; i++) {
  const vegetable = prompt(`Enter vegetable ${i}/3:`);
  vegetables.push(vegetable);
}

console.log(vegetables);
console.log(`The are ${vegetables.length} vegetables`);
