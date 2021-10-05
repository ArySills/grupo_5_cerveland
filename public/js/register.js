let errors = [];
let ulErrors = document.querySelector('div.errorsRegister ul');     
ulErrors.innerHTML = "";

window.addEventListener("load", function(){

let form = document.querySelector("form.form-container")
   
form.addEventListener("submit", (e) => {
    ulErrors.innerHTML = "";
errors = [];
validarExt(false);
    console.log (errors);
    let firstName = document.querySelector("#firstName");
    let lastName = document.querySelector("#lastName");
    let userName = document.querySelector("#userName");
    let userEmail = document.querySelector("#userEmail");
    let expresion1 = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,4}$/;
    let userPassword = document.querySelector("#userPassword");
    //let profileImage = document.querySelector("#profileImage");
    //let expresion2= /\.(jpg|png|gif)$/i; 
    let entrar = false;




   //nombre y apellido 
    if(firstName.value.trim() == '' || lastName.value.trim() == ''){
        errors.push('Los campos nombre y apellido son obligatorios');
    } else if(firstName.value.length < 2 || lastName.value.length < 2 ){
        errors.push('Los campos nombre y apellido deben tener al menos 2 caracteres');
    }
    if(errors.length > 0){
        e.preventDefault();

    
    } 
    //usuario
    if(userName.value.trim() == ''){
        errors.push('El campo usuario es obligatorio');
    } else if(userName.value.length < 2){
        errors.push('El campos usuario debe tener al menos 2 caracteres');
    }
    if(errors.length > 0){
        e.preventDefault();

    
    } 
    //email
    if(userEmail.value.trim() == ''){
        errors.push('El campo email es obligatorio');
    } else if (!expresion1.test(userEmail.value)){
        errors.push('El campo email debe ser válido')
        entrar = true
        }
        if(errors.length > 0){
            e.preventDefault();
    

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
   
 })
 })
 //imagen
 function validarExt(showErrors= true){            
    let profileImage = document.querySelector("#profileImage");
    let extPermitidas = /\.(jpg|png|gif|jpeg)$/i;      
    let archivoRuta = profileImage.value;

    if (!extPermitidas.exec(archivoRuta)){
        errors.push("El formato subido no está permitido");
        if (showErrors) {
            ulErrors.innerHTML += "<li>" + errors[0] + "</li>"; 
        }
        
    return false;
    }
} 