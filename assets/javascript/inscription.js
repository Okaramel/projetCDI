//Sidenav

const MenuButton = document.querySelector('.menu-bouton');
const burgerMenu = document.querySelector('.burger-menu');
MenuButton.onclick = function() {
    burgerMenu.classList.toggle('openNav');
}


//Inscription
let form = document.querySelector('form')

    let errorContainer = document.querySelector('.message-error')
    let errorList = document.querySelector('.message-error ul')

    errorList.innerHTML = ""
    errorContainer.classList.remove('visible')

    let email = document.querySelector('#email')
    if (email.value === '') {
        errorContainer.classList.add('visible')
        email.classList.remove('success')

        let err = document.createElement('li')
        err.innerText = 'Le champ email ne peut pas être vide'

        errorList.appendChild(err)
    } else {
        email.classList.add('success')
    }

    let pseudo = document.querySelector('#pseudo')
    if (pseudo.value.length < 6 ) {
        errorContainer.classList.add('visible')
        pseudo.classList.remove('success')

        let err = document.createElement('li')
        err.innerText = 'Le pseudo ne peut pas être inférieur à 6 caractères.'

        errorList.appendChild(err)
    } else {
        pseudo.classList.add('success')
    }

    let passCheck = new RegExp(
        "^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[-+_!@#$%^&*.,?]).+$");

    let password = document.querySelector('#password')
    if (password.value.length < 10 || passCheck.test(password) ) {
        errorContainer.classList.add('visible')
        password.classList.remove('success')

        let err = document.createElement('li')
        err.innerText = 'Le mot de passe ne peut pas être inférieur à 10 caractères, doit contenir au moins une majuscule, un chiffre et un caractère spécial.'

        errorList.appendChild(err)
    } else {
        password.classList.add('success')
    }

    let passwordConfirm = document.querySelector('#password2')
    if (passwordConfirm.value !== password.value || passwordConfirm.value === '') {
        errorContainer.classList.add('visible')
        passwordConfirm.classList.remove('success')

        let err = document.createElement('li')
        err.innerText = 'Les deux mots de passe doivent être identiques.'

        errorList.appendChild(err)
    } else {
        passwordConfirm.classList.add('success')
    }

    let successContainer = document.querySelector('.message-success')
    successContainer.classList.remove('visible')

    if (email.classList.contains('success') &&
       pseudo.classList.contains('success') &&
       password.classList.contains('success') &&
       passwordConfirm.classList.contains('success')
       
    ) {
        successContainer.classList.add('visible')
    }

    const emailsignup = document.getElementById("email");
    const pseudosignup = document.getElementById("pseudo");
    const passwordsignup = document.getElementById("password");
    const password2signup = document.getElementById("password2");
    
form.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (password2signup.value !== passwordsignup.value) {
            alert("Passwords do not match");
            return;
        }
    
    const response = await fetch("http://127.0.0.1:3000/users", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            email: emailsignup.value,
            name: pseudosignup.value,
            password: passwordsignup.value,
            }),
    });
        const data = await response.json();
});