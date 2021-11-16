const priceHoddie = 1500;
const priceTshirt = 800;
const priceCap = 600;
let hoddieQty = 0;
let tshirtQty = 0;
let capQty = 0;
let prod1 = [];
let userList = [];
//active se activa cuando el usuario es ingresado
let active = 0;
class User {
    constructor(email, password) {
        this.userPass = password;
        this.userEmail = email;
    }
}
// lista de usuarios rgistrados
userList.push(new User("1@gmail.com", 1234));
userList.push(new User("2@gmail.com", 1234));
userList.push(new User("3@gmail.com", 1234));
class Product {
    constructor(type, price, quantity) {
        this.name = type;
        this.precio = parseInt(price);
        this.qty = quantity;
    }
}
function options() {
    let menu = 0;
    do {
        menu = prompt("Bieveni@ a IBASHO, ingresa una opcion del menu:"
            + "\n 1-Iniciar compra"
            + "\n 2-Ingresar");
        switch (menu) {
            case '1':
                addProducts();
                break;
            case '2':
                logIn();
                break;
            default:
                alert("no existe")

        }
    } while (menu != 1 && menu != 2);
}
//recibe la cantidad ingresada, devuelve la cantidad al new Product
function add(name) {
    let qty;
    do {
        qty = parseInt(prompt("Ingrese la cantidad deseada del producto"));
        console.log(qty);
        if (!isNaN(qty)) {
            if (qty == 1) {
                alert("Se agrego " + qty + " item del producto " + name + " a la canasta");
            } else {
                alert("Se agregaron " + qty + " items del producto " + name + " a la canasta");
            }
            return qty;
        }
    } while (isNaN(qty))
}
function addProducts() {
    let flag = 0;
    let option;
    let menu = 0;
    do {
        do {
            let option = prompt("Ingresa una item a agregar:"
                + "\n 1-Buzo"
                + "\n 2-Remera"
                + "\n 3-Gorra"
            );
            switch (option) {
                case '1':
                    prod1.push(new Product("Buzo", priceHoddie, add("Buzo")));
                    break;
                case '2':
                    prod1.push(new Product("Remera", priceTshirt, add("Remera")));
                    break;
                case '3':
                    prod1.push(new Product("Gorra", priceCap, add("Gorra")));
                    break;
                default:
                    alert("la opcion no es correcta");

            }
        } while (option == 1 || option == 2 || option == 3);

        do {
            menu = prompt("Ingrese una opcion"
                + "\n 1-Agregar un producto"
                + "\n 2-Finalizar Compra"
            );
            switch (menu) {
                case '1':
                    flag = 1;
                    break;
                case '2':
                    flag = 2;
                    if (active == 1) {
                        all();
                    } else {
                        alert("para finalizar la compra tendras que ingresar o crear una cuenta");
                        logIn();
                    }
                    break;
                default:
                    alert("la opcion no es correcta");
            }
        } while (menu != 1 && menu != 2);

    } while (flag == 1 && flag != 2);
}
// busca en todo el array los productos con el mismo nombre y suma las cantidades para tener una cantidad final
function find(nameProduct) {
    let finalQty = 0;
    const filtered = prod1.filter(producto => producto.name == nameProduct);
    for (const prod of filtered) {
        finalQty += prod.qty
    }
    if (finalQty != 0) {
        return finalQty;
    }
}
// muestra todos los productos agregados y el precio final si existe el array
function all() {
    let finalPrice = 0;
    if (prod1.length > 0) {
        console.log(prod1);
        hoddieQty = find("Buzo");
        if (hoddieQty > 0) {
            console.log("Cantidad de Buzos: " + hoddieQty + "\nPrecio de unidad: " + priceHoddie);
            finalPrice += hoddieQty * priceHoddie;
        }
        tshirtQty = find("Remera");
        if (tshirtQty > 0) {
            console.log("Cantidad de Remeras: " + tshirtQty + "\nPrecio de unidad: " + priceTshirt);
            finalPrice += tshirtQty * priceTshirt;
        }
        capQty = find("Gorra");
        if (capQty > 0) {
            console.log("Cantidad de Gorras: " + capQty + "\nPrecio de unidad: " + priceCap);
            finalPrice += capQty * priceCap;
        }
        if (active == 0) {
            alert("Para finalizar la compra ingresa a tu cuenta o registrate");
            logIn();
        } else {
            if (active == 1) {
                alert("Gracias por elegirnos" + "\nPrecio final: " + finalPrice);
                console.log("precio final: " + finalPrice);
            }
        }

    } else {
        alert("No se agregaron productos a la canasta");
    }
}
//log busca al usuario en el array de usuarios, si no existe lo crea y redirigue a la tienda
//si la tienda ya esta cargada muestra el total y finaliza la compra
function log() {
    console.log(userList);
    let flagUser = 0;
    let flagPass = 0;
    let i = 3;
    let email = prompt("Ingresa tu e-mail");
    for (const oneUser of userList) {
        if (oneUser.userEmail == email) {
            flagUser = 1;
            let password = prompt("Ingresa la contrasenia");
            if (password == oneUser.userPass) {
                flagPass = 1;
                active = 1;
                if (prod1.length == 0) {
                    alert("Bienvenid@");
                    addProducts();
                } else {
                    all();
                }
            } else {
                do {
                    password = prompt("Contrasenia incorrecta,quedan " + i + " intentos, Ingresa la contrasenia");
                    i--;
                    if (password == oneUser.userPass) {
                        i = 0;
                        flagPass = 1;
                    }
                } while (i > 0);
                if (i == 0 && flagPass == 0) {
                    alert("contrasenia bloqueada");
                }
            }
        }
    }
    if (flagUser == 0) {
        alert("el usuario ingresado no existe");
        let option = prompt("Ingresa una opcion:"
            + "\n1-Crear cuenta "
            + "\n2-Salir");
        validate(option);
    }
}
//active toma el valor 1 si el usuario se crea correctamente y si el array de productos esta vacio ingresa nuevos articulos, de lo contrario muestra el total
function validate(option) {
    if (option == 1) {
        do {
            email = prompt("Ingresa tu e-mail");
            if (email) {
                do {
                    password = prompt("Ingresa una contrasenia valida");
                    if (password) {
                        userList.push(new User(email, password));
                        alert("Registrad@ exitosamente");
                        active = 1;
                        if (prod1.length == 0) {
                            addProducts();
                        } else {
                            all();
                        }
                        console.log(userList);
                    }
                } while (!password);
            }
        } while (!email);
    }
}


function logIn() {
    let option = 0;
    do {
        option = prompt("Ingresa una opcion: "
            + "\n1-Ya tengo cuenta"
            + "\n2-Crear cuenta"
        );
        switch (option) {
            case '1':
                log();
                break;
            case '2':
                validate(1);
                break;
            default:
                alert("opcion incorrecta");
        }

    } while (option != 1 && option != 2);

}
options();




