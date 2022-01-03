class Product {
  constructor(id, type, quantity, price, number, itemType, flag) {
    this.productId = id;
    this.name = type;
    this.qty = quantity;
    this.price = parseInt(price);
    this.imgId = number;
    this.type = itemType;
    this.onSale = flag;
  }
}
let finalPrice = 0;
const infoText = `
  <ul class="nav justify-content-center">
    <li class="nav-item  m-2 ">
      <a class="nav-link active text-center text-dark" aria-current="page" href="" ><svg xmlns="http://www.w3.org/2000/svg" width="100" height="50" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
    </svg><p clas="fw-lighter fs-5">Volver a la tienda </p></a>
    </li>
  </ul> 
  <a class="btn m-1 text-danger" id="clearAll">Vaciar Carrito</a><br>
  `
function upData(product, idNumber) {
  $('#list').append(`
    <div class="card m-1 p-1 border-light text-center" id="product${idNumber + 1}"style="width: 20rem;">
     <div id="img${product.imgId}"><img src="./Multimedia/product${product.imgId}.jpg"class="card-img-top" alt="..."></div>
        <div class="card-body">
          <h5 class="card-title fw-lighter"><strong>${product.name}</strong></h5>
          <p class="card-text fw-lighter">$${product.price} </p>
                <div class="dropdown">
            <select  id="itemQty${idNumber + 1}" class="form-select form-select-sm text-center fw-bold" aria-label=".form-select-sm example">
              <option class="fw-bold" selected>Cantidad</option>
              <option class="fw-bold"  value="1">1</option>
              <option class="fw-bold"  value="2">2</option>
              <option class="fw-bold"  value="3">3</option>
              <option class="fw-bold" value="4">4</option>
              <option class="fw-bold" value="5">5</option>
            </select>
            <br>
            </div>
      <button type="button" id="shop${idNumber + 1}" class="btn m-1 btn-outline-dark fw-lighter">Agregar</button>
      <p id="text${idNumber + 1}"></p>
        </div>
  </div>
  `  )
}
function updateDom(allData) {
  allData.forEach((item, idNumber) => {
    $(`#shop${idNumber + 1}`).on('click', () => {
      let itemQty = document.getElementById(`itemQty${idNumber + 1}`).value;
      //agregado con inner para que no se repita cada vez que se hace click
      document.getElementById('basket').innerHTML = `
          <a class="nav-link active text-white text-uppercase" aria-current="page" id="finalizar"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="dark" class="bi bi-basket" viewBox="0 0 16 16">
          <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1v4.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 13.5V9a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1.217L5.07 1.243a.5.5 0 0 1 .686-.172zM2 9v4.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V9H2zM1 7v1h14V7H1zm3 3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 4 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 6 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 8 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5z"/>
        </svg></a>`
      showAll();
      if (itemQty != 'Cantidad') {
        list(item, itemQty);
        Alert(item, itemQty);
        $(`#itemQty${idNumber + 1}`).prop('selectedIndex', 0);
        // $(`#text${idNumber + 1}`).append(`<br><p class="text-center text-white">${item.name} agregado al carrito</p><p class="5text-center text-white ">Cantidad : ${itemQty} </p>`)
        // $(`#text${idNumber + 1}`).slideDown("slow");
        // setTimeout(function () {
        //   $(`#text${idNumber + 1}`).toggle("slow");
        //   $(`#text${idNumber + 1}`).empty();
        // }, 2000)
      }
    })
  })
}
function basketProducts(productResume) {
  $('#list').append(
    `<table class="table" >
      <thead>
        <tr>
          <th scope="col">Mi Carrito</th>
          <th scope="col">Articulo</th>
          <th scope="col">Precio</th>
          <th scope="col">Cantidad</th>
          <th scope="col">Subtotal</th>
          <th scope="col">eliminar</th>
        </tr>
      </thead>
      <tbody id="listTable">
      </tbody>
    </table>`)
  productResume.forEach((item, idNumber) => {
    finalPrice += item.price * item.qty;
    document.getElementById('finalPrice').innerHTML = `<div class="priceSection p-4"><button type="button"id="finalBtn" class="fw-lighter">Finalizar Compra</button>` + infoText;
    $('#finalBtn').on('click', () => {
      setTimeout(function () {
        $('#list').empty();
      }, 4000)
      $('#list').append(`<div class="text-center">
      <div class="spinner-border" role="status">
      </div>
    </div>`)
    location.href ="https://www.mercadopago.com.ar/paid?code=V1C70X&utm_source=google&utm_medium=cpc&utm_campaign=MLA_MP_G_AO_ALL_BRD_SEARCH_MP_EXACT&matt_tool=28766038&matt_word=MLA_MP_BRD_EXACT&gclid=Cj0KCQiA2sqOBhCGARIsAPuPK0gco8oFGwbUnB-AHhkQ93sA0uZcu2MB67_EKKL9Ak9uDB0u9LipcX0aAlFOEALw_wcB"
     
    })
    $('#listTable').append(` 
     <tr id="product${idNumber + 1}">
     <td><img src="./Multimedia/product${item.imgId}.jpg" width="150" height="170"></td>
     <th scope="row" class="text center"><strong>${item.name}</strong></th>
     <td><p>$${item.price}</p></td>
     <td>${item.qty}</td>
     <td><p class="card-text fw-lighter text-dark"\n>$`+ item.qty * item.price + `</p></td>
     <td id="deleteItem${idNumber + 1}"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"  fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
     <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
     <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
   </svg></td>
   </tr>`)
  })
}

