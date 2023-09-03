'use strict';

async function fetchData(method, url) {
  try {
    const options = {
      method,
      headers: {'Content-Type': 'application/json'},
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(`Error with ${method} request: ${error}`);
  }
}

// Test the functions with non-existent URLs
fetchData('GET', 'https://reqres.in/api/unknown/23');
fetchData('POST', 'https://reqres.in/api/unknown', {
  name: 'John',
  job: 'developer',
});
fetchData('PUT', 'https://reqres.in/api/unknown/23', {
  name: 'Jane',
  job: 'manager',
});
fetchData('DELETE', 'https://reqres.in/api/unknown/23');
