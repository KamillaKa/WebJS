'use strict';

async function postData() {
  const response = await fetch('https://reqres.in/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: 'John',
      job: 'developer'
    })
  });

  const data = await response.json();
  console.log(data);
}

postData();
