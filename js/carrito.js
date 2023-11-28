
/**VARIABLES */
let listaProductoCarrito = JSON.parse(localStorage.getItem("Carrito"));
let listaProductos = JSON.parse(localStorage.getItem("Productos"));
let btnLimpiarCarrito = document.querySelector(".vaciarCarrito");
let btnFinalizarComprar = document.querySelector(".finalizarCompra");
let productUsu;


document.addEventListener("DOMContentLoaded", () => {
    cargarPerfil();
    cargarProductoDeUsuario();

});

/**FUNCIONES */

function cargarProductoDeUsuario() {
    /**
     * Se crea un arrya con los productos del usaurio logeado.
     * 
     */

    let cantidadPro = document.querySelector("#cantidadProductos");

    let totalFinal = document.querySelector("#total");

    productUsu = listaProductoCarrito.filter((ele) => ele._idUsuario === (usuarioLogeado?._id ?? -1))

    let { total, cantidad } = productUsu.reduce((acc, ele) => {
        (acc["total"]) ? acc["total"] += ele._total : acc["total"] = ele._total;
        (acc["cantidad"]) ? acc["cantidad"] += parseInt(ele._cantidad) : acc["cantidad"] = parseInt(ele._cantidad);
        return acc;
    }, {});

    cantProCr.innerText=cantidad?? 0;
    cantidadPro.innerText = cantidad ?? 0;
    totalFinal.innerText = total ?? 0;

    renderizarProductosCarrito(productUsu);
}

function renderizarProductosCarrito(productos) {
   
    let secProductosCarrito = document.querySelector(".productosComprados");
    secProductosCarrito.innerHTML = " ";

    productos.forEach(element => {


        console.log(element);

        let { _stock: stockProducto } = listaProductos.find((ele) => ele._id === element._id);

        let divPro = document.createElement("div");
        divPro.classList.add("productoCarrito");

        let divImgPro = document.createElement("div")
        divImgPro.classList.add("imgProCarrito");

        let imgPro = document.createElement("img");
        imgPro.setAttribute("alt", "imgProductoCarrito");
        imgPro.setAttribute("src",element._urlImg);
        let divInfoPro = document.createElement("div");
        divInfoPro.classList.add("infoProCarrito");
        divInfoPro.innerHTML = `<strong>${element._descripcion}</strong>
                              <strong>P.U $${element._precioUnidad}</strong> 
                              <strong>Total $${element._total}</strong>`;
        let inputCantiPro = document.createElement("input");
        inputCantiPro.setAttribute("type", "number");
        inputCantiPro.setAttribute("pattern", "^[0-9]+");
        inputCantiPro.setAttribute("min", "1");
        inputCantiPro.setAttribute("max", stockProducto);
        inputCantiPro.setAttribute("value", `${element._cantidad}`);

        inputCantiPro.addEventListener("change", ({ target: { value } }) => {
            cambiarCantidadProducto(element._id, value);
        });
        let cantidDisp = document.createElement("strong");
        cantidDisp.innerText = `${stockProducto} disponibles`;

        let btnEliminar = document.createElement("button");
        btnEliminar.classList.add("eliminarProducto");
        btnEliminar.innerText = "Eliminar";

        /**EVENTOS */
        btnEliminar.addEventListener("click", () => {
            eleminarProducto(element._id);
        });

        divImgPro.append(imgPro);
        divPro.append(divImgPro, divInfoPro, inputCantiPro, cantidDisp, btnEliminar);
        secProductosCarrito.append(divPro);

    });
}

function cargarPerfil() {

    /** Si existe un usuario logeado se mostrará la función vistaUsuarioLogeado(), caso contrario se 
     * mostrará la función vistaUsuarioNoLogeado()
     */

    usuarioLogeado = JSON.parse(localStorage.getItem("usuarioLogeado")) ?? vistaUsuarioNoLogeado();

    (usuarioLogeado) && vistaUsuarioLogeado();

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

function cambiarCantidadProducto(idProducto, nuevoCantidad) {
    /**
     * Se modifica la cantida y el total  del producto. Luego se actualizar el valor en el local 
     * Storage y por ultimo se cargar los productos nuevamente.
     */

    listaProductoCarrito = listaProductoCarrito.map((ele) => {
        (ele._id === idProducto && ele._idUsuario === usuarioLogeado._id) && (ele._cantidad = nuevoCantidad, ele._total = ele._precioUnidad * nuevoCantidad);
        return ele;
    });
    localStorage.setItem("Carrito", JSON.stringify(listaProductoCarrito));

    cargarProductoDeUsuario();

}

function eleminarProducto(idProducto) {
    /**
     * Eliminamos el producto seleccionado del usuario loegado
     */
    let indice = listaProductoCarrito.findIndex((ele) => ele._id === idProducto && ele._idUsuario === usuarioLogeado._id);
    listaProductoCarrito.splice(indice, 1);
    localStorage.setItem("Carrito", JSON.stringify(listaProductoCarrito));
    cargarProductoDeUsuario();
}

function vaciarCarrito() {
    listaProductoCarrito = listaProductoCarrito.filter((ele) => ele._idUsuario !== usuarioLogeado._id);
    localStorage.setItem("Carrito", JSON.stringify(listaProductoCarrito));
    cargarProductoDeUsuario();
}
/**EVENTOS */
aCerrarSesseion.addEventListener("click", () => {
    localStorage.removeItem("usuarioLogeado");
    location.reload()
})

btnLimpiarCarrito.addEventListener("click", () => {
    /**
     * Eliminamos todos los productos que tengan el id del usuario logeado actualment
     */
    vaciarCarrito()
});

btnFinalizarComprar.addEventListener("click", () => {

    /**
     * Recorremos los todos los productos.
     * Verificamos que productos tiene el usuario.
     * Si se encuentra el producto se restara al stock la cantidad a comprar de dicho producto.
     */

    listaProductos = listaProductos.map((element) => {

        let proUsu = productUsu.find((ele) => ele._id === element._id);
        (proUsu !== undefined) && (element._stock -= proUsu._cantidad);
        return element;
    });

    localStorage.setItem("Productos", JSON.stringify(listaProductos));
    
    vaciarCarrito();
});