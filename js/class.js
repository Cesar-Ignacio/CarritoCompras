/** CLASS */
class Producto {
    constructor(id, nombreProducto, categoria, descripcion, precio, stock, img) {
        this._id = id;
        this._nombreProducto = nombreProducto;
        this._categoria = categoria;
        this._descripcion = descripcion;
        this._precio = precio;
        this._stock = stock;
        this._urlImg = img;
        this._estado = true
    }
}
class Carrito {
    constructor(idUsuario, id, nombreProducto, descripcion, cantidad, precio, img) {
        this._idUsuario = idUsuario;
        this._id = id;
        this._nombreProducto = nombreProducto;
        this._descripcion = descripcion;
        this._cantidad = cantidad;
        this._precioUnidad = precio;
        this._total = precio;
        this._urlImg = img;
        this._estado = true;
    }
}
class Usuario {
    constructor(id, nombreUsuario, contrasenia, mail) {
        this._id = id;
        this._nombreUsuario = nombreUsuario;
        this._contrasenia = contrasenia;
        this._mai = mail;
    }
}