// ///
import {onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js";
import {auth, firestore} from './firebase.js'
import {doc, onSnapshot} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-firestore.js";
// ////
               
export let currentUser = JSON.parse(localStorage.getItem('currentUser'))? JSON.parse(localStorage.getItem('currentUser')) : 'not found';
export let currentUserBasket = JSON.parse(localStorage.getItem(currentUser.email+'Basket')) ? JSON.parse(localStorage.getItem(currentUser.email+'Basket')) : {}
export let navbarBasketCounter = document.querySelector('.basket-counter')
navbarBasketCounter.innerHTML = Object.keys(currentUserBasket).length
let basket = document.querySelector(".basket-container")
navBar()
function navBar(){
    // navbar toggler btn
    document.querySelector('.toggler-btn').addEventListener('click',function(e){
        this.classList.toggle('close')
    })
    window.onscroll = function(){
        // make navbar fixed
        fixNavbarOnScroll()
    }
}
// navbar
function fixNavbarOnScroll(){
    let nav = document.querySelector('nav')
    if(window.scrollY >= 80){
        nav.setAttribute('style',' position: fixed !important; top: 0;background-color: #fff; padding: 0;') 
        document.querySelector('nav .container-fluid').setAttribute('style',' padding: 0;') 
        document.body.setAttribute('style',' padding-top: '+nav.offsetHeight+'px;') 
    }
    else{
        nav.setAttribute('style',' position: static !important;background-color: #f9f9f9;')
        document.querySelector('nav .container-fluid').setAttribute('style','  padding: 15px 0;') 
        document.body.setAttribute('style',' padding-top: 0;') 
    }
}
// search field 
let searchForm = document.querySelector('.search-form'),
    searchInput = document.querySelector('.search-input')
searchForm.addEventListener('submit', function(e){
    e.preventDefault()
    setSearchKeyword()
})
function setSearchKeyword(){
    localStorage.setItem('searchKeyword',searchInput.value)
    searchInput.value = ''
    location.href = 'searchProduct.html'
}
// check user
let userInfo = document.querySelector('.user-info'),
    userName = document.querySelector('.user-name'),
    navBtns = document.querySelector('.nav-btns')
onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        navBtns.classList.add('d-none')
        userInfo.classList.remove('d-none')
        onSnapshot(doc(firestore, "users", user.uid), (doc) => {
            currentUser = doc.data()
            userName.innerHTML = currentUser.fullName.split(' ')[0]
            if(currentUser.profilePhoto){
                document.querySelector('.user-first-char').setAttribute('style',`background-image: url("/${currentUser.profilePhoto}");`)
            }
            else{
                document.querySelector('.user-first-char').innerHTML = currentUser.fullName.split(' ')[0][0].toUpperCase()
            }
            localStorage.setItem('currentUserKey', user.uid)
            localStorage.setItem('currentUser', JSON.stringify(currentUser))
        });     
    } else {
        currentUser = 'not found'
        navBtns.classList.remove('d-none')
        userInfo.classList.add('d-none')
        localStorage.setItem('currentUserKey', null)
        localStorage.setItem('currentUser', null)
    }
});

// sign out
document.querySelector('.sign-out-btn').addEventListener('click',function(e){
    e.preventDefault()
    auth.signOut();
    localStorage.setItem('currentUserKey', null)
    localStorage.setItem('currentUser', null)
    location.href = 'signIn.html'
})

// basket
let subtotalAmout = 0,
    subtotalAmoutEle = document.querySelector('.basket-total-price'),
    basketItemsCouter = document.querySelector('.item-counter')
document.querySelector('.basket').addEventListener('click',function(){
    openBasket()
})
let checkOutBasketBtn = document.querySelector('#basket-checkout-btn')
function openBasket(){
    if(currentUser!=='not found'){
        basket.innerHTML = ''
        if(Object.keys(currentUserBasket).length){
            subtotalAmout = 0
            basketItemsCouter.innerHTML=`( ${Object.keys(currentUserBasket).length} item)`
            for(let productId in currentUserBasket){
                let ProductCard = createBasketProduct(currentUserBasket[productId])
                basket.appendChild(ProductCard);
                subtotalAmout+=currentUserBasket[productId].quantity * currentUserBasket[productId].price
            }
            checkOutBasketBtn.setAttribute('style','opacity: 1; cursor: pointer;')
        }
        else{
            basketItemsCouter.innerHTML=`( 0 item)`
            basket.innerHTML = `<h4>Your basket is empty</h4>`
            subtotalAmout = 0
            checkOutBasketBtn.setAttribute('style','opacity: .5; cursor: no-drop;')
        }
        subtotalAmoutEle.innerHTML= `$${subtotalAmout}`
        
    }
    else{
        location.href = 'signIn.html'
    }
}

function createBasketProduct(product){
    let productContainer = document.createElement("div")
    productContainer.className = `basket-product align-items-center justify-content-between row w-100`
    productContainer.innerHTML=`
    <div class="product-counter col-1 p-0">
        <div class="counter-up" data-productid='${product.id}' onclick="countUp(event)">+</div>
        <div class="counter-down" data-productid='${product.id}' onclick="countDown(event)">-</div>
    </div>
    <div class="basket-product-img col-2 p-0">
        <img src=${product.image} alt="" class="w-100">
    </div>
    <div class="product-info col-4">
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
    <div class="product-total-quantity-price col-2 text-end">$${product.price*product.quantity}</div>
    <div class="col-2">
        <div class="delete-product ms-auto" data-productid='${product.id}' onclick="deleteProduct(event)">X</div>
    </div>`
    return productContainer
}
window.countUp = countUp
window.countDown = countDown
window.deleteProduct = deleteProduct
window.clearBasket = clearBasket
function countUp(e){
    e.target.parentElement.parentElement.querySelector('.quantity').innerHTML = ++currentUserBasket[e.target.dataset.productid].quantity
    e.target.parentElement.parentElement.querySelector('.product-total-quantity-price').innerHTML = `$`+currentUserBasket[e.target.dataset.productid].quantity * currentUserBasket[e.target.dataset.productid].price
    subtotalAmout+=currentUserBasket[e.target.dataset.productid].price
    subtotalAmoutEle.innerHTML= `$${subtotalAmout}`
    localStorage.setItem(currentUser.email+'Basket',JSON.stringify(currentUserBasket))
}
function countDown(e){
    if(currentUserBasket[e.target.dataset.productid].quantity > 1){
        e.target.parentElement.parentElement.querySelector('.quantity').innerHTML = --currentUserBasket[e.target.dataset.productid].quantity
        e.target.parentElement.parentElement.querySelector('.product-total-quantity-price').innerHTML = `$`+currentUserBasket[e.target.dataset.productid].quantity * currentUserBasket[e.target.dataset.productid].price
        subtotalAmout-=currentUserBasket[e.target.dataset.productid].price
        subtotalAmoutEle.innerHTML= `$${subtotalAmout}`
        localStorage.setItem(currentUser.email+'Basket',JSON.stringify(currentUserBasket))
    }
}

function deleteProduct(e){
    subtotalAmout-=currentUserBasket[e.target.dataset.productid].quantity * currentUserBasket[e.target.dataset.productid].price
    subtotalAmoutEle.innerHTML= `$${subtotalAmout}`
    // 
    e.target.parentElement.parentElement.remove()
    delete currentUserBasket[e.target.dataset.productid]
    // 
    navbarBasketCounter.innerHTML = Object.keys(currentUserBasket).length
    basketItemsCouter.innerHTML=`( ${Object.keys(currentUserBasket).length} item)`
    // 
    let loc = window.location.href.split('/')
    if(loc[loc.length-1]=='shop.html'||loc[loc.length-1]=='searchProduct.html'){
        let removedProduct = document.getElementById(`product${e.target.dataset.productid}`)
        if(removedProduct){
            removedProduct.classList.remove('added-to-basket')
        }
    }
    // 
    localStorage.setItem(currentUser.email+'Basket',JSON.stringify(currentUserBasket))
    if(!Object.keys(currentUserBasket).length){
        basket.innerHTML = `<h4>Your basket is empty</h4>`
        checkOutBasketBtn.setAttribute('style','opacity: .5; cursor: no-drop;')
    }
}
function clearBasket(){
    if(currentUser!=='not found'){
        currentUserBasket = {}
        basket.innerHTML = `<h4>Your basket is empty</h4>`
        navbarBasketCounter.innerHTML = Object.keys(currentUserBasket).length
        basketItemsCouter.innerHTML=`( 0 item)`
        subtotalAmout = 0
        subtotalAmoutEle.innerHTML= `$${subtotalAmout}`
        document.querySelectorAll('.added-to-basket').forEach(product=>{
            product.classList.remove('added-to-basket')
        })
        checkOutBasketBtn.setAttribute('style','opacity: .5; cursor: no-drop;')
        localStorage.setItem(currentUser.email+'Basket',JSON.stringify(currentUserBasket))
    }
}
// handling checkout button event in basket 
checkOutBasketBtn.addEventListener('click', function(){
    if(Object.keys(currentUserBasket).length){
        location.href = 'checkout.html'
    }
})