'use strict';

const score = +prompt('Syötä pisteidesi lukumäärä');

let answer = ';';

if (score >= 0 && score<= 39) {
    answer = 'Your grade is 0';
  } else if (score >= 40 && score<= 51) {
    answer = 'Your grade is 1';
} else if (score >= 52 && score<= 63) {
    answer = 'Your grade is 2';
} else if (score >= 64 && score<= 75) {
    answer = 'Your grade is 3';
} else if (score >= 76 && score<= 87) {
    answer = 'Your grade is 4';
} else if (score >= 88 && score<= 100) {
    answer = 'Your grade is 5';
} else {
    answer = 'Invalid score';
}

  document.getElementById('target').insertAdjacentHTML('beforeend', answer);
