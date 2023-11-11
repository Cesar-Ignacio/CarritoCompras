
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

/** ARRAY */

let listaProductos=[
    new Producto(1,"Auricular Sm","Marca sm con tecnologia ultra sention",500,5),
    new Producto(1,"TV SMART","Marca sm con tecnologia ultra sention",100,0),
    new Producto(1,"Parlante XR","Marca sm con tecnologia ultra sention",80,8),
    new Producto(1,"Licuador XX","Marca sm con tecnologia ultra sention",57,4),
    new Producto(1,"Cafetera","Marca sm con tecnologia ultra sention",200,4),
]

/** MAIN */

renderizarProductos(listaProductos);

/** FUNCIONES */
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

        divInfoPro.appendChild(btn);
        divImg.appendChild(img);
        divProducto.append(divImg,divInfoPro);
        secProductos.append(divProducto);
    });
}