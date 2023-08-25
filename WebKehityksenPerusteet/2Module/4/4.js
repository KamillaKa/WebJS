'use strict';

const array = [11, 2, 3, 8, 4]

console.log(`Original array ${array}`);

function sortArray(a, b) {
  const difference = a - b;
  return difference;
}

array.sort(sortArray);

console.log(`Sorted array ${array}`);
