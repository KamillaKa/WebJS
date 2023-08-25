'use strict';

const numbers = [5, 2, 8, 1, 9];

function sortArray (nums, order) {
  if (order === 'asc') {
    return nums.sort((a, b) => a - b);
  } else if (order === 'desc') {
    return nums.sort((a, b) => b - a);
  }
}



sortArray(numbers, "asc");
console.log(sortArray(numbers, "asc"));

sortArray(numbers, "desc");
console.log(sortArray(numbers, "desc"));
