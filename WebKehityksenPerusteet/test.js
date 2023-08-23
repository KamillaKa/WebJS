'use strict'

/* const lista = ["a", "b", "c"];

for (let i in lista) {
  console.log(i)
  console.log(lista[i])
}
*/

'use strict'
let number = +prompt('Syötä luonnollinen luku');

let sum = 0

for (let i = 0; i <= number ; i++) {
  sum += i
}
console.log(sum);
