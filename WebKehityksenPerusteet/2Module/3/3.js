'use strict';

const numbers = [];
let cont = true;
while (cont) {
  const number = prompt('Syötä luku tai kirjoita stop lopettaaksesi');
  if (number === 'stop') {
    alert('Lopetit ohjelman');
    cont = false;
  }
  numbers.push(number);
}

document.getElementById('target').innerHTML == 'Tasaluvut';
const even = [];
for (const number of numbers) {
  if (number % 2 === 0) {
    even.push(number);
  }
}

if (even.length > 0) {
  document.getElementById('target').innerHTML += even.join(' , ');
} else {
  document.getElementById('target').innerHTML += 'Ei ole';
}
