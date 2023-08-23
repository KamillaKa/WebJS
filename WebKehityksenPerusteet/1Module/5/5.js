'use strict'

let number = +prompt('Syötä luonnollinen luku');

let sum = 0

for (let i = 0; i <= number ; i++) {
  sum += i
}
document.getElementById('target').insertAdjacentHTML('beforeend', sum);
