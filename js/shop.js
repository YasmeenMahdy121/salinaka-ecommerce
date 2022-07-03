import {currentUser, currentUserBasket, navbarBasketCounter} from './navBar.js'

let productContainer = document.querySelector("#shop .products")
showProducts()

async function showProducts(){
    let products = await (await fetch('https://salinaka-e-commerce-default-rtdb.firebaseio.com/products.json')).json()
    document.querySelector('.show-more-products').setAttribute('style', 'display: flex !important;')
    productContainer.innerHTML = ''
    for(var i=0; i<products.length;i++){
        let ProductCard = createProductCard(products[i])
        productContainer.appendChild(ProductCard);
        if(i==11){
            i++
            break;
        }
    }
    document.querySelector('.show-more-products').addEventListener('click',function(){
        this.setAttribute('style', 'display: none !important;')
        for(i; i<products.length;i++){
            let ProductCard = createProductCard(products[i])
            productContainer.appendChild(ProductCard);
        }
    })
}
function createProductCard(product){
    let productCol = document.createElement("div")
    productCol.className = `col-xl-2 col-lg-3 col-md-4 col-sm-6 px-1`
    let productCard = document.createElement("div")
    productCard.className = `card rounded-0 d-flex flex-column align-items-center product`
    productCard.setAttribute('id',`product${product.id}`)
    if(currentUserBasket[product.id]){
        productCard.classList.add('added-to-basket')
    }
    productCard.addEventListener('click',function(e){
        if(!(e.target.classList.contains('add-to-basket')||e.target.classList.contains('remove-from-basket')))
        {
            getProductDetails(product)
        }
    })
    productCard.innerHTML = `
    <div class="product-img d-flex align-items-center">
        <img src=${product.image} alt="">
    </div>
    <div class="card-body d-flex flex-column align-items-center">
        <h5 class="card-title product-name">${product.title}</h5>
        <p class="card-text product-brand text-muted">${product.brand}</p>
        <span class="product-price">$${product.price}</span>
    </div>
    <span class="add-to-basket d-flex align-items-center justify-content-center" data-product='${JSON.stringify(product)}' onclick="addToBasket(event)">Add to basket</span>
    <span class="remove-from-basket d-flex align-items-center justify-content-center" data-productid='${product.id}' onclick="removeFromBasket(event)">Remove from basket</span>`
    productCol.appendChild(productCard)
    return productCol
}
function getProductDetails(product){
    localStorage.setItem('productDetails',JSON.stringify(product))
    location.href = 'productDetails.html'
}
// /////////////////// here & search////////////
window.addToBasket = addToBasket
window.removeFromBasket = removeFromBasket
function addToBasket(e){
    if(currentUser!=='not found'){
        // alert message when add product
        document.querySelector('.added-item-alert').setAttribute('style','opacity: 1;transform: translateY(200%);')
        setTimeout(()=>{
            document.querySelector('.added-item-alert').setAttribute('style','opacity: 1;opacity: 0;transform: translateY(-101%);')
        },5000)
        // toggle btn add to basket into btn remove from basket
        e.target.parentElement.classList.add('added-to-basket')
        // add the product to basket
        let product = JSON.parse(e.target.dataset.product)
        if(currentUser!=='not found'){
            currentUserBasket[product.id] = {...product}
            localStorage.setItem(currentUser.email+'Basket',JSON.stringify(currentUserBasket))
            navbarBasketCounter.innerHTML = Object.keys(currentUserBasket).length
        }
    }
    else{
        location.href = 'signIn.html'
    }
}
function removeFromBasket(e){
    // alert message when remove product
    document.querySelector('.removed-item-alert').setAttribute('style','opacity: 1;transform: translateY(200%);')
    setTimeout(()=>{
        document.querySelector('.removed-item-alert').setAttribute('style','opacity: 1;opacity: 0;transform: translateY(-101%);')
    },5000)
    // toggle btn remove from basket into btn add to basket
    e.target.parentElement.classList.remove('added-to-basket')
    // remove the product from basket
    delete currentUserBasket[e.target.dataset.productid]
    localStorage.setItem(currentUser.email+'Basket',JSON.stringify(currentUserBasket))
    navbarBasketCounter.innerHTML = Object.keys(currentUserBasket).length
}

// filter popup
const rangeInput = document.querySelectorAll(".range-input input"),
priceInput = document.querySelectorAll(".price-input input"),
range = document.querySelector(".slider .progress");
let overlay = document.querySelector('.overlay')
let filterPopup = document.querySelector('.filter-popup')
let filterPopupCard = document.querySelector('.filter-popup .card')
let priceGap = 50;
let showFilterPopupBtn= document.querySelector('.nav-filter-btn')
showFilterPopupBtn.addEventListener('click', showFilterPopup)
function showFilterPopup(){
    filterPopup.style.display = 'flex'
    filterPopupCard.setAttribute('style', 'transform: scale(1);')
    overlay.style.display = 'block'
}
priceInput.forEach(input =>{
    input.addEventListener("input", e =>{
        let minPrice = parseInt(priceInput[0].value),
        maxPrice = parseInt(priceInput[1].value);
        
        if((maxPrice - minPrice >= priceGap) && maxPrice <= rangeInput[1].max){
            if(e.target.className === "input-min"){
                rangeInput[0].value = minPrice;
                range.style.left = ((minPrice / rangeInput[0].max) * 100) + "%";
            }else{
                rangeInput[1].value = maxPrice;
                range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
            }
        }
    });
});

rangeInput.forEach(input =>{
    input.addEventListener("input", e =>{
        let minVal = parseInt(rangeInput[0].value),
        maxVal = parseInt(rangeInput[1].value);

        if((maxVal - minVal) < priceGap){
            if(e.target.className === "range-min"){
                rangeInput[0].value = maxVal - priceGap
            }else{
                rangeInput[1].value = minVal + priceGap;
            }
        }else{
            priceInput[0].value = minVal;
            priceInput[1].value = maxVal;
            range.style.left = ((minVal / rangeInput[0].max) * 100) + "%";
            range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
        }
    });
});
// apply filter event 
let applyFilterBtn = document.querySelector('.apply-filters-btn')
let resetFilterBtn = document.querySelector('.reset-filters-btn')
let brandFilterSelect = document.querySelector('#brandFilterSelect')
let sortBySelect = document.querySelector('#sortBySelect')

applyFilterBtn.addEventListener('click',applyFilter)
resetFilterBtn.addEventListener('click',resetFilter)

async function applyFilter(){
    // start filtering
    let products = await (await fetch('https://salinaka-e-commerce-default-rtdb.firebaseio.com/products.json')).json()
    productContainer.innerHTML = ''
    let filteredProducts = products.filter((product)=>{
        if(product.brand.toLowerCase().includes(brandFilterSelect.value.toLowerCase())&&product.price>=(+priceInput[0].value)&&product.price<=(+priceInput[1].value)){
            return true
        }
        else if(brandFilterSelect.value == 'All Brands'&&product.price>=(+priceInput[0].value)&&product.price<=(+priceInput[1].value)){
            return true
        }
        return false
    })
    if(sortBySelect.value == 1){
        filteredProducts.sort((a, b) => a.title.localeCompare(b.title))
    }
    else if(sortBySelect.value == 2){
        filteredProducts.sort((a, b) => b.title.localeCompare(a.title))
    }
    else if(sortBySelect.value == 3){
        filteredProducts.sort((a, b) => b.price - a.price)
    }
    else if(sortBySelect.value == 4){
        filteredProducts.sort((a, b) => a.price - b.price)
    }
    filteredProducts.forEach((product)=>{
        let ProductCard = createProductCard(product)
        productContainer.appendChild(ProductCard);
    })
    // hide filter popup
    filterPopup.style.display = 'none'
    overlay.style.display = 'none'
    // hide show more btn
    document.querySelector('.show-more-products').setAttribute('style', 'display: none !important;')
}
function resetFilter(){
    priceInput[0].value = 0
    priceInput[1].value = 676
    rangeInput[0].value = 0
    rangeInput[1].value = 676
    brandFilterSelect.value = 'All Brands'
    sortBySelect.value = 'none'
    range.style.left ="0";
    range.style.right = "0";
    // hide filter popup
    filterPopup.style.display = 'none'
    overlay.style.display = 'none'
    showProducts()
}

filterPopup.addEventListener('click',function(e){
    if(e.target.classList.contains('filter-popup')){
        filterPopup.style.display = 'none'
        overlay.style.display = 'none'
    }
})

