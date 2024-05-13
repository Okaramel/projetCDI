//Sidenav

const MenuButton = document.querySelector('.menu-bouton');
const burgerMenu = document.querySelector('.burger-menu');
MenuButton.onclick = function() {
    burgerMenu.classList.toggle('openNav');
}

// Bouton Flottant
const floatingbutton = document.querySelector('.floating-button');
const contenu = document.querySelector('.content');
floatingbutton.onclick = function() {
    contenu.classList.toggle('contentappear');
}

const title = document.getElementById("userName");
const email = document.getElementById("userEmail");

const fetchUser = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/connexion.html";
    return;
  }

  const response = await fetch(`http://127.0.0.1:3000/getMyProfile`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401) {
    window.location.href = "/connexion.html";
    return;
  } else if (response.status === 403) {
    window.location.href = "/connexion.html";
    return;
  }

  const user = await response.json();

  title.innerHTML = user.name;

  email.innerHTML = user.email;
};

fetchUser();