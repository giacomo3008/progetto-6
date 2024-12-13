const STRIPE_URL = "https://striveschool-api.herokuapp.com/api/product/";
const API_KEY = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzViMmQ1ZGQyMjA3MTAwMTVkZTJmMWYiLCJpYXQiOjE3MzQwMjg2MzcsImV4cCI6MTczNTIzODIzN30.nYDbgZyPMiDzBcOYEmlkpjOCzvIBwxUdz56iByTlwEY"

const btnSendForm = document.getElementById("sendForm");
const prodName = document.getElementById("prodName");
const prodDescr = document.getElementById("prodDescr");
const prodBrand = document.getElementById("prodBrand");
const prodPrice = document.getElementById("prodPrice");
const prodImg = document.getElementById("prodImg");
const form = document.getElementsByTagName("form")[0];
const divDelete = document.getElementsByClassName("div-delete")[0];

let ifModified = false;

class Product {
  constructor(_name, _description, _brand, _imageUrl, _price) {
    this.name = _name;
    this.description = _description;
    this.brand = _brand;
    this.imageUrl = _imageUrl;
    this.price = parseInt(_price);
  }
}

btnSendForm.addEventListener('click', function (e) {
  e.preventDefault();
  pushItem();
});

window.onload = function () {
  modifyProd(getId());
  if(ifModified){
    let btnDelete = document.createElement("button");
    btnDelete.setAttribute("display","block");
    btnDelete.classList.add("add-product btn btn-danger");
    btnDelete.innerText = 
  }
}

async function pushItem() {
  let prod = new Product(prodName.value, prodDescr.value, prodBrand.value, prodImg.value, prodPrice.value);
  try {
    await fetch(STRIPE_URL, {
      method: "POST",
      body: JSON.stringify(prod),
      headers: {
        "Content-Type": "application/json",
        authorization: API_KEY
      }
    });
    console.log(prod);
    form.reset();
  } catch (err) {
    console.log("Errore nell'inserimento del prodotto: ", err);
  }
}

function getId() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

function modifyProd(id) {
  if (id) {
    ifModified = true;
    let products = JSON.parse(localStorage.getItem("products"));
    products.forEach((prod) => {
      if (prod._id === id) {
        console.log(prod.name);
        prodName.value = prod.name;
        prodBrand.value = prod.brand;
        prodDescr.value = prod.description;
        prodImg.value = prod.imageUrl;
        prodPrice.value = parseInt(prod.price);
      }
    });

  }
}
