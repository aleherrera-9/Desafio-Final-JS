class Product {
    constructor(id, type, quantity, price, number) {
      this.productId = id;
      this.name = type;
      this.qty = quantity;
      this.price = parseInt(price);
      this.imgId = number;
    }
  }
  let finalPrice = 0;
const infoText = `
  <ul class="nav justify-content-center">
    <li class="nav-item m-2">
      <a class="nav-link active text-center" aria-current="page" href="https://www.mercadopago.com.ar/home" ><p class="text-dark text-center">Pagar</p></a>
    </li>
    <li class="nav-item  m-2 ">
      <a class="nav-link active text-center" aria-current="page" href="" ><p class="text-dark text-center ">Seguir comprando</p></a>
    </li>
  </ul> 
  <a class="btn m-1 text-danger" id="clearAll">Vaciar Carrito</a><br>
  `
