import {currentUser, currentUserBasket, navbarBasketCounter} from './navBar.js'


let products = []
async function GetProducts() {
    let data = await fetch("https://salinaka-e-commerce-default-rtdb.firebaseio.com/products.json")
    let result = await data.json()
    products = result

    DisplayRecomendProducts()
}

GetProducts()

function DisplayRecomendProducts() {
    let card = ''
    let div = document.getElementById("recomendProduct")
    for (let i = 0; i < products.length; i++) {
        if (products[i].category == "recommended") {
            card +=`<div class="col-lg-4 col-md-6">
            <div class="card">
            <div class="product-display-img"> 
            <img data-prod='${JSON.stringify(products[i])}' onclick="GetProductDetails(event)" src=${products[i].image} class="product-card-img is-img-loaded"> </div>
            <div class="product-display-details"> <h6 class="mt-0 font-weight-bold mb-2 imfo">${products[i].title}</h6> 
            <p class="text1 d-block">${ products[i].brand}</p> </div>
            </div>
            </div>`
                 

        }
    }
    div.innerHTML = card;
}
window.GetProductDetails = GetProductDetails

function GetProductDetails(ev) {
    if (ev.target.classList.contains('product-card-img')) {
        localStorage.setItem('productDetails', ev.target.dataset.prod)
        location.href = "productDetails.html"
        console.log(ev.target.dataset.prod);
    }
}
