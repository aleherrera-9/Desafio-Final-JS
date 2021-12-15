let finalPrice = 0;
const infoText = `
  <ul class="nav justify-content-center">
    <li class="nav-item m-2">
      <a class="nav-link active text-center" aria-current="page" href="https://www.mercadopago.com.ar/home" ><p class="text-white text-center">Pagar</p></a>
    </li>
    <li class="nav-item  m-2 ">
      <a class="nav-link active text-center" aria-current="page" href="" ><p class="text-white text-center ">Seguir comprando</p></a>
    </li>
  </ul> 
  <a class="btn m-1 text-danger" id="clearAll">Vaciar Carrito</a><br>
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
//se agregan los productos al DOM
$(() => {
  fetch("./products.json")
    .then(data => data.json())
    .then(allData => {
      allData.forEach((product, idNumber) => {
        $('#list').append(`
          <div class="card m-3  p-1 text-center" id="product${idNumber + 1}"style="width: 18rem;">
          <img id="img${this.imgId}" src="./Multimedia/product${product.imgId}.jpg"class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title"><strong>${product.name}</strong></h5>
            <p class="card-text">Precio: ${product.price} </p>
            <div class="dropdown">
        <select  id="itemQty${idNumber + 1}" class="form-select form-select-sm text-center btn-primary btn-outline-dark" aria-label=".form-select-sm example">
          <option selected>Cantidad</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <br>
        </div>
            <a id="shop${idNumber + 1}"class="btn m-1 btn-outline-primary" >Comprar</a>
            <p id="text${idNumber + 1}"></p>
          </div>
          
        </div>
        `)
        allData.forEach((item, idNumber) => {
          $(`#shop${idNumber + 1}`).on('click', () => {
            let itemQty = document.getElementById(`itemQty${idNumber + 1}`).value;
            //agregado con inner para que no se repita cada vez que se hace click
            document.getElementById('buttons').innerHTML = `<a class="nav-link active text-white text-uppercase fs-5" aria-current="page" href="#"id="finalizar">Ver carrito<br><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-basket" viewBox="0 0 16 16">
            <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1v4.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 13.5V9a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1.217L5.07 1.243a.5.5 0 0 1 .686-.172zM2 9v4.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V9H2zM1 7v1h14V7H1zm3 3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 4 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 6 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 8 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5z"/>
          </svg></a> `
            showAll();
            if (itemQty != 'Cantidad') {
                list(item, itemQty);
                $(`#itemQty${idNumber + 1}`).prop('selectedIndex', 0);
                $(`#text${idNumber + 1}`).append(`<br><p class="text-center text-white">${item.name} agregado al carrito</p><p class="5text-center text-white ">Cantidad : ${itemQty} </p>`)
                $(`#text${idNumber + 1}`).slideDown("slow");
                  setTimeout(function () {
                    $(`#text${idNumber + 1}`).toggle("slow");
                    $(`#text${idNumber + 1}`).empty();
                  }, 2000)
            }
          })
        })
      })
    }).catch(error => console.log(error))
})
//boton que aparece solo si cargo algun articulo en el carrito
let productResume = JSON.parse(localStorage.getItem("Productos"));
if (productResume) {
  let button = document.getElementById('buttons');
  button.innerHTML = `
  <ul class="nav justify-content-center bg-dark">
  <li class="nav-item ">
    <a class="nav-link active text-white text-uppercase fs-5 " aria-current="page" id="finalizar">Ver carrito<br><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-basket" viewBox="0 0 16 16">
    <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1v4.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 13.5V9a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1.217L5.07 1.243a.5.5 0 0 1 .686-.172zM2 9v4.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V9H2zM1 7v1h14V7H1zm3 3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 4 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 6 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 8 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5z"/>
  </svg></a>
  </li>
</ul>`
  showAll();
}
//muestra los productos del localStorage que se almacenan cada vez que se agrega un producto al carrito o se modifica
function showAll() {
  $('#finalizar').on('click', () => {
    $('#finalizar').hide();
    let productResume = JSON.parse(localStorage.getItem("Productos"));
    $('#list').empty();
    productResume.forEach((item, idNumber) => {
      finalPrice += item.price * item.qty;
      document.getElementById('finalPrice').innerHTML = `<p class="text-center bg-dark p-2 text-white" id="total">Total: ${finalPrice}</p><br>` + infoText;
      $('#list').append(`<div id="product${idNumber + 1}"class="card m-3  p-1 text-center" style="width: 18rem;">
      <a ><img src="./Multimedia/product${item.imgId}.jpg"class="card-img-top" alt="..."></a>
      <div class="card-body">
      <h5 class="card-title"><strong>${item.name}</strong></h5>
      <p class="card-text">Cantidad: ${item.qty} </p>
      <p>Precio unidad ${item.price} </p>
      <p class="card-text text-primary"\n>Precio : `+ item.qty * item.price + `</p>
      <div><a class="btn m-2  p-2 btn-danger" id="deleteItem${idNumber + 1}" >Eliminar</a></div></div>`)
    })
    $('#clearAll').on('click', () => {
      $('#buttons').empty();
      localStorage.clear();
      setTimeout(function () {
        $('#finalPrice').append(`Se eliminaron todos los productos`);
      }, 1000)
      location.href = "index.html";
    })
    if (productResume) {
      productResume.forEach((item, idNumber) => {
        $(`#deleteItem${idNumber + 1}`).on('click', () => {
          document.getElementById('finalPrice').innerHTML = `<p class="text-center bg-dark p-2 text-white" id="total">Total: ${finalPrice-(item.price*item.qty)}</p><br>` + infoText;
          let cardItem = document.getElementById(`product${idNumber + 1}`);
          cardItem.innerHTML = `<div class=" m-5 text-center"><p class="text-white">\n${item.name} eliminado </p><p >Volviendo a la tienda</p></div><br><div class="progress m-5 text-center">
           <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 80%;"></div>
              </div>`
          if (productResume.length > 0) {
            productResume.splice(idNumber, 1);
            setTimeout(function () {
              location.href = "index.html";
            }, 1000)
            localStorage.setItem("Productos", JSON.stringify(productResume));
            finalPrice = finalPrice - (item.price * item.qty)
          }
          if (productResume.length == 0) {
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
function list(oneProduct, qty) {
  let productResume = [];
  let products = JSON.parse(localStorage.getItem("Productos"));
  if (products) {
    products.push(new Product(oneProduct.productId, oneProduct.name, qty, oneProduct.price, oneProduct.imgId));
    localStorage.setItem("Productos", JSON.stringify(products));
  } else {
    productResume.push(new Product(oneProduct.productId, oneProduct.name, qty, oneProduct.price, oneProduct.imgId));
    localStorage.setItem("Productos", JSON.stringify(productResume));
  }
}
