
//Fonction qui va chercher le lien de l'API pour prendre ses données.
function fetchpersos() {
    return fetch('https://hp-api.lainocs.fr/characters').then((response) => response.json())
}


//Fonction asynchrone pour que cette fonction se lance en même temps que la fonction d'au-dessus
async function displaypersos() {
    //await va pouvoir aider à débloquer la fonction juste au-dessus
    const persos = await fetchpersos()
    //On prend depuis notre fichier HTML notre boîte avec l'ID "booster"
    const cartes = document.getElementById("booster")

    //Pour chaque personne, on va prendre leurs données sur l'API
    persos.forEach((data) => {
        //Pour chaque personnage, nous allons leur créer une boîte
        const contenu = document.createElement("div")
        //Et avec cette boîte nous allons lui assigner une classe 
        contenu.classList.add("card")
        //Dans cette boîte nous allons ajouter les données que nous voulons depuis l'API 
        contenu.innerHTML = `
        <img class="photo" src="${data.image}" alt="${data.name}"/>
        <button class="boutoncarte"><a class="title" href="card.html?id=${data.slug}">${data.name}</a></button>`
        //Nous allons désormais mettre notre contenu dans la boîte que nous avons créer dans le fichier HTML
        cartes.appendChild(contenu)
    });
}
//Désormais, nous demandons à ce que notre fonction se lance
displaypersos()

//Rechercher dynamique
const searchInput = document.querySelector('#search');
const searchResult = document.querySelector(".results");

let dataArray;

async function getCharacters() {
    const res = await fetch ("https://hp-api.lainocs.fr/characters")

    const { results } = await res.json()
    dataArray = orderList(results)
    createCharactersList(dataArray)
}
function orderList(database) {
    const orderedData = database.sort((a,b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
        }

        if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
        }
    })

    return orderedData; 
}

function createCharactersList(characterslist) {
    characterslist.forEach(character => {
        const listItem = document.createElement("div");
        listItem.setAttribute("class", "card")

        listItem.innerHTML =
        `<img class="photo" src="${data.image}" alt="${data.name}"/>
        <button class="boutoncarte"><a class="title" href="card.html?id=${data.slug}">${data.name}</a></button>`

        searchResult.appendChild(listItem);
    })
}

searchInput.addEventListener("input", filterData)

function filterData(e) {
    searchResult.innerHTML = "";

    const searchedString = e.target.value.toLowerCase();

    const filteredArr = dataArray.filter(el => el.name.toLowerCase().includes(searchedString))

    createCharactersList(filteredArr)
}







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