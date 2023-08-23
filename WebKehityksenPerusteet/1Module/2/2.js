'use strict';

const x1 = +prompt('Syötä x1');
const y1 = +prompt('Syötä y1');
const x2 = +prompt('Syötä x2');
const y2 = +prompt('Syötä y2');

const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2).toFixed(2);

const answer = `Piste on ${distance} kauempana`;

document.getElementById('target').innerHTML = answer;
