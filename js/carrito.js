
/**VARIABLES */
let listaProductoCarrito=JSON.parse(localStorage.getItem("Carrito"));
let aCerrarSess=document.querySelector("#cerrSes");
let usuarioLogeado;

verificarUsuario();

renderizarProductosCarrito(listaProductoCarrito);

/**FUNCIONES */
function renderizarProductosCarrito(productos)
{
    let secProductosCarrito=document.querySelector(".productosComprados");

    let productoDeUsuario=productos.filter((ele)=>ele._idUsuario===usuarioLogeado._id)
    
    productoDeUsuario.forEach(element => {

        let divPro=document.createElement("div");
        divPro.classList.add("productoCarrito");

        let divImgPro=document.createElement("div")
        divImgPro.classList.add("imgProCarrito");
    
        let imgPro=document.createElement("img");
        imgPro.setAttribute("alt","imgProductoCarrito");

        let divInfoPro=document.createElement("div");
        divInfoPro.classList.add("infoProCarrito");
        divInfoPro.innerHTML=`<strong>${element._nombreProducto}</strong>
                              <strong>$${element._precio}</strong> `;
        let inputCantiPro=document.createElement("input");
        inputCantiPro.setAttribute("type","number")
        inputCantiPro.setAttribute("value","1");

        let btnEliminar=document.createElement("button");
        btnEliminar.classList.add("eliminarProducto");
        btnEliminar.innerText="Eliminar";

        let btnEditar=document.createElement("button");
        btnEditar.classList.add("editarProducto");
        btnEditar.innerHTML="Editar";

        divImgPro.append(imgPro);
        divPro.append(divImgPro,divInfoPro,inputCantiPro,btnEliminar,btnEditar);
        secProductosCarrito.append(divPro);

    });
}
function verificarUsuario()
{
    if(localStorage.getItem("usuarioLogeado")===null)
    {
        /**Si no hay usuario logeado */
        let aside=document.querySelector(".aside");
        aside.setAttribute("style","display:none");
       
        let ul=document.querySelector(".header .nav ul");
        let li=document.createElement("li");
        let a=document.createElement("a");
        let liRegistrar=document.createElement("li");
        let aRegistrar=document.createElement("a");

        a.setAttribute("href","/pages/login.html");
        a.setAttribute("target","_black");
        a.innerText="Login";
        aRegistrar.setAttribute("href","/pages/registrar.html");
        aRegistrar.setAttribute("target","_black");
        aRegistrar.innerText="Registrar"
        li.append(a);
        liRegistrar.append(aRegistrar);
        ul.append(li,liRegistrar);
        
        console.log("Sin usuario logeado");
    }
    else{
        usuarioLogeado=JSON.parse(localStorage.getItem("usuarioLogeado"));
        let nomUs=document.querySelector("#nombreUsuario");
        let idUs=document.querySelector("#idUsuario");
        let mailUs=document.querySelector("#maiUsuario");
        
        nomUs.innerHTML=usuarioLogeado._nombreUsuario;
        idUs.innerHTML=usuarioLogeado._id;
        mailUs.innerHTML=usuarioLogeado._mai;

    }

}

/**EVENTOS */
aCerrarSess.addEventListener("click",()=>{
    localStorage.removeItem("usuarioLogeado");
    location.reload()
})