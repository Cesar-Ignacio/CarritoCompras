
/**CLASS */
class Usuario{
    constructor(dni,nombreUsuario,contrasenia,estado)
    {
        this.dni=dni;
        this.nombreUsuario=nombreUsuario;
        this.contrasenia=contrasenia;
        this.estado=estado;
    }
}

/**ARRAYS */
let listaUsuarios=[
    new Usuario(14523698,"admin","111",true),
    new Usuario(54789632,"Juan","juan1",true),
    new Usuario(12458796,"Cesar","cesar123",true)
];

/**VARIABLES GLOBALES */
let btnLogin=document.querySelector("form button")
let usuarioLogeado;
/** INICIO */
cargarUsuarios();

/**EVENTOS */
btnLogin.addEventListener("click",(e)=>{
    e.preventDefault();
    let nombreUsuario=document.querySelector("#nombreUsuario").value;
    let contraseniaUsuario=document.querySelector("#contraseniaUsuaria").value;
    let pMensaje=document.querySelector(".mensaje");
    
    /**Obtenemos el array de usuario del STORAGE */
    listaUsuarios=JSON.parse(localStorage.getItem("usuarios")); 

    let estado=listaUsuarios.some((ele)=>ele.nombreUsuario===nombreUsuario && ele.contrasenia===contraseniaUsuario);

    if(estado)
    {
        /**EL USUARIO EXISTE */
        usuarioLogeado=listaUsuarios.find((ele)=>ele.nombreUsuario===nombreUsuario && ele.contrasenia===contraseniaUsuario);
        localStorage.setItem("usuarioLogeado",JSON.stringify(usuarioLogeado));
        window.location="catalogo.html";
        
    }
    else{
        pMensaje.innerText="No se encontro el usario";
    }


});

/**FUNCIONES */

function cargarUsuarios()
{
    /**CARGA DE USUARIOS AL LOCALSTORAGE */
    localStorage.setItem("usuarios",JSON.stringify(listaUsuarios));
}

