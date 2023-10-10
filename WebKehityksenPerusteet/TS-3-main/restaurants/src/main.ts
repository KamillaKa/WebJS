import {pwaInfo} from 'virtual:pwa-info';
import {fetchData} from './functions';
import {UpdateResult} from './interfaces/UpdateResult';
import {UploadResult} from './interfaces/UploadResult';
import {LoginUser, User} from './interfaces/User';
import {apiUrl, uploadUrl} from './variables';
import {registerSW} from 'virtual:pwa-register';
import {errorModal, restaurantModal, restaurantRow} from './components';
import {fetchData} from './functions';
import {Restaurant} from './interfaces/Restaurant';
import {apiUrl, positionOptions} from './variables';
import './style.css';
import {Menu, WeeklyMenu} from './interfaces/Menu';

// PWA
// PWA code
console.log(pwaInfo);

const updateSW = registerSW({
  immediate: true,
  onNeedRefresh() {
    console.log('onNeedRefresh');
    const update = confirm('New version available. Update?');
    if (update) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log('onOfflineReady');
    alert('App is offline ready');
  },
});

// select forms from the DOM
const loginForm = document.querySelector('#login-form');
// const profileForm = document.querySelector('#profile-form');
const avatarForm = document.querySelector('#avatar-form');

// select inputs from the DOM
const usernameInput = document.querySelector(
  '#username'
) as HTMLInputElement | null;
const passwordInput = document.querySelector(
  '#password'
) as HTMLInputElement | null;

const profileUsernameInput = document.querySelector(
  '#profile-username'
) as HTMLInputElement | null;
const profileEmailInput = document.querySelector(
  '#profile-email'
) as HTMLInputElement | null;

const avatarInput = document.querySelector(
  '#avatar'
) as HTMLInputElement | null;

// select profile elements from the DOM
const usernameTarget = document.querySelector('#username-target');
const emailTarget = document.querySelector('#email-target');
const avatarTarget = document.querySelector('#avatar-target');

// TODO: function to login
const login = async (user: {
  username: string;
  password: string;
}): Promise<LoginUser> => {
  const options: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  };
  return await fetchData<LoginUser>(apiUrl + '/auth/login', options);
};

// TODO: funtion to upload avatar
const uploadAvatar = async (
  image: File,
  token: string
): Promise<UploadResult> => {
  const formData = new FormData();
  formData.append('avatar', image);

  const options: RequestInit = {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token,
    },
    body: formData,
  };
  return await fetchData(apiUrl + '/users/avatar', options);
};
/*
// TODO: function to update user data
const updateUserData = async (
  user: UpdateUser,
  token: string
): Promise<UpdateResult> => {};
*/

// TODO: function to add userdata (email, username and avatar image) to the
// Profile DOM and Edit Profile Form
const addUserDataToDom = (user: User): void => {
  if (
    !usernameTarget ||
    !emailTarget ||
    !avatarTarget ||
    !profileEmailInput ||
    !profileUsernameInput
  ) {
    return;
  }
  usernameTarget.innerHTML = user.username;
  emailTarget.innerHTML = user.email;
  (avatarTarget as HTMLImageElement).src = uploadUrl + user.avatar;

  profileEmailInput.value = user.email;
  profileUsernameInput.value = user.username;
};

// function to get userdata from API using token
const getUserData = async (token: string): Promise<User> => {
  const options: RequestInit = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  return await fetchData<User>(apiUrl + '/users/token', options);
};

// TODO: function to check local storage for token and if it exists fetch
// userdata with getUserData then update the DOM with addUserDataToDom
const checkToken = async (): Promise<void> => {
  const token = localStorage.getItem('token');
  if (!token) {
    return;
  }
  const userData = await getUserData(token);
  addUserDataToDom(userData);
};

// call checkToken on page load to check if token exists and update the DOM
checkToken();

// TODO: login form event listener
// event listener should call login function and save token to local storage
// then call addUserDataToDom to update the DOM with the user data
loginForm?.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  if (!usernameInput || !passwordInput) {
    return;
  }
  const user = {
    username: usernameInput.value,
    password: passwordInput.value,
  };
  const loginData = await login(user);
  console.log(loginData);
  // alert(loginData.message);
  localStorage.setItem('token', loginData.token);
  addUserDataToDom(loginData.data);
});

// TODO: profile form event listener
// event listener should call updateUserData function and update the DOM with
// the user data by calling addUserDataToDom or checkToken

// TODO: avatar form event listener
// event listener should call uploadAvatar function and update the DOM with
// the user data by calling addUserDataToDom or checkToken
avatarForm?.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  if (!avatarInput?.files) {
    return;
  }
  const image = avatarInput.files[0];

  const token = localStorage.getItem('token');
  if (!token) {
    return;
  }

  const avatarData = await uploadAvatar(image, token);
  console.log(avatarData);
  checkToken();
});

// restaurant
const myModal = document.querySelector('#myDialog') as HTMLDialogElement;
if (!myModal) {
  throw new Error('Modal not found');
}
myModal.addEventListener('click', (e) => {
  if (e.target !== myModal) {
    return;
  }
  myModal.close();
});

const calculateDistance = (x1: number, y1: number, x2: number, y2: number) =>
  Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

const addSwitchButtons = (modal: HTMLElement, restaurant: Restaurant) => {
  const dailyButton = document.createElement('button');
  dailyButton.innerText = 'Daily';
  dailyButton.dataset.view = 'daily';

  const weeklyButton = document.createElement('button');
  weeklyButton.innerText = 'Weekly';
  weeklyButton.dataset.view = 'weekly';

  modal.appendChild(dailyButton);
  modal.appendChild(weeklyButton);

  dailyButton.addEventListener('click', () => switchMenuView(modal, restaurant, 'daily'));
  weeklyButton.addEventListener('click', () => switchMenuView(modal, restaurant, 'weekly'));
};

const switchMenuView = async (modal: HTMLElement, restaurant: Restaurant, viewType: 'daily' | 'weekly') => {
  let fetchedData: Menu | WeeklyMenu;

  if (viewType === 'daily') {
    fetchedData = await fetchData<Menu>(apiUrl + `/restaurants/daily/${restaurant._id}/fi`);
  } else {
    fetchedData = await fetchData<WeeklyMenu>(apiUrl + `/restaurants/weekly/${restaurant._id}/fi`);
  }

  const newHtml = restaurantModal(restaurant, fetchedData, viewType);
  modal.innerHTML = '';
  addSwitchButtons(modal, restaurant);
  modal.insertAdjacentHTML('beforeend', newHtml);
};

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
        const dailyMenu = await fetchData<Menu>(apiUrl + `/restaurants/daily/${restaurant._id}/fi`);
        const weeklyMenu = await fetchData<WeeklyMenu>(apiUrl + `/restaurants/weekly/${restaurant._id}/fi`);
        myModal.innerHTML = '';

        console.log(weeklyMenu);

        addSwitchButtons(myModal, restaurant);

        const menuHtml = restaurantModal(restaurant, dailyMenu, 'daily');
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
