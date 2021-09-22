 window.addEventListener("load", function(){

let form = document.querySelector("form.form-container")

form.addEventListener("submit", (e) => {
let ulErrors = document.querySelector('div.errors ul');     
ulErrors.innerHTML = "";

    let errors = [];

    let firstName = document.querySelector("#firstName")
    let lastName = document.querySelector("#lastName")
    let userEmail = document.querySelector("#userEmail")
    
    if(firstName.value.trim() == '' || lastName.value.trim() == ''){
        errors.push('Los campos nombre y apellido son obligatorios');
    } else if(firstName.value.length < 2 || lastName.value.length < 2 ){
        errors.push('Los campos nombre y apellido deben tener al menos 2 caracteres');
    }
    if(errors.length > 0){
        e.preventDefault();

        for (let i=0; i < errors.length; i++){
            ulErrors.innerHTML += "<li>" + errors[i] + "</li>"
        }
    } 
    if(userEmail.value.trim() == ''){
        errors.push('El campo email es obligatorio');
    } else if (userEmail.value )











    


}) 
}
)