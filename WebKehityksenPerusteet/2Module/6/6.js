'use strict';

const movies = [];

let more = true;

while (more) {
  const title = prompt('Syötä elokuvan nimi');
  const rating = prompt('Syötä elokuvan arvio (1-5)');
  const movie = {title, rating};
  movies.push(movie);
  more = confirm('Halutko syöttää enemmän?');
}

function sortMovies(a, b) {
  const difference = b.rating - a.rating;
  return difference;
}

movies.sort(sortMovies);

console.log(movies);
for (const movie of movies) {
  const td1 = document.createElement('td');
  td1.innerText = movie.title;

  const td2 = document.createElement('td');
  td2.innerText = movie.rating;

  const tr = document.createElement('tr');
  tr.append(td1);
  tr.append(td2);

  document.getElementById('target').append(tr);
}

const favorite = movies[0];
document.getElementById('fav').innerText = favorite.title;
