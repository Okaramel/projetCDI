document.querySelectorAll('.filtre').forEach(function(button) {
    button.addEventListener('click', function () {
        var filtre = this.getAttribute ('data-filter')
        var carte = document.querySelectorAll ('.cartes')

        carte.forEach(function(cartes) {
            if (filtre === 'tous' || cartes.classList.contains(filtre)) {
                cartes.classList.remove('hidden')
            } else {
                cartes.classList.add('hidden')
            }
        })
    })
})

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
