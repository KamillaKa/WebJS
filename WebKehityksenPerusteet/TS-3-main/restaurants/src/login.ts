/* Logging in */
interface Customer {
    username: string;
    email: string;
    password: string;
  }

  let customers: Record<string, Customer> = {};
  let currentUser: string | null = null;

  const loadFromStorage = () => {
    const storedCustomers = localStorage.getItem("customers");
    if (storedCustomers) {
      customers = JSON.parse(storedCustomers);
    }
  };

  const saveToStorage = () => {
    localStorage.setItem("customers", JSON.stringify(customers));
  };

  document.getElementById("form")!.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = (document.getElementById("username") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;

    if (Object.values(customers).some((c) => c.email === email)) {
      alert("Email already exists");
      return;
    }

    customers[email] = { username, email, password };
    saveToStorage();
    (document.getElementById("formDialog") as HTMLDialogElement).close();
    (document.getElementById("form") as HTMLFormElement).reset();
  });

  document.getElementById("openModal")!.addEventListener("click", () => {
    let formDialog = document.getElementById("formDialog") as HTMLDialogElement;
    formDialog.showModal();
  });

  document.getElementById("closeModal")!.addEventListener("click", () => {
    let formDialog = document.getElementById("formDialog") as HTMLDialogElement;
    formDialog.close();
  });

  loadFromStorage();

  /* Welcome message */
  document.getElementById("form")!.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = (document.getElementById("user") as HTMLInputElement).value;

    document.getElementById("welcome-msg")!.textContent = "Welcome, " + username;

    (document.getElementById("formDialog") as HTMLDialogElement).close();
    (document.getElementById("form") as HTMLFormElement).reset();
  });

