const restaurantRow = restaurant => {
  const {name, address, company} = restaurant;
  const tr = document.createElement('tr');
  const nameCell = document.createElement('td');
  nameCell.innerText = name;
  const addressCell = document.createElement('td');
  addressCell.innerText = address;
  const companyCell = document.createElement('td');
  companyCell.innerText = company;
  tr.appendChild(nameCell);
  tr.appendChild(addressCell);
  tr.appendChild(companyCell);
  return tr;
};

const restaurantModal = (restaurant, menu) => {
  const {name, address, city, postalCode, phone} = restaurant;

  for (const course of menu.courses) {
    const {name, diets, price} = course;
  }
};

export {restaurantRow};
