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

  title.innerText = user.user.name;
  console.log(user);

  email.innerText = user.user.email;
};

fetchUser();

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

//Booster
// Event delegation 
document.addEventListener('click', (e) => {

  const target = e.target;
  
  if (target.matches('.close')) {
    // Actions
    document.querySelector('.newcards').remove();
  } 

})
const bouton = document.getElementById('bouton-booster')
bouton.addEventListener('click', async() => {
  try {
    const API = await fetch('http://localhost:3000/user/booster/open', {
      method : "POST",
      headers: {
        "Content-Type":"application/json",
        Authorization:`Berear ${localStorage.getItem('token')}`
      }
    })
    if (API.ok) {
      //Destruscturation d'objets
      const { table, booster } = await API.json();
    
      displayTable(table);
    }
  } catch (error) {
    alert(error.message)
  }
})

function displayTable(cards) {
    const displayboosters = document.createElement('div');
    displayboosters.classList.add('newcards');
    const cardsList = document.createElement('cardsList');
    cardsList.classList.add('cardsList');
    cards.forEach(card => {
      const carte = document.createElement('div');
      carte.classList.add('card');
      carte.innerHTML = `
      <img class="photo" src="${card.image}" alt="${card.name}"/>
      <h3>${card.name}</h3>`
      cardsList.appendChild(carte);
    });
    displayboosters.appendChild(cardsList);
    const closeboosters = document.createElement('button');
    closeboosters.innerText = `CLOSE`
    closeboosters.classList.add('close');
    displayboosters.appendChild(closeboosters);
    document.querySelector('body').appendChild(displayboosters);
}

async function fetchUserCards() {
  try {
    const response = await fetch('http://localhost:3000/user/cards', {
      method: "GET",
      headers : {
        "Content-Type":"application/json",
        Authorization:`Berear ${localStorage.getItem('token')}`
      }
    })
    if (response.ok) {
      //Destruscturation d'objets
      const { cards, total } = await response.json();
    
      await displayCollection(cards);
    }
  } catch (error) {
    alert(error.message)
  }
}

async function displayCollection(cards) {
  try {
    const response = await fetch('https://hp-api.lainocs.fr/characters');
    const cardAPI = await response.json();

    cards.forEach(card => {
      const cardElement = cardAPI.find(el => el.id === card.cardId)
      const carte = document.createElement('div');
      carte.classList.add('card');
      carte.innerHTML = `<span class="quantite">
      ${card.quantity}
      </span>
      <img class="photo" src="${cardElement.image}" alt="${cardElement.name}"/>
      <h3>${cardElement.name}</h3>`
      document.getElementById('collection').appendChild(carte);
    })
  } catch (error) {
    
  }
}

fetchUserCards();