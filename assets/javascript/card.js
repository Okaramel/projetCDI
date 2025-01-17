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

async function fetchCard() {
    let url = new URLSearchParams(window.location.search);
    let slug = url.get('id');
    const response = await fetch('https://hp-api.lainocs.fr/characters/' + slug);
    const data = await response.json();
    return data; 
}


  async function displayCard() {
    let profil = document.querySelector('.profilCard');
    let card = await fetchCard();
    profil.innerHTML = '';
    profil.innerHTML += `
    <div class="cardUnique">
    <div class="img column">
        <img src = `+ card.image +` alt = "image de ` + card.name + `" ></div>
        <div class="identite column">
        <ul>
            <li><h1> Identité : ` + card.name +  `</h1></li>
            <li><h2> Maison : ` + card.house +`</h2></li>
            <li><h2> Rôle : ` + card.role +`</h2></li>
            <li><h3> Baguette : ` + card.wand +`</h3></li>
            <li><h3> Patronus : ` + card.patronus +`</h3></li>
            <li><h3> Sang : ` + card.blood +`</h3></li>
        </ul>
        </div>
    </div>`;
    return card;
}


async function UpdateColor() {
    const persoColor = await displayCard();
    const response = await fetch('/house', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            house: persoColor.house 
        }),
    });
    const data = await response.json();
}

displayCard();
UpdateColor();