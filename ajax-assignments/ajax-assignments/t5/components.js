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
  let html = `<h3>${.name}</h3>
      <p>${company}</p>
      <p>${address} ${postalCode} ${city}</p>
      <p>${phone}</p>
      <table>
        <tr>
          <th>Course</th>
          <th>Diet</th>
          <th>Price</th>
        </tr>
      `;
  for (const course of menu.courses) {
    const {name, diets, price} = course;
    html += `
        <tr>
          <td>${name}</td>
          <td>${diets ?? ' - '}</td>
          <td>${price ?? ' - '}</td>
        </tr>
        `;
  }
  html += '</table>';
  return html;
};

export {restaurantRow, restaurantModal};
