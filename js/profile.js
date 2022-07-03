import {currentUser, currentUserBasket, navbarBasketCounter} from './navBar.js'
let ordersContainer = document.querySelector('.orders-container')
let subtotalAmout = 0
// set user info
setUserInfo()
function setUserInfo(){
    document.querySelector('.account-user-name').innerHTML = currentUser.fullName
    document.querySelector('#email').innerHTML = currentUser.email
    if(currentUser.profilePhoto){
        document.querySelector('.user-img img').setAttribute('src', `${currentUser.profilePhoto}`)
    }
    if(currentUser.profilebanner){
        document.querySelector('.banner-img').setAttribute('src', `${currentUser.profilebanner}`)
    }
    if(currentUser.address){
        document.querySelector('#address').innerHTML = currentUser.address
    }
    else{
        document.querySelector('#address').innerHTML = `Address not set yet`
    }
    if(currentUser.mobile){
        document.querySelector('#mobile').innerHTML = currentUser.mobile
    }
    else{
        document.querySelector('#mobile').innerHTML = `Mobile number not set yet`
    }
    document.querySelector('#date-joined').innerHTML = currentUser.dateJoined
}
// get orders
getOrders()
function getOrders(){
    if(currentUser!=='not found'){
        ordersContainer.innerHTML = '<h3>My Orders</h3>'
        if(Object.keys(currentUserBasket).length){
            for(let productId in currentUserBasket){
                let ProductCard = createBasketProduct(currentUserBasket[productId])
                ordersContainer.appendChild(ProductCard);
                subtotalAmout+=currentUserBasket[productId].quantity * currentUserBasket[productId].price
            }
            ordersContainer.innerHTML += `<p class='subtotal-amout'>Subtotal Amout: <span>$${subtotalAmout}</span><p>`
        }
        else{
            ordersContainer.innerHTML = `<h3>My Orders</h3>
            <p class="no-orders-para">You don't have any orders</p>`
            ordersContainer.setAttribute('style','background-color: #f2f2f2;justify-content: center; min-height: 80vh;')
            subtotalAmout = 0
        }
        
    }
}

function createBasketProduct(product){
    let productContainer = document.createElement("div")
    productContainer.className = `basket-product align-items-center justify-content-between row w-100`
    productContainer.innerHTML=`
    <div class="basket-product align-items-center justify-content-between row w-100">
    <div class="basket-product-img col-3 p-4">
        <img src=${product.image} alt="" class="w-100">
    </div>
    <div class="product-info col-5">
        <div class="product-brand">${product.brand}</div>
        <div class="d-flex justify-content-between">
            <div class="product-quantity d-flex flex-column">
                Quantity
                <span class="quantity">${product.quantity}</span>
            </div>
            <div class="product-size d-flex flex-column">
                Size
                <span class="size">${product.size}mm</span>
            </div>
            <div class="product-color d-flex flex-column">
                Color
                <span class="color" style="background-color: ${product.color};"></span>
            </div>
        </div>
    </div>
    <div class="product-total-quantity-price col-4 text-center">$${product.price*product.quantity}</div>
    </div>`
    return productContainer
}