
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
        <img src="${data.image}" alt="${data.name}"/>
        <h1><button class="boutoucarte"><a href="card.html?id=${data.slug}">${data.name}</a></button></h1>`
        //Nous allons désormais mettre notre contenu dans la boîte que nous avons créer dans le fichier HTML
        cartes.appendChild(contenu)
    });

    let house = data.house;
    switch (house) {
      case "Gryffindor":
        cardElement.classList.add("gry");
        break;
      case "Slytherin":
        cardElement.classList.add("sly");
        break;
      case "Hufflepuff":
        cardElement.classList.add("huf");
        break;
      case "Ravenclaw":
        cardElement.classList.add("rav");
        break;
      default:
        cardElement.classList.add("nh");
    }
}
//Désormais, nous demandons à ce que notre fonction se lance
displaypersos()