document.getElementById("hamburger").addEventListener("click", function() {
  const navLinks = document.getElementById("nav-links");
  navLinks.style.display = (navLinks.style.display === "flex") ? "none" : "flex";
});

window.addEventListener("resize", function() {
  const navLinks = document.getElementById("nav-links");
  if (window.innerWidth > 724) {
    navLinks.style.display = "flex";
  } else if (window.innerWidth <= 724 && navLinks.style.display !== "none") {
    navLinks.style.display = "none";
  }
});
