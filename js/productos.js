
/** CLASS */
class Producto {
    constructor(id,nombreProducto,categoria, descripcion, precio, stock) {
        this._id = id;
        this._nombreProducto = nombreProducto;
        this._categoria=categoria;
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
        this._precioUnidad = precio;
        this._total=precio;
        this._estado = true;
    }
}
class Usuario {
    constructor(id,nombreUsuario, contrasenia, mail) {
        this._id =id;
        this._nombreUsuario = nombreUsuario;
        this._contrasenia = contrasenia;
        this._mai = mail;
    }
}
/** ARRAY  VARIABLES*/

let listaProductos = [
    new Producto(1, "Auricular Sm","Auriculares", "Marca sm con tecnologia ultra sention", 500, 5),
    new Producto(2, "TV SMART","Telivisores","Marca sm con tecnologia ultra sention", 100, 0),
    new Producto(3, "Parlante XR","Audio", "Marca sm con tecnologia ultra sention", 80, 8),
    new Producto(4, "Licuador XX","Electrodomesticos", "Marca sm con tecnologia ultra sention", 57, 4),
    new Producto(5, "Cafetera","Electrodomesticos", "Marca sm con tecnologia ultra sention", 200, 4),
]
let listaUsuarios = [
    new Usuario(101,"admin", "admin", "admin@gamil"),
    new Usuario(102,"Cesar", "123", "cesar@gamil"),
    new Usuario(103,"Beto", "147", "beto@gamil")
]
let listaProductoCarrito = [];

let aCerrarSesseion = document.querySelector("#cerrSes");
let inputBuscar=document.querySelector("#buscarProducto");
let selCategoria=document.querySelector("#categoriaProducto");
let usuarioLogeado;

/** MAIN */

document.addEventListener("DOMContentLoaded", () => {

    cargarUsuarios();
    cargarPerfil();
    cargarProductos();
    cargarCarrito();
    renderizarProductos(listaProductos);
});



/** FUNCIONES */

function verificarProducto(producto)
{
    /**
     * Se valida que el nuevo producto no exista en el carrito del usuario logeado
     */
    let indice=listaProductoCarrito.findIndex((ele)=>ele._id===producto._id && ele._idUsuario===usuarioLogeado._id);

    indice<0?(listaProductoCarrito.push(new Carrito(usuarioLogeado._id, producto._id, producto._nombreProducto, producto._descripcion, 1, producto._precio)), 
    localStorage.setItem("Carrito", JSON.stringify(listaProductoCarrito)),
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Se agrego el producto al carrito",
        showConfirmButton: false,
        timer: 1500
    })): Swal.fire({
        title: "El producto ya existe en tu carrito",
        icon: "info",
        showConfirmButton: false,
        timer: 1500});
}

function agregerProCarrito(producto) {
    /**
     * Si no existe un usuario se mostrar una leyenda, caso contrario se agregara un nuevo producto al array "listaProductoCarrito"
     * (un objeto carrito) y luego se actualizará en el localStorage
     */    
    (usuarioLogeado === undefined) ? Swal.fire({
        text: "No puede agregar productos al carrito si no esta logeado",
        title: "No existe usuario",
        icon: "error"
    }): verificarProducto(producto);

}

function renderizarProductos(productos) {

    /**
     * Recorre el array productos y lo muestra en html
     */

    let secProductos = document.querySelector(".main .productos")

    secProductos.innerHTML="";
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
    /**Si no existe el valor Productos en el Local Storage lo creamos, caso contrario actualizamos la variable local*/
    let listaProLs = JSON.parse(localStorage.getItem("Productos")) ?? localStorage.setItem("Productos", JSON.stringify(listaProductos));
    listaProLs === undefined ? console.log("ADD Productos LocalStorage") : listaProductos = listaProLs;
}

function cargarCarrito() {
    /** Si no existe el valor carrito se crea local storage, caso 
     * contrario se actulaliza la variable local*/
    let listCarritoLS = JSON.parse(localStorage.getItem("Carrito")) ?? localStorage.setItem("Carrito", JSON.stringify(listaProductoCarrito));
    (listCarritoLS === undefined) ? console.log("ADD Carrito LocalStorage") : listaProductoCarrito = listCarritoLS;
}

function cargarPerfil() {

    /** Si existe un usuario logeado se mostrará la función vistaUsuarioLogeado(), caso contrario se 
     * mostrará la función vistaUsuarioNoLogeado()
     */

    usuarioLogeado = JSON.parse(localStorage.getItem("usuarioLogeado")) ?? vistaUsuarioNoLogeado();

    (usuarioLogeado !== undefined) && vistaUsuarioLogeado();

}
function cargarUsuarios()
{
    JSON.parse(localStorage.getItem("Usuarios")) ?? localStorage.setItem("Usuarios", JSON.stringify(listaUsuarios));    
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

/**EVENTOS */
aCerrarSesseion.addEventListener("click", () => {
    localStorage.removeItem("usuarioLogeado");
    location.reload()
})

inputBuscar.addEventListener("keyup",({target:{value}})=>{
    renderizarProductos(listaProductos.filter((ele)=>ele._nombreProducto.toUpperCase().includes(value.toUpperCase())));
});

selCategoria.addEventListener("click",({target:{value}})=>{
    renderizarProductos(listaProductos.filter((ele)=>ele._categoria.toUpperCase().includes(value.toUpperCase())))
});