
let p=document.createElement("p");
let us=JSON.parse(localStorage.getItem("usuarioLogeado"));
p.innerHTML=us.nombreUsuario;
let body=document.querySelector('body');
body.append(p);
