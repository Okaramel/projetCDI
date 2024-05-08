//Sidenav

const MenuButton = document.querySelector('.menu-bouton');
const burgerMenu = document.querySelector('.burger-menu');
MenuButton.onclick = function() {
    burgerMenu.classList.toggle('openNav');
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
        <img src = `+ card.image +` alt = "image de ` + card.name + `" >
        <h1>` + card.name +  `</h1>
        <h2>` + card.house +`</h2>
        <h2>` + card.role +`</h2>
        <h3>` + card.wand +`</h3>
        <h3>` + card.patronus +`</h3>
        <h3>` + card.blood +`</h3>
    </div>`;
    return card;
}


async function UpdateColor() {
    const persoColor = await displayCard();
    const response = await fetch('/Color', {
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