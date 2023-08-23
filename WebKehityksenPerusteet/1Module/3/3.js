'use strict';

const side1 = +prompt('Syötä ensimmäisen sivun pituus');
const side2 = +prompt('Syötä toisen pituus');
const side3 = +prompt('Syötä kolmannen sivun pituus');

let answer = ';';

if (side1 === side2 && side2 === side3) {
  answer = 'The triangle is equilateral';
} else if (side1 === side2 || side1 === side3 || side2 === side3) {
  answer = 'The triangle is isosceles';
} else {
  answer = 'The triangle is scalene';
}

document.getElementById('target').insertAdjacentHTML('beforeend', answer);

/*if (side1 === side2 && side2 === side3) {
  ('the triangle is equilateral');
} else if (side1 === side2 || side1 === side3 || side2 === side3) {
  ('the triangle is isosceles');
} else (side1 !== side2 && side3 !== side1 && side2 !== side3) {
  ('the triangle is scalene');
}*/
