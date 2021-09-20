window.addEventListener('load', function()
{ 
let form = document.querySelector('form.form-container')

form.addEventListener('submit', function(e){

    let errors = [];

    let firstName = document.querySelector("input.form-container-firstName")
    if(firstName.value == ''){
        errors.push('El campo nombre es obligatorio');
    } else if(firstName.value.length < 2){
        errors.push('El campo nombre debe tener al menos 2 caracteres');
    }
    if(errors.length > 0){
        e.preventDefault();
        let ulErrors = document.querySelector('div.errors ul');
        for (let i=0; i < errors.length; i++){
            ulErrors.innerHTML += "<li>" + errors[i] + "</li>"
        }
    }
})
}
)