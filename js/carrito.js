
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

    cantProCr.innerText = cantidad ?? 0;
    cantidadPro.innerText = cantidad ?? 0;
    totalFinal.innerText = total ?? 0;

    renderizarProductosCarrito(productUsu);
}

function renderizarProductosCarrito(productos) {

    let secProductosCarrito = document.querySelector(".productosComprados");
    secProductosCarrito.innerHTML = " ";

    productos.forEach(element => {

        let { _stock: stockProducto } = listaProductos.find((ele) => ele._id === element._id);

        let divPro = document.createElement("div");
        divPro.classList.add("cardConteProCarr");

        let divImgPro = document.createElement("div")
        divImgPro.classList.add("imgProCarrito");

        let imgPro = document.createElement("img");
        imgPro.setAttribute("alt", "imgProductoCarrito");
        imgPro.setAttribute("src", element._urlImg);

        let divInfoPro = document.createElement("div");
        divInfoPro.classList.add("cardinfoProCarrito");
        divInfoPro.innerHTML = `<strong>${element._descripcion}</strong>`;

        let divPrecio = document.createElement("div");
        divPrecio.classList.add("cardPrecioTotal")
        divPrecio.innerHTML = `<strong>P.U $${element._precioUnidad}</strong> 
                                <strong>Total $${element._total}</strong>`

        let divCantidad = document.createElement("div");
        divCantidad.classList.add("cardCantidadProductos")

        let inputCantiPro = document.createElement("input");
        inputCantiPro.setAttribute("type", "number");
        inputCantiPro.setAttribute("min", "1");
        inputCantiPro.setAttribute("max", stockProducto);
        inputCantiPro.setAttribute("value", `${element._cantidad}`);

        let cantidDisp = document.createElement("strong");
        cantidDisp.innerText = `${stockProducto} disponibles`;

        inputCantiPro.addEventListener("change", ({ e, target: { value } }) => {

            (value >= 1 && value <= stockProducto) && cambiarCantidadProducto(element._id, value)
        });

        inputCantiPro.addEventListener("keypress", (e) => {

            exprNum.test(e.key) || e.preventDefault();
        })

        inputCantiPro.addEventListener("keyup", ({ target: { value } }) => {
            value > stockProducto ?
                (cantidDisp.innerText = `Podes comprar hasta ${stockProducto} u`,
                    cantidDisp.setAttribute("style", "color:red"))
                : ((value === "" || value === "0") ?
                    (cantidDisp.innerText = `Puede comprar desde 1 u`,
                        cantidDisp.setAttribute("style", "color:red")
                    )
                    : (cantidDisp.innerText = `${stockProducto} disponible`,
                        cantidDisp.setAttribute("style", "color:black"),
                        cambiarCantidadProducto(element._id, value))
                );

        })

        let btnEliminar = document.createElement("a");
        btnEliminar.setAttribute("href", "#")
        btnEliminar.classList.add("eliminarProducto");
        btnEliminar.innerText = "Eliminar";

        /**EVENTOS */
        btnEliminar.addEventListener("click", () => {
            eleminarProducto(element._id);
        });


        divImgPro.append(imgPro);
        divInfoPro.append(btnEliminar);
        divCantidad.append(inputCantiPro, cantidDisp);
        divPro.append(divImgPro, divInfoPro, divCantidad, divPrecio);
        secProductosCarrito.append(divPro);

    });
}

function cargarPerfil() {

    /** Si existe un usuario logeado se mostrará la función vistaUsuarioLogeado(), caso contrario se 
     * mostrará la función vistaUsuarioNoLogeado()
     */

    usuarioLogeado = JSON.parse(sessionStorage.getItem("usuarioLogeado")) ?? vistaUsuarioNoLogeado();

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

    imgUsur.setAttribute("src", usuarioLogeado._url);

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
    sessionStorage.removeItem("usuarioLogeado");
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
     * Verificamos que no existan campos en blanco o incorrectos
     * Recorremos los todos los productos.
     * Verificamos que productos tiene el usuario.
     * Si se encuentra el producto se restara al stock la cantidad a comprar de dicho producto.
     */
    let inputCantidad = document.querySelectorAll(".cardCantidadProductos input");

    let estado = true;
    inputCantidad.forEach(({ value }) => {
        (value === "" || value === "0") && (estado = false)
    });

    (estado) ?
        (listaProductos = listaProductos.map((element) => {
            let proUsu = productUsu.find((ele) => ele._id === element._id);
            (proUsu !== undefined) && (element._stock -= proUsu._cantidad);
            return element;
        }),

            localStorage.setItem("Productos", JSON.stringify(listaProductos)),
            vaciarCarrito(),
            Swal.fire({
                title: "Filicitaciones",
                text: "Gracias por comprar en Buy Tech",
                icon: "success"
            }))
        : (
            Swal.fire({
                icon: "error",
                text: "Por favor complete los campos con valores validos!",
            })
        )

});