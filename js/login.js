/**CLASS */


/**VARIBLES */
let listaUsuarios=JSON.parse(localStorage.getItem("Usuarios"))

/**MAIN */
let btnLogin = document.querySelector("#btnLogin")

let pMensaje = document.querySelector("main .mensajeError");

document.addEventListener("DOMContentLoaded", () => {

    /**Si no existe la lista de usuarios en Local Storage se creo y recarga la página, caso contrario se actualiza la varible local */
        
    console.log("Usuarios logeados :"+listaUsuarios.length );
    console.log(listaUsuarios);
    
});

/**FUNCIONES */


/**EVENTOS */
btnLogin.addEventListener("click", (e) => {
    e.preventDefault();

    let nombreUsuario = document.querySelector("#nombreUsuario").value;
    let contraseniaUsuario = document.querySelector("#contraseniaUsuaria").value;

    let usuario = listaUsuarios.find((usu) => usu._contrasenia === contraseniaUsuario && usu._nombreUsuario === nombreUsuario);

    if (usuario !== undefined) {
        localStorage.setItem("usuarioLogeado", JSON.stringify(usuario));
        window.location.href = "../index.html";
    }
    else {
        pMensaje.innerHTML = "El usuario no existe";
    }

});


