import {errorModal, restaurantModal, restaurantRow} from './components';
import {fetchData} from './functions';
import {Restaurant} from './interfaces/Restaurant';
import {apiUrl, positionOptions} from './variables';
import './style.css';
import {Menu} from './interfaces/Menu';

const myModal = document.querySelector('#myDialog') as HTMLDialogElement;
if (!myModal) {
  throw new Error('Modal not found');
}
myModal.addEventListener('click', () => {
  myModal.close();
});

const calculateDistance = (x1: number, y1: number, x2: number, y2: number) =>
  Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

const createTable = (restaurants: Restaurant[]) => {
  const table = document.querySelector('table');
  if (!table) {
    throw new Error('Table not found');
  }
  table.innerHTML = '';
  restaurants.forEach((restaurant, index) => {
    const tr = restaurantRow(restaurant);
    if (index < 3) {
      tr.classList.add('highlight');
    }
    table.appendChild(tr);
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
        myModal.innerHTML = '';

        // fetch menu
        const menu = await fetchData<Menu>(
          apiUrl + `/restaurants/daily/${restaurant._id}/fi`
        );
        console.log(menu);

        const menuHtml = restaurantModal(restaurant, menu);
        myModal.insertAdjacentHTML('beforeend', menuHtml);

        myModal.showModal();
      } catch (error) {
        myModal.innerHTML = errorModal((error as Error).message);
        myModal.showModal();
      }
    });
  });
};

const error = (err: GeolocationPositionError) => {
  console.warn(`ERROR(${err.code}): ${err.message}`);
};

const success = async (pos: GeolocationPosition) => {
  try {
    const crd = pos.coords;
    const restaurants = await fetchData<Restaurant[]>(apiUrl + '/restaurants');
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

    if (!sodexoBtn || !compassBtn || !resetBtn) {
      throw new Error('Button not found');
    }
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
    myModal.innerHTML = errorModal((error as Error).message);
    myModal.showModal();
  }
};

const checkbox = document.getElementById("checkbox") as HTMLInputElement;
checkbox.addEventListener("change", () => {
  document.body.classList.toggle("dark");
  document.documentElement.classList.toggle("dark");
});


navigator.geolocation.getCurrentPosition(success, error, positionOptions);
