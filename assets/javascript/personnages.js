
//Fonction qui va chercher le lien de l'API pour prendre ses données.


//Fonction asynchrone pour que cette fonction se lance en même temps que la fonction d'au-dessus
async function displaypersos() {
    //await va pouvoir aider à débloquer la fonction juste au-dessus
    const persos = await fetchData();
    //On prend depuis notre fichier HTML notre boîte avec l'ID "booster"
    const cartes = document.getElementById("booster")

    //Pour chaque personne, on va prendre leurs données sur l'API
    persos.forEach((data) => {
        //Pour chaque personnage, nous allons leur créer une boîte
        const contenu = document.createElement("div");
        //Et avec cette boîte nous allons lui assigner une classe 
        contenu.classList.add("card");
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
const searchInput = document.getElementById('searchInput');
const DataList = document.getElementById('booster');
let cartes = [];
async function fetchData() {
    try {
        const response = await fetch('https://hp-api.onrender.com/api/characters');
        cartes = await response.json();
        return cartes;
    } catch (error) {
        console.error('Error fetching data :', error);
    }
}

function displayData(cartes) {
    DataList.innerHTML = '';
    cartes.forEach (item => {
        DataList.innerHTML += `
        <div class="card">
        <img class="photo" src="${item.image}" alt="${item.name}"/>
        <button class="boutoncarte"><a class="title" href="card.html?id=${item.slug}">${item.name}</a></button></div>`;
    })
}

searchInput.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredData = cartes.filter(item => item.name.toLowerCase().includes(searchTerm));
    displayData(filteredData);
})


//Système de filtres 
const filtreBouton = document.querySelectorAll('input[type=radio][name="maison"]');

filtreBouton.forEach((bouton) => {
    bouton.addEventListener('change', async() =>{
        const apiData = await fetchData();
        houseChoice = bouton.id                                     
        let triHouse = []                                           
        if (houseChoice == "all"){                                  
            triHouse = apiData
            displayTriHouse(triHouse)
        }
        else if (houseChoice == "none"){                            
            apiData.forEach((chara => {
                if (!chara.house || chara.house.trim() === ""){     
                    triHouse.push(chara)
                }
            }))
        }
        else{                                                           
            apiData.forEach((chara) => {
                if (chara.house == houseChoice){
                    triHouse.push(chara)
                }
            })
            displayTriHouse(triHouse)                               
        }  
    })
})
const collection = document.getElementById('booster');
async function displayTriHouse(triHouse){
    collection.innerHTML = ''
    triHouse.forEach((element => {
        collection.innerHTML += `
        <div class="card">
        <img class="photo" src="${element.image}" alt="${element.name}"/>
        <button class="boutoncarte"><a class="title" href="card.html?id=${element.slug}">${element.name}</a></button></div>`;
    })) 
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