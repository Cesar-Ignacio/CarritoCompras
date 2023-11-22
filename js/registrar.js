/**Clases */
class Usuario {
    constructor(id,nombreUsuario, contrasenia, mail) {
        this._id =id;
        this._nombreUsuario = nombreUsuario;
        this._contrasenia = contrasenia;
        this._mai = mail;
    }
}

/**Variables */
let {_id:proximoID}=JSON.parse(localStorage.getItem("Usuarios")).pop();
let btnGuardar=document.querySelector("#guardarUsuario");
let listaUsuarios=JSON.parse(localStorage.getItem("Usuarios"));


/**Main */
document.addEventListener("DOMContentLoaded",()=>{
    
    let inputID=document.querySelector("#idUsuario");
    inputID.setAttribute("value",proximoID+1);
    
})

/**EVENTOS */

btnGuardar.addEventListener("click",(e)=>{
    e.preventDefault();
    let inputEmail=document.querySelector("#mailUsuario").value;
    let inputNombUsu=document.querySelector("#nombreUsuario").value;
    let inputPassUsu=document.querySelector("#passUsuario").value;

    listaUsuarios.push(new Usuario(proximoID+1,inputNombUsu,inputPassUsu,inputEmail))
    localStorage.setItem("Usuarios",JSON.stringify(listaUsuarios));

    window.location.href="../index.html";

});