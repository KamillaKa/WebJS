const restaurantRow = restaurant => {
  const tr = document.createElement('tr');
  const name = document.createElement('td');
  name.innerText = restaurant.name;
  const address = document.createElement('td');
  address.innerText = restaurant.address;
  tr.appendChild(name);
  tr.appendChild(address);
};

export {restaurantRow};
