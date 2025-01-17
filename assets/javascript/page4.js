let form = document.querySelector('form')

form.addEventListener('submit', function (event) {
    event.preventDefault()

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


    let successContainer = document.querySelector('message-success')
    successContainer.classList.remove('visible')

    if (email.classList.contains('success') &&
       password.classList.contains('success')
    ) {
        successContainer.classList.add('visible')
    }
})