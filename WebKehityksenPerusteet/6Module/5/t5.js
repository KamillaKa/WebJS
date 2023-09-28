import {errorModal, restaurantModal, restaurantRow} from './components.js';
import {fetchData} from './functions.js';
import {apiUrl, positionOptions} from './variables.js';

const modal = document.querySelector('dialog');
modal.addEventListener('click', () => {
  modal.close();
});

const calculateDistance = (x1, y1, x2, y2) =>
  Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

const createTable = (restaurants) => {
  document.querySelector('table').innerHTML = '';
  restaurants.forEach((restaurant) => {
    const tr = restaurantRow(restaurant);
    document.querySelector('table').appendChild(tr);
    tr.addEventListener('click', async () => {
      try {
        // remove all highlights
        const allHighs = document.querySelectorAll('.highlight');
        allHighs.forEach((high) => {
          high.classList.remove('highlight');
        });
        // add highlight
        tr.classList.add('highlight');
        // add restaurant data to modal
        modal.innerHTML = '';

        // fetch menu
        const menu = await fetchData(
          apiUrl + `/restaurants/daily/${restaurant._id}/fi`
        );
        console.log(menu);

        const menuHtml = restaurantModal(restaurant, menu);
        modal.insertAdjacentHTML('beforeend', menuHtml);

        modal.showModal();
      } catch (error) {
        modal.innerHTML = errorModal(error.message);
        modal.showModal();
      }
    });
  });
};

const error = (err) => {
  console.warn(`ERROR(${err.code}): ${err.message}`);
};

const success = async (pos) => {
  try {
    const crd = pos.coords;
    const restaurants = await fetchData(apiUrl + '/restaurants');
    console.log(restaurants);
    restaurants.sort((a, b) => {
      const x1 = crd.latitude;
      const y1 = crd.longitude;
      const x2a = a.location.coordinates[1];
      const y2a = a.location.coordinates[0];
      const distanceA = calculateDistance(x1, y1, x2a, y2a);
      const x2b = b.location.coordinates[1];
      const y2b = b.location.coordinates[0];
      const distanceB = calculateDistance(x1, y1, x2b, y2b);
      return distanceA - distanceB;
    });
    createTable(restaurants);
    // buttons for filtering
    const sodexoBtn = document.querySelector('#sodexo');
    const compassBtn = document.querySelector('#compass');
    const resetBtn = document.querySelector('#reset');

    sodexoBtn.addEventListener('click', () => {
      const sodexoRestaurants = restaurants.filter(
        (restaurant) => restaurant.company === 'Sodexo'
      );
      console.log(sodexoRestaurants);
      createTable(sodexoRestaurants);
    });

    compassBtn.addEventListener('click', () => {
      const compassRestaurants = restaurants.filter(
        (restaurant) => restaurant.company === 'Compass Group'
      );
      console.log(compassRestaurants);
      createTable(compassRestaurants);
    });

    resetBtn.addEventListener('click', () => {
      createTable(restaurants);
    });
  } catch (error) {
    modal.innerHTML = errorModal(error.message);
    modal.showModal();
  }
};

navigator.geolocation.getCurrentPosition(success, error, positionOptions);

// login
// Initialize empty object to hold customer data
let customers = {};

// Function to save data to local storage
const saveToStorage = () => {
  localStorage.setItem('customers', JSON.stringify(customers));
};

// Load customer data from local storage if available
const loadFromStorage = () => {
  const storedCustomers = localStorage.getItem('customers');
  if (storedCustomers) {
    customers = JSON.parse(storedCustomers);
  }
};

// Call function to load data
loadFromStorage();

// Registration form event listener
document.getElementById('registration-form').addEventListener('submit', function(e) {
  e.preventDefault();

  // Get form values
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Check if user already exists by email
  if (Object.values(customers).some(c => c.email === email)) {
    alert('Email already exists');
    return;
  }

  // Generate a new customer ID (use length for simplicity)
  const newCustomerId = Object.keys(customers).length + 1;

  // Store new customer data
  customers[newCustomerId] = {
    username,
    email,
    password  // Note: Don't store plain passwords in a real application
  };

  // Save updated data to local storage
  saveToStorage();

  // Reset form
  document.getElementById('registration-form').reset();

  alert('Registration successful');
});


