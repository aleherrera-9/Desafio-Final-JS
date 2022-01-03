//se agregan los productos al DOM
$(() => {
  fetch("./products.json")
    .then(data => data.json())
    .then(allData => {
      orderByLower(allData);
      orderByHigher(allData);
      //busca por cada item y filtra los productos
      $('#camperas').on('click', () => {
        orderByType(allData, "campera");
      })
      $('#bolsas').on('click', () => {
        orderByType(allData, "bolsa");
      })
      $('#buzos').on('click', () => {
        orderByType(allData, "buzo");
      })
      $('#bordados').on('click', () => {
        orderByType(allData, "bordado");
      })
      $('#slider').on('click', () => {
        orderBySale(allData);
      })
      allData.forEach((product, idNumber) => {
        upData(product, idNumber);
        updateDom(allData);
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
    $('aside').empty();
    $('#slider').empty();
    $('#finalizar').hide();
    let productResume = JSON.parse(localStorage.getItem("Productos"));
    $('#list').empty();
    basketProducts(productResume);
    $('aside').append(`
    <div class="m-3" id="asidelist">
      <ul class="list-group list-group-flush">
        <li class="list-group-item"><strong>RESUMEN DE COMPRA</strong></li>
        <li class="list-group-item fw-lighter"><strong>Total: $${finalPrice}</strong></li>
        <li class="list-group-item "><strong>Articulos: ${productResume.length} </strong></li>
      </ul>
    </div>
    `)
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
           `
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
      productResume = new Product(oneProduct.productId, oneProduct.name, newqty, oneProduct.price, oneProduct.imgId, oneProduct.type, oneProduct.onSale);
      products.splice(index, 1, productResume);
      localStorage.setItem("Productos", JSON.stringify(products));
    } else {
      products.push(new Product(oneProduct.productId, oneProduct.name, qty, oneProduct.price, oneProduct.imgId, oneProduct.type, oneProduct.onSale));
      localStorage.setItem("Productos", JSON.stringify(products));
    }
  } else {
    productResume.push(new Product(oneProduct.productId, oneProduct.name, qty, oneProduct.price, oneProduct.imgId, oneProduct.type, oneProduct.onSale));
    localStorage.setItem("Productos", JSON.stringify(productResume));
  }
}
//Alerta que se agrega al dom cuando se agrega un producto al carrito
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
//orden por menor precio
function orderByLower(allData) {
  $('#low').on('click', () => {
    allData.sort(function (a, b) {
      if (a.price > b.price) {
        return 1;
      }
      if (a.price < b.price) {
        return -1;
      }
      return 0;
    });
    $('#list').empty();
    allData.forEach((product, idNumber) => {
      upData(product, idNumber);
      updateDom(allData);
    })
  })
}
//orden por mayor precio
function orderByHigher(allData) {
  $('#high').on('click', () => {
    allData.sort(function (a, b) {
      if (a.price < b.price) {
        return 1;
      }
      if (a.price > b.price) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
    $('#list').empty();
    allData.forEach((product, idNumber) => {
      upData(product, idNumber);
      updateDom(allData);
    })
  })
}
//orden por tipo de producto
function orderByType(allData, dato) {
  let list = [];
  for (const item of allData) {
    if (item.type == dato) {
      list.push(new Product(item.productId, item.name, item.qty, item.price, item.imgId, item.type, item.onSale));
    }
  }
  $('#list').empty();
  list.forEach((product, idNumber) => {
    upData(product, idNumber);
    updateDom(list);
  })
}
//cada producto tiene una bandera que indica si esta en oferta o no
function orderBySale(allData) {
  let list = [];
  for (const item of allData) {
    if (item.onSale == true) {
      list.push(new Product(item.productId, item.name, item.qty, item.price, item.imgId, item.type, item.onSale));
    }
  }
  $('#list').empty();
  list.forEach((product, idNumber) => {
    upData(product, idNumber);
    updateDom(list);
  })
}
