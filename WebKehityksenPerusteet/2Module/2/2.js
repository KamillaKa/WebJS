'use strict';

const numbers = [];

for (let i = 1; i <= 5; i++) {
  const number = prompt(`Enter number ${i}/5:`);
  numbers.push(number);
}

document.getElementById('target').insertAdjacentHTML('beforeend', numbers);

const yourNumber = prompt('Enter a number and see if its in the numbers array');

if (numbers.includes(yourNumber)) {
  document.getElementById('target2').insertAdjacentHTML('beforeend', `${yourNumber} is in numbers array`);
} else {
  document.getElementById('target2').insertAdjacentHTML('beforeend', `${yourNumber} is not in numbers array`);
}

const removeNum = numbers.pop();

document.getElementById('target3').insertAdjacentHTML('beforeend', `${numbers} after the last number is deleted`);

function sortNumbers(a, b) {
  const difference = a - b;
  return difference;
}

numbers.sort(sortNumbers);

document.getElementById('target4').insertAdjacentHTML('beforeend', `${numbers} sorted in ascending order`);


