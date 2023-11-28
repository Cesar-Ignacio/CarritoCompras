

/** ARRAY  VARIABLES*/

let listaProductos = []
let listaUsuarios = []
let listaProductoCarrito = [];

let inputBuscar = document.querySelector("#buscarProducto");
let selCategoria = document.querySelector("#categoriaProducto");

/** MAIN */

document.addEventListener("DOMContentLoaded", () => {
   
    obtenerProJson().then(res=>{
        res.forEach(producto=>{
            listaProductos.push(new Producto(producto.id,producto.categoria,producto.descripcion,producto.precio,producto.stock,producto.url));
        })
        cargarProductos();
        renderizarProductos(listaProductos);
    })
    cargarUsuarios();
    cargarPerfil();
    cargarCarrito();
   
});

/** FUNCIONES */
function verificarProducto(producto) {
    /**
     * Se valida que el nuevo producto no exista en el carrito del usuario logeado
     */
    console.log(producto);
    let indice = listaProductoCarrito.findIndex((ele) => ele._id === producto._id && ele._idUsuario === usuarioLogeado._id);

    indice < 0 ? (listaProductoCarrito.push(new Carrito(usuarioLogeado._id, producto._id,producto._descripcion,1,producto._precio, producto._urlImg)),
        localStorage.setItem("Carrito", JSON.stringify(listaProductoCarrito)),
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Se agrego el producto al carrito",
            showConfirmButton: false,
            timer: 1500
        })) : Swal.fire({
            title: "El producto ya existe en tu carrito",
            icon: "info",
            showConfirmButton: false,
            timer: 1500
        });
}

function agregerProCarrito(producto) {
    /**
     * Si no existe un usuario se mostrar una leyenda, caso contrario se agregara un nuevo producto al array "listaProductoCarrito"
     * (un objeto carrito) y luego se actualizará en el localStorage
     */

    (usuarioLogeado) ? verificarProducto(producto) : Swal.fire({
        text: "No puede agregar productos al carrito si no esta logeado",
        title: "No existe usuario",
        icon: "error"
    });

}

function renderizarProductos(productos) {

    /**
     * Recorre el array productos y lo muestra en html
     */

    let secProductos = document.querySelector(".main .productos")

    secProductos.innerHTML = "";

    productos.forEach(element => {

        /**
         * Si el usuario es admin se mostrará 'vistaAdmin', caso contrario ´vistaUsuario´
         */
        (usuarioLogeado?._id === 101) ? vistaAdmin(element, secProductos) : vistaUsuario(element, secProductos);


    });
}

function cargarProductos() {
    /**Si no existe el valor Productos en el Local Storage lo creamos, caso contrario actualizamos la variable local*/
    let listaProLs = JSON.parse(localStorage.getItem("Productos")) ?? localStorage.setItem("Productos", JSON.stringify(listaProductos));
    (listaProLs) ? listaProductos = listaProLs : console.log("ADD Productos LocalStorage");
    
}

function cargarCarrito() {
    /** Si no existe el valor carrito se crea local storage, caso 
     * contrario se actulaliza la variable local*/
    let listCarritoLS = JSON.parse(localStorage.getItem("Carrito")) ?? localStorage.setItem("Carrito", JSON.stringify(listaProductoCarrito));
    (listCarritoLS) ? listaProductoCarrito = listCarritoLS : console.log("ADD Carrito LocalStorage");
}

function cargarPerfil() {

    /** Si existe un usuario logeado se mostrará la función vistaUsuarioLogeado(), caso contrario se 
     * mostrará la función vistaUsuarioNoLogeado()
     */
    usuarioLogeado = JSON.parse(localStorage.getItem("usuarioLogeado")) ?? vistaUsuarioNoLogeado();

    (usuarioLogeado) && vistaUsuarioLogeado();
}

function cargarUsuarios() {
    /**
     * Si no existe el valor 'Usuarios' en Local Storage se crea uno con los 
     * usuarios del archivo json 
     */
    JSON.parse(localStorage.getItem("Usuarios")) ?? obtenerUsuJson();
 
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

function vistaUsuario(element, secProductos) {
    let divProducto = document.createElement("div");
    divProducto.classList.add("producto")

    let divImg = document.createElement("div");
    divImg.classList.add("imgProducto");

    let img = document.createElement("img");
    img.setAttribute("alt", "imgProducto");
    img.setAttribute("src", element._urlImg);

    let divInfoPro = document.createElement("div");
    divInfoPro.classList.add("infoProducto");
    divInfoPro.innerHTML = `<p>${element._descripcion}</p>
                            <strong>$${element._precio}</strong>
                            <strong>Disponible ${element._stock || "sin stock"}</strong>`;

    let btn = document.createElement("button");
    btn.classList.add("agregarCarrito");
    btn.innerText = "Agregar";

    element._stock || btn.setAttribute("style", "display:none")

    btn.addEventListener("click", () => {
        agregerProCarrito(element);
    });


    divInfoPro.appendChild(btn);
    divImg.appendChild(img);
    divProducto.append(divImg, divInfoPro);
    secProductos.append(divProducto);
}

function vistaAdmin(element, secProductos) {

    let divProducto = document.createElement("div");
    divProducto.classList.add("producto");

    divProducto.innerHTML = `<label for="">
                            ID
                            <input type="text" value="${element._id}" readonly>        
                            </label>`;

    let labelNomPro = document.createElement("label");
    labelNomPro.innerText = "Nombre Producto";
    labelNomPro.setAttribute("for", "nombreProducto");

    let inputNomPro = document.createElement("input");
    inputNomPro.setAttribute("type", "text");
    inputNomPro.setAttribute("id", "nombreProducto");
    inputNomPro.setAttribute("value", element._nombreProducto);

    let labelDesPro = document.createElement("label");
    labelDesPro.innerText = "Descripción";
    labelDesPro.setAttribute("for", "descripcionProducto");

    let texArDesPro = document.createElement("textarea");
    texArDesPro.setAttribute("id", "descripcionProducto");
    texArDesPro.innerText = element._descripcion;

    let labelCatPro = document.createElement("label");
    labelCatPro.innerText = "Categoría";
    labelCatPro.setAttribute("for", "categoriaProducto");

    let inputCatPro = document.createElement("input");
    inputCatPro.setAttribute("type", "text");
    inputCatPro.setAttribute("id", "categoriaProducto");
    inputCatPro.setAttribute("value", element._categoria);

    let labelPrePro = document.createElement("label");
    labelPrePro.innerText = "Precio";
    labelPrePro.setAttribute("for", "precioProducto");

    let inputPrePro = document.createElement("input");
    inputPrePro.setAttribute("type", "number");
    inputPrePro.setAttribute("id", "precioProducto");
    inputPrePro.setAttribute("value", element._precio);

    let labelStoPro = document.createElement("label");
    labelStoPro.innerText = "Stock";
    labelStoPro.setAttribute("for", "stockProducto");

    let inputStoPro = document.createElement("input");
    inputStoPro.setAttribute("type", "text");
    inputStoPro.setAttribute("id", "stockProducto");
    inputStoPro.setAttribute("value", element._stock);

    let btActualizar = document.createElement("button");
    btActualizar.setAttribute("id", "btnActualizar");
    btActualizar.innerText = "Editar";

    btActualizar.addEventListener("click", () => {
        actualizarProducto(element, inputStoPro.value, inputNomPro.value, inputPrePro.value, texArDesPro.value, inputCatPro.value);
    });

    labelNomPro.append(inputNomPro);
    labelDesPro.append(texArDesPro);
    labelCatPro.append(inputCatPro);
    labelPrePro.append(inputPrePro);
    labelStoPro.append(inputStoPro);
    divProducto.append(labelNomPro, labelDesPro, labelCatPro, labelPrePro, labelStoPro, btActualizar);
    secProductos.append(divProducto);

}

function actualizarProducto(element, nStock, nNombrePro, nPrecio, nDescr, nCategoria) {
    listaProductos = listaProductos.map((ele) => {
        (ele._id === element._id) && (ele._stock = parseInt(nStock), ele._nombreProducto = nNombrePro, ele._precio = parseInt(nPrecio),
            ele._descripcion = nDescr, ele._categoria = nCategoria);
        return ele;
    });

    Swal.fire({
        position: "center",
        icon: "success",
        title: `Se modifico el producto con ID:${element._id}`,
        showConfirmButton: false,
        timer: 1500
    });

    localStorage.setItem("Productos", JSON.stringify(listaProductos));
}

async function obtenerUsuJson()
{
    let response= await fetch("/datos/usuarios.json")
    let listaObjUsu= await response.json();
    listaObjUsu.forEach(us=>{
        listaUsuarios.push(new Usuario(us.id,us.nombreUsuario,us.contrasenia,us.mai))
    })
    localStorage.setItem("Usuarios", JSON.stringify(listaUsuarios))
}

function obtenerProJson()
{
    return new Promise((resolve,reject)=>{
        fetch("/datos/productos.json")
        .then(res=>res.json())
        .then(data=>resolve(data))
    })
}



/**EVENTOS */
aCerrarSesseion.addEventListener("click", () => {
    localStorage.removeItem("usuarioLogeado");
    location.reload()
})

inputBuscar.addEventListener("keyup", ({ target: { value } }) => {
    renderizarProductos(listaProductos.filter((ele) => ele._descripcion.toUpperCase().includes(value.toUpperCase())));
});

selCategoria.addEventListener("click", ({ target: { value } }) => {
    renderizarProductos(listaProductos.filter((ele) => ele._categoria.toUpperCase().includes(value.toUpperCase())))
});