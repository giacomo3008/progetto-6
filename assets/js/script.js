const STRIPE_URL = "https://striveschool-api.herokuapp.com/api/product/";
const API_KEY = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzViMmQ1ZGQyMjA3MTAwMTVkZTJmMWYiLCJpYXQiOjE3MzQwMjg2MzcsImV4cCI6MTczNTIzODIzN30.nYDbgZyPMiDzBcOYEmlkpjOCzvIBwxUdz56iByTlwEY"

const divProdotti = document.querySelector(".prodotti-inseriti .row");
const emptyList = document.getElementById("empty");
const prodName = document.getElementById("prodName");
const prodDescr = document.getElementById("prodDescr");
const prodBrand = document.getElementById("prodBrand");
const prodPrice = document.getElementById("prodPrice");
const prodImg = document.getElementById("prodImg");


let products = [];

window.onload = function () {
    getUrl();
}

const getUrl = function () {
    fetch(STRIPE_URL, {
        headers: {
            authorization: API_KEY,
        },
    })
        .then((res) => {
            if (res.ok) {
                return res.json()
            } else {
                throw new Error('Error getting the images')
            }
        })
        .then((data) => {
            products = data;
            localStorage.setItem("products",JSON.stringify(products));
            printData();
        })
        .catch((err) => {
            console.log(err)
        })
}

function printData() {
    if (products.length > 0) {
        emptyList.innerText = "";
        divProdotti.innerHTML = "";
        console.log("ecco i prodotti: ", products);
        products.forEach((prod) => {
            let colProduct = `
    <div class="col-md-4">
        <div class="card mb-4 shadow-sm p-3">
            <img src="${prod.imageUrl}" alt="${prod.name}" class="card-img-top" style="width: 100%"/>
            <div class="card-body">
                <h4 class="card-title">${prod.name}</h4>
                <p class="card-text">${prod.description}</p>
            </div>
            <div class="d-flex flex-column align-items-start">
                <a href="backoffice.html?id=${prod._id}">
                    <button class="btn btn-orange mb-1"">Modifica</button>
                </a>
                <a href="details.html?id=${prod._id}">
                    <button class="btn btn-azzurro"">Scopri di più</button>
                </a>
            </div>
        </div>
    </div>
`
            divProdotti.innerHTML += colProduct;

        });
    } else {
        emptyList.innerText = "Non sono presenti prodotti";
        divProdotti.innerHTML = "";
    }
}

function deleteProd(id) {
    products.forEach(async (prod) => {
        if(prod._id === id){
            try {
                await fetch(STRIPE_URL + prod._id, {
                    method: 'DELETE',
                    headers: {
                        authorization: API_KEY,
                    }
                });
            } catch (error) {
                console.log(error);
            }
        }
    })
}


