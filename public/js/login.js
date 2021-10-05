/*window.addEventListener("load", function () {

    let form = document.querySelector("form.form-container-inicioSesion")

    form.addEventListener("submit", (e) => {
        let ulErrors = document.querySelector('div.errors ul');
        ulErrors.innerHTML = "";

        let errors = [];

        let userEmailLogin = document.querySelector("#userEmailLogin")
        let userPasswordLogin = document.querySelector("#userPasswordLogin")

        if (userEmailLogin.value.trim() == '') {
            errors.push('El campo email es obligatorio');
        }

        else if (!userEmailLogin.value.includes('@')){
        errors.push('El campo email debe ser válido')
        }

        if(userPasswordLogin.value.trim() == ''){
            errors.push('El campo password es obligatorio');
        }
        if (errors.length > 0) {
            e.preventDefault();

            for (let i = 0; i < errors.length; i++) {
                ulErrors.innerHTML += "<li>" + errors[i] + "</li>"
            }
        }
    })
})*/