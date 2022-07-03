import {currentUser, currentUserBasket, navbarBasketCounter} from './navBar.js'

let searchKeyword = localStorage.getItem('searchKeyword')
if(searchKeyword!==''){
    showProducts()
}
else{
    location.href = 'shop.html'
}

async function showProducts(){
    document.querySelector('.search-input').value = searchKeyword
    let products = await (await fetch('https://salinaka-e-commerce-default-rtdb.firebaseio.com/products.json')).json()
        for(var i=0; i<products.length;i++){
            // console.log(products[i].title.toLowerCase())
            if(products[i].title.toLowerCase().includes(searchKeyword.toLowerCase()) || products[i].brand.toLowerCase().includes(searchKeyword.toLowerCase())){
                let ProductCard = createProductCard(products[i])
                document.querySelector("#shop .products").appendChild(ProductCard);
            }
        }
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
        location.href = 'index.html' //'signUp.html'
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