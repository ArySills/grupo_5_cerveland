 window.addEventListener("load", function(){

let form = document.querySelector("form.form-container")

form.addEventListener("submit", (e) => {
let ulErrors = document.querySelector('div.errors ul');     
ulErrors.innerHTML = "";

    let errors = [];

    let firstName = document.querySelector("#firstName");
    let lastName = document.querySelector("#lastName");
    let userEmail = document.querySelector("#userEmail");
    let expresion1 = /\w+@\w+\.+[a-z]/;
    let userPassword = document.querySelector("#userPassword");
    let profileImage = document.querySelector("#profileImage");
    let expresion2= /\.(jpg|png|gif)$/i;


   //nombre y apellido 
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
    //email
    if(userEmail.value.trim() == ''){
        errors.push('El campo email es obligatorio');
    }else if (!expresion1.test(userEmail)){
        errors.push('Debes ingresar un email válido');
    }
      //password
      if(userPassword.value.trim() == ''){
        errors.push('La contraseña es obligatoria');
    } else if(userPassword.value.length < 8){
        errors.push('La contraseña debe tener al menos 8 caracteres');
    }
    if(errors.length > 0){
        e.preventDefault();

        for (let i=0; i < errors.length; i++){
            ulErrors.innerHTML += "<li>" + errors[i] + "</li>"
        }
    } 
      //imagen

      if (!expresion2.test(profileImage.name)){
        errors.push('El archivo a adjuntar no es una imagen');
      }else {
        alert('Imagen cargada')                
    }
}) 
}
)