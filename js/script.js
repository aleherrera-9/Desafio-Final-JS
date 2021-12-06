let productList = [];
let finalPrice = 0;
let stockQty = 50;
let priceHoddie = 1500;
let priceTshirt = 800;
let priceEmbrodery = 2000;
const infoText=`
  <ul class="nav justify-content-center bg-light ">
    <li class="nav-item">
      <a class="nav-link active text-primary " aria-current="page" href="https://www.mercadopago.com.ar/home" >Pagar</a>
    </li>
    <li class="nav-item">
      <a class="nav-link active text-primary" aria-current="page" href="" >Seguir comprando</a>
    </li>
  </ul> 
`
class Product {
  constructor(id, type, quantity, price, number) {
    this.productId = id;
    this.name = type;
    this.qty = quantity;
    this.price = parseInt(price);
    this.imgId = number;
  }
}
const product1 = new Product(1, "Buzo Sunflower", stockQty, priceHoddie, 0);
const product2 = new Product(2, "Buzo Life", stockQty, priceHoddie, 0);
const product3 = new Product(3, "Buzo Promisses", stockQty, priceHoddie, 0);
const product4 = new Product(4, "Buzo Rainbow", stockQty, priceHoddie, 0);
const product5 = new Product(5, "Buzo Cactus", stockQty, priceHoddie, 0);
const product6 = new Product(6, "Buzo Deer", stockQty, priceHoddie, 0);
const product7 = new Product(7, "Bolsa", stockQty - 30, 5000 - priceHoddie, 0);
const product8 = new Product(8, "AOT", stockQty - 40, priceEmbrodery, 0);
const product9 = new Product(9, "Chihiro", stockQty - 40, priceEmbrodery, 0);
const product10 = new Product(10, "Demon Slayer", stockQty - 40, priceEmbrodery, 0);
const product11 = new Product(11, "Given", stockQty - 40, priceEmbrodery, 0);
const product12 = new Product(12, "Amorfo", stockQty - 40, priceEmbrodery, 0);
let productList2 = [product1, product2, product3, product4, product5, product6, product7, product8, product9, product10, product11, product12];
//se agregan los productos al DOM
function allProducts() {
  let insertProducts = document.getElementById('list');
  productList2.forEach((product, idNumber) => {
    insertProducts.innerHTML += `
  <div class="card m-3  p-1 text-center" id="product${idNumber + 1}"style="width: 18rem;">

  <a ><img src="./Multimedia/product${idNumber + 1}.jpg"class="card-img-top" alt="..."></a>
 
  <div class="card-body"  id="text${idNumber + 1}">
    <h5 class="card-title"><strong>${product.name}</strong></h5>
    <p class="card-text">Precio: ${product.price} </p>
    <div class="dropdown">
<select  id="itemQty${idNumber + 1}" class="form-select form-select-sm text-center" aria-label=".form-select-sm example">
  <option selected>Cantidad</option>
  <option value="1">1</option>
  <option value="2">2</option>
  <option value="3">3</option>
  <option value="4">4</option>
  <option value="5">5</option>
</select>
<br>
</div>
    <a id="shop${idNumber + 1}"class="btn m-1 btn-warning" >Comprar</a>
  </div>
  
</div>
`
  })
}
allProducts();
//limpia todo el carrito
function clearList() {
  let limpiar = document.getElementById('clearAll');
  limpiar.addEventListener('click', () => {
    localStorage.clear();
    alert("se eliminaron todos los productos");
  })
}
//al hacer click en comprar se agrega el producto a la lista
productList2.forEach((item, idNumber) => {
  document.getElementById(`shop${idNumber + 1}`).addEventListener('click', () => {
    let itemQty = document.getElementById(`itemQty${idNumber + 1}`).value;
    if (itemQty != 'Cantidad') {
      productList.push(new Product(item.productId, item.name, parseInt(itemQty), item.price, idNumber + 1));
      if (productList.length > 0) {
        let message=document.getElementById(`text${idNumber + 1}`);
        message.innerHTML=`<br><p class="text-center bg-success text-white fs-5">${item.name} agregado al carrito</p>`;
        setTimeout(function () {
          location.href = "index.html";
          list();
        }, 1000)
        clearList();
        showAll();
      }
    }
  })
})

//muestra los productos del localStorage que se almacenan cada vez que se agrega un producto al carrito o se modifica
function showAll() {
  let end = document.getElementById('finalizar');
  end.addEventListener('click', () => {
    buttons.innerHTML = `<a class="btn m-1 text-danger" href="" id="clearAll">Vaciar Carrito</a><br>`
    clearList();
    list();
    let productResume = JSON.parse(localStorage.getItem("Productos"));
      let insertProducts = document.getElementById('list');
      insertProducts.innerHTML = ""
      productResume.forEach((item, idNumber) => {
        finalPrice += item.price * item.qty;
        document.getElementById('finalPrice').innerHTML = `<p class="text-center bg-dark p-2 text-white">Total: ${finalPrice}</p><br>`+infoText;
        insertProducts.innerHTML +=`<div id="product${idNumber + 1}"class="card m-3  p-1 text-center" style="width: 18rem;">
              <a ><img src="./Multimedia/product${item.imgId}.jpg"class="card-img-top" alt="..."></a>
              <div class="card-body">
              <h5 class="card-title"><strong>${item.name}</strong></h5>
              <p class="card-text">Cantidad: ${item.qty} </p>
              <p>Precio unidad ${item.price} </p>
              <p class="card-text text-primary"\n>Precio Final: `+item.qty*item.price+`</p>
              <div><a class="btn m-2  p-2 btn-danger" id="deleteItem${idNumber + 1}" >Eliminar</a></div></div>`
      })
    if (productResume) {
      productResume.forEach((item, idNumber) => {
        let deleteItem = document.getElementById(`deleteItem${idNumber + 1}`);
        deleteItem.addEventListener('click', () => {
          let cardItem = document.getElementById(`product${idNumber + 1}`);
          cardItem.innerHTML = `<p>${item.name} eliminado</p>`;
          if (productResume.length > 0) {
            productResume.splice(idNumber, 1);
            setTimeout(function () {
              location.href = "index.html";
            }, 1000)
            document.getElementById('finalPrice').innerHTML = `<p class="text-center p-2"id="${idNumber + 1}">Total: ${finalPrice - (item.price * item.qty)}</p><br>`+infoText;
            localStorage.setItem("Productos", JSON.stringify(productResume));
            finalPrice=finalPrice - (item.price * item.qty)
          }
          if (productResume.length == 0) {
            document.getElementById('finalPrice').innerHTML = `<p class="text-center p-2"id="${idNumber + 1}">Volvemos a la tienda</p>`
            localStorage.clear();
            setTimeout(function () {
              location.href = "index.html";
            }, 1000 * 2)
          }
        })
      })
    }
  })
}

//boton que aparece solo si cargo algun articulo en el carrito
let productResume = JSON.parse(localStorage.getItem("Productos"));
if (productResume) {
  let button = document.getElementById('buttons');
  button.innerHTML = `
  <ul class="nav justify-content-center bg-dark">
  <li class="nav-item ">
    <a class="nav-link active text-white text-uppercase fs-5" aria-current="page" href="#"id="finalizar">Ver carrito</a>
  </li>
</ul>`
  showAll();
}
// busca en todo el array los productos con el mismo nombre y suma las cantidades para tener una cantidad final
function find(item) {
  let finalQty = 0;
  const filtered = productList.filter(producto => producto.name == item);
  for (const prod of filtered) {
    finalQty += prod.qty;
  }
  if (finalQty != 0) {
    return finalQty;
  }
}
//se agrega la lista final al local storage para despues consultarlo cuando haga click en finalizar
function list() {
  let products = JSON.parse(localStorage.getItem("Productos"));
  let prevProd;
  let productResume = [];
  let qty = 0;
  for (let i = 0; i < productList.length; i++) {
    if (i == 0) {
      prevProd = productList[i].imgId;
      qty = find(productList[i].name);
      productResume.push(new Product(productList[i].productId, productList[i].name, qty, productList[i].price, productList[i].imgId));
    }
    else {
      if (prevProd != productList[i].imgId) {
        qty = find(productList[i].name);
        productResume.push(new Product(productList[i].productId, productList[i].name, qty, productList[i].price, productList[i].imgId));
        prevProd = productList[i].imgId;
      }
    }
  }
  if (products) {
    products = products.concat(productResume);
    localStorage.setItem("Productos", JSON.stringify(products));
  } else {
    localStorage.setItem("Productos", JSON.stringify(productResume));
  }
}
