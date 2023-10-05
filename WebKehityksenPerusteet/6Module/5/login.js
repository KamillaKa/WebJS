/* Login in */
let customers = {};
let currentUser = null;

const loadFromStorage = () => {
  const storedCustomers = localStorage.getItem("customers");
  if (storedCustomers) {
    customers = JSON.parse(storedCustomers);
  }
};

const saveToStorage = () => {
  localStorage.setItem("customers", JSON.stringify(customers));
};

document.getElementById("form").addEventListener("submit", function(e) {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (Object.values(customers).some(c => c.email === email)) {
    alert("Email already exists");
    return;
  }

  customers[email] = { username, email, password };
  saveToStorage();
  document.getElementById("formDialog").close();
  document.getElementById("form").reset();
});

document.getElementById("openModal").addEventListener("click", () => {
  let formDialog = document.getElementById("formDialog");
  formDialog.showModal();
});

document.getElementById("closeModal").addEventListener("click", () => {
  let formDialog = document.getElementById("formDialog");
  formDialog.close();
});

loadFromStorage();

/* welcome message */
document.getElementById("form").addEventListener("submit", function(e) {
  e.preventDefault();
  const username = document.getElementById("user").value;

  document.getElementById("welcome-msg").textContent = "Welcome, " + username;

  document.getElementById("formDialog").close();
  document.getElementById("form").reset();
});


