
/** CLASS */
class Producto{
    constructor(id,nombreProducto,descripcion,precio,stock)
    {
        this._id=id;
        this._nombreProducto=nombreProducto;
        this._descripcion=descripcion;
        this._precio=precio;
        this._stock=stock;
        this._estado=true
    }
}
class Carrito{
    constructor(idUsuario,id,nombreProducto,descripcion,cantidad,precio)
    {
        this._idUsuario=idUsuario;
        this._id=id;
        this._nombreProducto=nombreProducto;
        this._descripcion=descripcion;
        this._cantidad=cantidad;
        this._precio=precio;
        this._estado=true;
    }
}

class Usuario{
    constructor(id,nombreUsuario,contrasenia,mail)
    {
        this._id=id;
        this._nombreUsuario=nombreUsuario;
        this._contrasenia=contrasenia;
        this._mai=mail;
    }
}
/** ARRAY  VARIABLES*/

let listaProductos=[
    new Producto(1,"Auricular Sm","Marca sm con tecnologia ultra sention",500,5),
    new Producto(2,"TV SMART","Marca sm con tecnologia ultra sention",100,0),
    new Producto(3,"Parlante XR","Marca sm con tecnologia ultra sention",80,8),
    new Producto(4,"Licuador XX","Marca sm con tecnologia ultra sention",57,4),
    new Producto(5,"Cafetera","Marca sm con tecnologia ultra sention",200,4),
]

let listaUsuarios=[
    new Usuario(111,"admin","admin","admin@gamil"),
    new Usuario(222,"Cesar","123","cesar@gamil"),
    new Usuario(333,"Beto","147","beto@gamil")
]

let listaProductoCarrito=[];

let aCerrarSess=document.querySelector("#cerrSes");

let usuarioLogeado;



/** MAIN */

document.addEventListener("DOMContentLoaded",()=>{
    
    cargarUsuarios();
    verificarUsuario();
    verificarProductos();
    verificarCarrito();

});

renderizarProductos(listaProductos);

/** FUNCIONES */
function agregerProCarrito(producto)
{

    if(usuarioLogeado!==undefined)
    {
        let proCarr=new Carrito(usuarioLogeado._id,producto._id,producto._nombreProducto,producto._descripcion,1,producto._precio);
        listaProductoCarrito.push(proCarr);
        localStorage.setItem("Carrito",JSON.stringify(listaProductoCarrito));
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Se agrego el producto al carrito",
            showConfirmButton: false,
            timer: 1500
          });
    }
    else{
        Swal.fire({
            text: "No puede agregar productos al carrito si no esta logeado",
            title: "No existe usuario",
            icon: "error"
          });
    }

}

function renderizarProductos(productos)
{
    let secProductos=document.querySelector(".main .productos")
    
    productos.forEach(element => {
        
        let divProducto=document.createElement("div");
        divProducto.classList.add("producto")
        
        let divImg=document.createElement("div");
        divImg.classList.add("imgProducto");

        let img=document.createElement("img");
        img.setAttribute("alt","imgProducto");

        let divInfoPro=document.createElement("div");
        divInfoPro.classList.add("infoProducto");
        divInfoPro.innerHTML=` <Strong>${element._nombreProducto}</Strong>
                                <p>${element._descripcion}</p>
                                <strong>$${element._precio}</strong>`;
        
        let btn=document.createElement("button");
        btn.classList.add("agregarCarrito");
        btn.innerText="Agregar";

        btn.addEventListener("click",()=>{
           agregerProCarrito(element);
        });

        divInfoPro.appendChild(btn);
        divImg.appendChild(img);
        divProducto.append(divImg,divInfoPro);
        secProductos.append(divProducto);
    });
}

function verificarProductos()
{
    if(localStorage.getItem("Productos")===null)
    {
        /**Si no existe se crea */
        localStorage.setItem("Productos",JSON.stringify(listaProductos));
        console.log("se creo valor Productos en el LocalStorage");
    }
    else{
        /**Si existe, actualizamos el array*/
        listaProductos=JSON.parse(localStorage.getItem("Productos"));
        console.log("se actualizo el array (listaProductos)")
    }
}

function verificarCarrito()
{
    if(localStorage.getItem("Carrito")===null)
    {
        /** Si no existe se crea */
        localStorage.setItem("Carrito",JSON.stringify(listaProductoCarrito));
        console.log("Se crea el valor Carrito");
    }
    else{
        listaProductoCarrito=JSON.parse(localStorage.getItem("Carrito"));
        console.log("se actualizo el array (listaProductoCarrito)")
    }
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

function cargarUsuarios() {
    (localStorage.getItem("Usuarios")===null)?
    localStorage.setItem("Usuarios",JSON.stringify(listaUsuarios)):
    listaUsuarios=JSON.parse(localStorage.getItem("Usuarios"));
}

/**EVENTOS */
aCerrarSess.addEventListener("click",()=>{
    localStorage.removeItem("usuarioLogeado");
    location.reload()
})