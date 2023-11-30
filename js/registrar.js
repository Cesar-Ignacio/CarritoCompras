
/**Variables */
let btnGuardar = document.querySelector("#guardarUsuario");
let listaUsuarios = JSON.parse(localStorage.getItem("Usuarios"));
let inputID = document.querySelector("#idUsuario");
let inputEmail = document.querySelector("#mailUsuario");
let inputNombUsu = document.querySelector("#nombreUsuario");
let inputPassUsu = document.querySelector("#passUsuario");


/**Main */
document.addEventListener("DOMContentLoaded", () => {
   
    inputID.setAttribute("value",proximoId());    //cargarValores();
})

/**FUNCIONES */

function validarDatos() {
    let meErMa = document.querySelector(".mensajeErrorMail");
    let meErNo = document.querySelector(".mensajeErrorNom");
    let meErPa = document.querySelector(".mensajeErrorPass");
    let estado = false;
    let con = 0;
    (expreMail.test(inputEmail.value)) ? (meErMa.innerText = "", con++) : meErMa.innerText = "(formaro valido xxx@xxx.xx)";
    (inputNombUsu.value.length >= 4) ? (meErNo.innerText = "", con++) : meErNo.innerText = "(4 caractes como minimo)";
    (inputPassUsu.value.length >= 4) ? (meErPa.innerText = "", con++) : meErPa.innerText = "(Por su seguridad el password debe contener mas de 4 caracteres)";
    (con === 3) && (estado = true);
    return estado;

}

function limpiarCampos()
{
    inputID.setAttribute("value",proximoId());
    inputEmail.value="";
    inputNombUsu.value="";
    inputPassUsu.value="";

}

function proximoId()
{
    let { _id: proximoID } = JSON.parse(localStorage.getItem("Usuarios")).pop();
    return proximoID+1;
}

/**EVENTOS */

btnGuardar.addEventListener("click", (e) => {
    e.preventDefault();


    validarDatos() && (
        listaUsuarios.push(new Usuario(proximoId(),inputNombUsu.value, inputPassUsu.value, inputEmail.value)),
        localStorage.setItem("Usuarios", JSON.stringify(listaUsuarios)),
        Swal.fire({
            title: `Bienvenido ${inputNombUsu.value}`,
            icon: "info",
            html: `
            Ya cuentas con un usuario y puedes iniciar sesión ahora mismo,
            <a href="/pages/login.html">login</a>
             `,
             showCloseButton: true,
             showCancelButton: false,
             focusConfirm: false,
             showConfirmButton: false,    
        }),
        limpiarCampos()
    );
        
   

});

inputNombUsu.addEventListener("keypress", (e) => {
    // El nombre de usuario no puede tener espacios ni números
    (expSolLet.test(e.key)) || e.preventDefault();
});

inputPassUsu.addEventListener("keypress", (e) => {
    // La contaseña no puede tener espacios
    (e.keyCode === 32) && (e.preventDefault())
})



