
/** CLASS */
class Producto {
    constructor(id, nombreProducto, descripcion, precio, stock) {
        this._id = id;
        this._nombreProducto = nombreProducto;
        this._descripcion = descripcion;
        this._precio = precio;
        this._stock = stock;
        this._estado = true
    }
}
class Carrito {
    constructor(idUsuario, id, nombreProducto, descripcion, cantidad, precio) {
        this._idUsuario = idUsuario;
        this._id = id;
        this._nombreProducto = nombreProducto;
        this._descripcion = descripcion;
        this._cantidad = cantidad;
        this._precio = precio;
        this._estado = true;
    }
}


/** ARRAY  VARIABLES*/

let listaProductos = [
    new Producto(1, "Auricular Sm", "Marca sm con tecnologia ultra sention", 500, 5),
    new Producto(2, "TV SMART", "Marca sm con tecnologia ultra sention", 100, 0),
    new Producto(3, "Parlante XR", "Marca sm con tecnologia ultra sention", 80, 8),
    new Producto(4, "Licuador XX", "Marca sm con tecnologia ultra sention", 57, 4),
    new Producto(5, "Cafetera", "Marca sm con tecnologia ultra sention", 200, 4),
]
let listaProductoCarrito = [];

let aCerrarSesseion = document.querySelector("#cerrSes");

let usuarioLogeado;



/** MAIN */

document.addEventListener("DOMContentLoaded", () => {

    cargarPerfil();
    cargarProductos();
    verificarCarrito();
    renderizarProductos(listaProductos);
});



/** FUNCIONES */
function agregerProCarrito(producto) {

    if (usuarioLogeado !== undefined) {
        let proCarr = new Carrito(usuarioLogeado._id, producto._id, producto._nombreProducto, producto._descripcion, 1, producto._precio);
        listaProductoCarrito.push(proCarr);
        localStorage.setItem("Carrito", JSON.stringify(listaProductoCarrito));
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Se agrego el producto al carrito",
            showConfirmButton: false,
            timer: 1500
        });
    }
    else {
        Swal.fire({
            text: "No puede agregar productos al carrito si no esta logeado",
            title: "No existe usuario",
            icon: "error"
        });
    }

}

function renderizarProductos(productos) {
    let secProductos = document.querySelector(".main .productos")

    productos.forEach(element => {

        let divProducto = document.createElement("div");
        divProducto.classList.add("producto")

        let divImg = document.createElement("div");
        divImg.classList.add("imgProducto");

        let img = document.createElement("img");
        img.setAttribute("alt", "imgProducto");

        let divInfoPro = document.createElement("div");
        divInfoPro.classList.add("infoProducto");
        divInfoPro.innerHTML = ` <Strong>${element._nombreProducto}</Strong>
                                <p>${element._descripcion}</p>
                                <strong>$${element._precio}</strong>`;

        let btn = document.createElement("button");
        btn.classList.add("agregarCarrito");
        btn.innerText = "Agregar";

        btn.addEventListener("click", () => {
            agregerProCarrito(element);
        });

        divInfoPro.appendChild(btn);
        divImg.appendChild(img);
        divProducto.append(divImg, divInfoPro);
        secProductos.append(divProducto);
    });
}

function cargarProductos() {
    /**Si no existe el valor Productos en el Local Storage lo creamos, caso contrario actualizamos la viable local*/
    let listaProLs=JSON.parse(localStorage.getItem("Productos")) ?? localStorage.setItem("Productos",JSON.stringify(listaProductos));
    listaProLs===undefined ?console.log("ADD Productos LocalStorage"):listaProductos=listaProLs;console.log("Productos Actualizados del LocalStorage");
}

function verificarCarrito() {
    if (localStorage.getItem("Carrito") === null) {
        /** Si no existe se crea */
        localStorage.setItem("Carrito", JSON.stringify(listaProductoCarrito));
        console.log("Se crea el valor Carrito");
    }
    else {
        listaProductoCarrito = JSON.parse(localStorage.getItem("Carrito"));
        console.log("se actualizo el array (listaProductoCarrito)")
    }
}

function cargarPerfil() {

    /** Si existe un usuario logeado se mostrará la función vistaUsuarioLogeado(), caso contrario se 
     * mostrará la función vistaUsuarioNoLogeado()
     */

    usuarioLogeado=JSON.parse(localStorage.getItem("usuarioLogeado")) ?? vistaUsuarioNoLogeado();

    (usuarioLogeado!==undefined)&&vistaUsuarioLogeado();

}

function vistaUsuarioNoLogeado() {
    /** Si el usuario no esta logeado no se mostrara el aside y se agregará en el header
     * los enlaces login y registrar
     */
    let aside = document.querySelector(".aside");
    aside.setAttribute("style", "display:none");

    let ul = document.querySelector(".header .nav ul");
    let li = document.createElement("li");
    let a = document.createElement("a");
    let liRegistrar = document.createElement("li");
    let aRegistrar = document.createElement("a");

    a.setAttribute("href", "/pages/login.html");
    //a.setAttribute("target", "_black");
    a.innerText = "Login";
    aRegistrar.setAttribute("href", "/pages/registrar.html");
    aRegistrar.setAttribute("target", "_black");
    aRegistrar.innerText = "Registrar"
    li.append(a);
    liRegistrar.append(aRegistrar);
    ul.append(li, liRegistrar);

    console.log("Ningun usuario logeado");
}

function vistaUsuarioLogeado() {

    /** Si mostrará el elemento aside con los datos del usuario logeado*/
    let nomUs = document.querySelector("#nombreUsuario");
    let idUs = document.querySelector("#idUsuario");
    let mailUs = document.querySelector("#maiUsuario");

    nomUs.innerHTML = usuarioLogeado._nombreUsuario;
    idUs.innerHTML = usuarioLogeado._id;
    mailUs.innerHTML = usuarioLogeado._mai;

    console.log(`Usuario logeado ${usuarioLogeado._nombreUsuario}`);
}

/**EVENTOS */
aCerrarSesseion.addEventListener("click", () => {
    localStorage.removeItem("usuarioLogeado");
    location.reload()
})