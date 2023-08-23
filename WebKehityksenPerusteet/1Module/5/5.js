'use strict'

const number = +prompt('Syötä luonnollinen luku');

for (let i = 0; i <= number ; i += i) {
  console.log(i);
}
