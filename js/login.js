/**CLASS */

class Usuario {
    constructor(id, nombreUsuario, contrasenia, mail) {
        this._id = id;
        this._nombreUsuario = nombreUsuario;
        this._contrasenia = contrasenia;
        this._mai = mail;
    }
}

/**ARRAY VARIBLES */

let listaUsuarios = [
    new Usuario(111, "admin", "admin", "admin@gamil"),
    new Usuario(222, "Cesar", "123", "cesar@gamil"),
    new Usuario(333, "Beto", "147", "beto@gamil")
]

/**MAIN */
let btnLogin = document.querySelector("#btnLogin")

let pMensaje = document.querySelector("main .mensajeError");

document.addEventListener("DOMContentLoaded", () => {

    /**Si no existe la lista de usuarios en Local Storage se creo y recarga la página, caso contrario se actualiza la varible local */
    let listaLoSto=JSON.parse(localStorage.getItem("Usuarios")) ?? localStorage.setItem("Usuarios", JSON.stringify(listaUsuarios));    
    listaUsuarios=listaLoSto ?? location.reload();
    
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

/**FUNCIONES */


