
let btnLogin=document.querySelector("#btnLogin")

/**Recuperamos los usuarios registrados */
let listaUsuarios=JSON.parse(localStorage.getItem("Usuarios"));

let pMensaje=document.querySelector("main .mensajeError");

/**EVENTOS */
btnLogin.addEventListener("click",(e)=>{
    e.preventDefault();

    let nombreUsuario=document.querySelector("#nombreUsuario").value;
    let contraseniaUsuario=document.querySelector("#contraseniaUsuaria").value;

    let usuario=listaUsuarios.find((usu)=>usu._contrasenia===contraseniaUsuario && usu._nombreUsuario===nombreUsuario);
    
    if(usuario!==undefined)
    {
        localStorage.setItem("usuarioLogeado",JSON.stringify(usuario));
        window.location.href = "../index.html";
    }
    else{
        pMensaje.innerHTML="El usuario no existe";
    }
    
});

/**FUNCIONES */


