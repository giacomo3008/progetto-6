const STRIPE_URL = "https://striveschool-api.herokuapp.com/api/product/";
const API_KEY = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzViMmQ1ZGQyMjA3MTAwMTVkZTJmMWYiLCJpYXQiOjE3MzQwMjg2MzcsImV4cCI6MTczNTIzODIzN30.nYDbgZyPMiDzBcOYEmlkpjOCzvIBwxUdz56iByTlwEY"

const btnSendForm = document.getElementById("sendForm");
const prodName = document.getElementById("prodName");
const prodDescr = document.getElementById("prodDescr");
const prodBrand = document.getElementById("prodBrand");
const prodPrice = document.getElementById("prodPrice");
const prodImg = document.getElementById("prodImg");
const form = document.getElementsByTagName("form")[0];
const btnContainer = document.getElementsByClassName("btn-container")[0];
const btnDelete = document.getElementById("btnDelete");
const title = document.getElementsByTagName("h2")[0];

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
  if (ifModified) {
    modifyItem(getId());
  } else {
    pushItem();
  }
});

window.onload = function () {
  modifyProd(getId());
  if (ifModified) {
    title.innerText = "Edit Product";
    btnContainer.classList.add("justify-content-between");
    btnDelete.classList.remove("d-none");
    btnDelete.addEventListener("click",async function (e) {
      e.preventDefault();
      await deleteProd(getId());
      window.location.href = "index.html";
    });
  } else {
    title.innerText = "Add Product";
    btnContainer.classList.remove("justify-content-between");
    btnContainer.classList.add("justify-content-end")
    btnDelete.classList.add("d-none");
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
        prodName.value = prod.name;
        prodBrand.value = prod.brand;
        prodDescr.value = prod.description;
        prodImg.value = prod.imageUrl;
        prodPrice.value = parseInt(prod.price);
      }
    });
  }
}

async function modifyItem(id) {
  console.log(STRIPE_URL + id);
  let newProd = new Product(prodName.value, prodDescr.value, prodBrand.value, prodImg.value, prodPrice.value);
  try {
    await fetch(STRIPE_URL + id, {
      method: "PUT",
      body: JSON.stringify(newProd),
      headers: {
        "Content-Type": "application/json",
        authorization: API_KEY
      }
    });
  } catch (err) {
    console.log("Errore nella modifica del prodotto: ", err);
  }
}

async function deleteProd(id) {
  try {
    await fetch(STRIPE_URL + id, {
      method: 'DELETE',
      headers: {
        authorization: API_KEY,
      }
    });
  } catch (error) {
    console.log(error);
  }
}

