import {currentUser, currentUserBasket, navbarBasketCounter} from './navBar.js'



let products = []
async function GetDataHome() {
    let data = await fetch("https://salinaka-e-commerce-default-rtdb.firebaseio.com/products.json")
    let result = await data.json()
    products = result

    DisplayProductsFeat()
    DisplayProductsRecom()
}

GetDataHome()

function DisplayProductsFeat() {

    let card = ''
    let div = document.getElementById("featured")
    for (let i = 0; i < 6; i++) {
        if (products[i].category == "featured") {
            card += `<div class="col-lg-4 col-md-6">
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

function DisplayProductsRecom() {
    let card1 = ''
    let div1 = document.getElementById("recommended")
    for (let i = 0; i < (products.length - 3); i++) {
        if (products[i].category == "recommended") {
            card1 += `<div class="col-lg-4 col-md-6">
            <div class="card">
            <div class="product-display-img"> 
            <img data-prod='${JSON.stringify(products[i])}' onclick="GetProductDetails(event)" src=${products[i].image} class="product-card-img is-img-loaded"> </div>
            <div class="product-display-details"> <h6 class="mt-0 font-weight-bold mb-2 imfo">${products[i].title}</h6> 
            <p class="text1 d-block">${ products[i].brand}</p> </div>
            </div>
            </div>`
        }
    }

    div1.innerHTML = card1;
}

window.GetProductDetails = GetProductDetails

function GetProductDetails(ev) {
    if (ev.target.classList.contains('product-card-img')) {
        localStorage.setItem('productDetails', ev.target.dataset.prod)
        location.href = "productDetails.html"
    }
}
