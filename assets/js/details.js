const detailsRow = document.getElementById("details");

window.onload = function () {
    displayProd(getId());
}

function getId() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

function displayProd(id) {
    if (id) {
        let products = JSON.parse(localStorage.getItem("products"));
        products.forEach((prod) => {
            if (prod._id === id) {
                printProd(prod);
            }
        });
    }
}

function printProd(prod) {
    detailsRow.innerHTML = "";
    detailsRow.innerHTML = `
    <div class="col-3">
        <img src="${prod.imageUrl}" width="100%"/>
    </div>
    <div class="col-9">
        <h6>${prod.brand}</h6>
        <h2>${prod.name}</h2>
        <span class="badge custom-badge">${prod.price} $</span>
        <p class="mt-4">${prod.description}</p>
    </div>
    `
}