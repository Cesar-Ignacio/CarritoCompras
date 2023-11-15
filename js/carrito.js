
/**VARIABLES */
let listaProductoCarrito=JSON.parse(localStorage.getItem("Carrito"));
let aCerrarSess=document.querySelector("#cerrSes");
let usuarioLogeado;
let productUsu;

document.addEventListener("DOMContentLoaded",()=>{
    cargarPerfil();
    cargarProductoDeUsuario();
});

/**FUNCIONES */

function cargarProductoDeUsuario()
{   
    /**
     * Se crea un arrya con los productos del usaurio logeado.
     * 
     */

    let cantidadPro=document.querySelector("#cantidadProductos");

    let totalFinal=document.querySelector("#total");

    productUsu=listaProductoCarrito.filter((ele)=>ele._idUsuario===(usuarioLogeado?._id?? -1))
    
    let {total,cantidad}=productUsu.reduce((acc,ele)=>{
      (acc["total"])?acc["total"]+=ele._total:acc["total"]=ele._total; 
      (acc["cantidad"])?acc["cantidad"]+=parseInt(ele._cantidad):acc["cantidad"]=parseInt(ele._cantidad);
        return acc;
    },{});

    cantidadPro.innerText=cantidad?? 0;
    totalFinal.innerText=total??0;

    renderizarProductosCarrito(productUsu);
}   

function renderizarProductosCarrito(productos)
{
    let secProductosCarrito=document.querySelector(".productosComprados");
    secProductosCarrito.innerHTML=" ";
    productos.forEach(element => {

        let divPro=document.createElement("div");
        divPro.classList.add("productoCarrito");

        let divImgPro=document.createElement("div")
        divImgPro.classList.add("imgProCarrito");
    
        let imgPro=document.createElement("img");
        imgPro.setAttribute("alt","imgProductoCarrito");

        let divInfoPro=document.createElement("div");
        divInfoPro.classList.add("infoProCarrito");
        divInfoPro.innerHTML=`<strong>${element._nombreProducto}</strong>
                              <strong>Precio Unidad $${element._precioUnidad}</strong> 
                              <strong>Total $${element._total}</strong>`;
        let inputCantiPro=document.createElement("input");
        inputCantiPro.setAttribute("type","number")
        inputCantiPro.setAttribute("value",`${element._cantidad}`);

        inputCantiPro.addEventListener("change",({target:{value}})=>{
            cambiarCantidadProducto(element._id,value);
        });

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

function cargarPerfil() {

    /** Si existe un usuario logeado se mostrará la función vistaUsuarioLogeado(), caso contrario se 
     * mostrará la función vistaUsuarioNoLogeado()
     */

    usuarioLogeado = JSON.parse(localStorage.getItem("usuarioLogeado")) ?? vistaUsuarioNoLogeado();

    (usuarioLogeado !== undefined) && vistaUsuarioLogeado();

}

function vistaUsuarioNoLogeado() {
    /** Si el usuario no esta logeado no se mostrara el aside y se agregará en el header
     * los enlaces login y registrar
     */
    let aside = document.querySelector(".aside");
    aside.setAttribute("style", "display:none");

    let ul = document.querySelector(".header .nav ul");
    let liLogin = document.createElement("li");
    let aLogin = document.createElement("a");
    let liRegistrar = document.createElement("li");
    let aRegistrar = document.createElement("a");

    aLogin.setAttribute("href", "/pages/login.html");
    aLogin.innerText = "Login";
    aRegistrar.setAttribute("href", "/pages/registrar.html");
    aRegistrar.innerText = "Registrar"

    liLogin.append(aLogin);
    liRegistrar.append(aRegistrar);
    ul.append(liLogin, liRegistrar);

    console.log("Ningun usuario logeado");
}

function vistaUsuarioLogeado() {

    /** Si mostrará el elemento aside con los datos del usuario logeado*/
    let divInfoUsu = document.querySelector(".informacionUsuario ul")
    divInfoUsu.innerHTML = `<li>${usuarioLogeado._id}</li>
                            <li>${usuarioLogeado._nombreUsuario}</li>
                            <li>${usuarioLogeado._mai}</li>`;
    console.log(`Usuario logeado ${usuarioLogeado._nombreUsuario}`);
}

function cambiarCantidadProducto(idProducto,nuevoCantidad)
{
    /**
     * Se creo un nuevo arrya con la cantida, total modificada del producto, luego se modifica el valor en el local 
     * Storage y por ultimo se cargar los productos nuevamente.
     */

    let nuevoLista=productUsu.map((ele)=>{
        ele._id===idProducto&&(ele._cantidad=nuevoCantidad, ele._total=ele._precioUnidad*nuevoCantidad);
        return ele;
    });
    localStorage.setItem("Carrito",JSON.stringify(nuevoLista));
    
    cargarProductoDeUsuario();

}
/**EVENTOS */
aCerrarSess.addEventListener("click",()=>{
    localStorage.removeItem("usuarioLogeado");
    location.reload()
})