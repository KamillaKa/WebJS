'use strict';

const degreesC = +prompt('Syötä celsius asteet');

const degreesF = (degreesC * 9) / 5 + 32;
const degreesK = degreesC + 273.15;

const answer = `${degreesC}C on ${degreesF}F ja ${degreesK}K`;

document.getElementById('target').innerHTML = answer;
