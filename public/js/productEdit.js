window.addEventListener("load", function(){

let form = document.querySelector("form.form-container-create-product")

form.addEventListener("submit", (e) => {
        
    let ulErrors = document.querySelector('div.errors ul');     
    ulErrors.innerHTML = "";
        
        let errors = [];
    
        let productName = document.querySelector("#productName");
        let productImage = document.querySelector("#productImage");
        let productDescription = document.querySelector("#productDescription");
        let expresion2= /\.(jpg|jpeg|png|gif)$/i;

    
            //nombre producto
    if(productName.value.trim() == ''){
        errors.push('El campo nombre es obligatorio');
    } else if(productName.value.length < 5){
        errors.push('El campo nombre debe tener al menos 5 caracteres');
    }

            //descripción producto
     if(productDescription.value.trim().length < 20){
        errors.push('El campo descripción debe tener al menos 20 caracteres');

     }
    if(errors.length > 0){
        e.preventDefault();
    
        for (let i=0; i < errors.length; i++){
                ulErrors.innerHTML += "<li>" + errors[i] + "</li>"
        }
        } 

})
})