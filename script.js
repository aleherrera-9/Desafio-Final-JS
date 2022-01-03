//se agregan los productos al DOM
$(() => {
  fetch("./products.json")
    .then(data => data.json())
    .then(allData => {
      allData.forEach((product, idNumber) => {
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
        `
        )
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
      })
    }).catch(error => console.log(error))
})
//boton que aparece solo si cargo algun articulo en el carrito
let productResume = JSON.parse(localStorage.getItem("Productos"));
if (productResume) {
  document.getElementById('basket').innerHTML = `
  <a class="nav-link active text-white text-uppercase fs-5 " aria-current="page" id="finalizar"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="dark" class="bi bi-basket" viewBox="0 0 16 16">
  <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1v4.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 13.5V9a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1.217L5.07 1.243a.5.5 0 0 1 .686-.172zM2 9v4.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V9H2zM1 7v1h14V7H1zm3 3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 4 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 6 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 8 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5z"/>
</svg></a>`
  showAll();
}
//muestra los productos del localStorage que se almacenan cada vez que se agrega un producto al carrito o se modifica
function showAll() {
  $('#finalizar').on('click', () => {
    $('#slider').empty();
    $('#finalizar').hide();
    let productResume = JSON.parse(localStorage.getItem("Productos"));
    $('#list').empty();
    productResume.forEach((item, idNumber) => {
      finalPrice += item.price * item.qty;
      document.getElementById('finalPrice').innerHTML = `<p class="text-center bg-dark p-2 text-white" id="total">Subtotal: ${finalPrice}</p><br>` + infoText;
      $('#list').append(`<div id="product${idNumber + 1}"class="card m-3  p-1 text-center" style="width: 18rem;">
      <a ><img src="./Multimedia/product${item.imgId}.jpg"class="card-img-top" alt="..."></a>
      <div class="card-body">
      <h5 class="card-title"><strong>${item.name}</strong></h5>
      <p class="card-text">Cantidad: ${item.qty} </p>
      <p>Precio unidad ${item.price} </p>
      <p class="card-text text-primary"\n>$`+ item.qty * item.price + `</p>
      <div><a class="btn m-2  p-2 btn-danger" id="deleteItem${idNumber + 1}" >Eliminar</a></div></div>`)
    })
    $('#clearAll').on('click', () => {
      $('#basket').empty();
      localStorage.clear();
      setTimeout(function () {
        $('#finalPrice').append(`Se eliminaron todos los productos`);
      }, 1000)
      location.href = "index.html";
    })
    if (productResume) {
      productResume.forEach((item, idNumber) => {
        $(`#deleteItem${idNumber + 1}`).on('click', () => {
          document.getElementById('finalPrice').innerHTML = `<p class="text-center bg-dark p-2 text-dark" id="total">Total: ${finalPrice - (item.price * item.qty)}</p><br>` + infoText;
          let cardItem = document.getElementById(`product${idNumber + 1}`);
          cardItem.innerHTML = `<div class=" m-5 text-center"><p class="text-dark">\n${item.name} eliminado </p><p >Volviendo a la tienda</p></div><br><div class="progress m-5 text-center">
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
//Si se agrega el mismo producto se actualiza la cantidad
function list(oneProduct, qty) {
  let productResume = [];
  let products = JSON.parse(localStorage.getItem("Productos"));
  if (products) {
    const found = products.find(element => element.productId == oneProduct.productId);
    if (found) {
      const index = products.findIndex(element => element.productId == oneProduct.productId);
      newqty = parseInt(found.qty) + parseInt(qty);
      productResume = new Product(oneProduct.productId, oneProduct.name, newqty, oneProduct.price, oneProduct.imgId);
      products.splice(index, 1, productResume);
      localStorage.setItem("Productos", JSON.stringify(products));
    } else {
      products.push(new Product(oneProduct.productId, oneProduct.name, qty, oneProduct.price, oneProduct.imgId));
      localStorage.setItem("Productos", JSON.stringify(products));
    }
  } else {
    productResume.push(new Product(oneProduct.productId, oneProduct.name, qty, oneProduct.price, oneProduct.imgId));
    localStorage.setItem("Productos", JSON.stringify(productResume));
  }
}
function Alert(item, itemQty) {
  Swal.fire({
    title: `<p class="text-center text-dark fs-3">${item.name}</p><p class="text-dark fs-5">Agregado al carrito</p><p class="text-center text-dark fs-5">Cantidad : ${itemQty} </p>`,
    color: '#716add',
    imageUrl: `./Multimedia/product${item.imgId}.jpg`,
    imageWidth: 150,
    imageHeight: 200,
    background: 'rgba(248, 240, 250, 0.678)',
    imageAlt: 'Custom image',
    timer: 1500,
    backdrop: `rgba(223, 223, 223, 0.3)`,
    showConfirmButton: false
  })
}

function SearchItems() {
  let products = JSON.parse(localStorage.getItem("Productos"));
  if (products) {
    let find = document.getElementById(`itemSearch`).value;

  } else {

  }
}