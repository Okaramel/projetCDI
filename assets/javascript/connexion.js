//Sidenav

const MenuButton = document.querySelector('.menu-bouton');
const burgerMenu = document.querySelector('.burger-menu');
MenuButton.onclick = function() {
    burgerMenu.classList.toggle('openNav');
}


const formulaire = document.getElementById("formulaire");
const email = document.getElementById("email");
const password = document.getElementById("password");

formulaire.addEventListener("submit", async (event) => {
  event.preventDefault();

  const response = await fetch("http://127.0.0.1:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value,
    }),
  });

  const result = await response.json();

  const token = result.token;

  localStorage.setItem("token", token);

  if (token) {
    window.location.href = "pageprofil.html";
    return;
  }
});