
/**VARIBLES */
let listaUsuarios=JSON.parse(localStorage.getItem("Usuarios"))

/**MAIN */
let btnLogin = document.querySelector("#btnLogin")

let pMensaje = document.querySelector("main .mensajeError");

document.addEventListener("DOMContentLoaded", () => {

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


    (usuario)?(localStorage.setItem("usuarioLogeado", JSON.stringify(usuario)),
                window.location.href = "../index.html"):pMensaje.innerHTML = "El usuario no existe";;


});


