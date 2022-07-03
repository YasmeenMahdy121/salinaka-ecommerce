import {currentUser, currentUserBasket, navbarBasketCounter} from './navBar.js'
//// product details js
// var contentOfDetails = document.getElementById('contentOfDetails');
var BrandTitleDes = document.getElementById('BrandTitleDes');
var price = document.getElementById('price');
//
var colOfSmallImage = document.getElementById('colOfSmallImage');
var colOfBigImage = document.getElementById('colOfBigImage');

//  object
var x = await fetch("https://salinaka-e-commerce-default-rtdb.firebaseio.com/products.json");
var res = await x.json();

var product = localStorage.getItem("productDetails");
product = JSON.parse(product);

async function test() {
    BrandTitleDes.innerHTML = `<div>
                                    <h3 class="brand">${product.brand}</h3>
                                    <h2 class="title">${product.title}</h2>
                                    <p class="para">${product.description}</p>
                                </div>`;

    /// add price to html
    price.innerHTML = `<p>$${product.price.toFixed(1)}</p>`;
    
    // add big image
    colOfBigImage.innerHTML = `<img src="${product.image}" alt="">`;
    //// add small image
    var imgArr =[];
    for (var item of res) {
        if(product.brand == item.brand){
            colOfSmallImage.innerHTML += ` <div id="smallImgDiv">
                                            <img src="${item.image}" alt="">
                                        </div>`;
            imgArr.push(item.image);
            // console.log(product.brand); 
        }
    }   
}
test();

//  handle button of basket
var addBtn = document.getElementById('addToBasket');
var removeBtn = document.getElementById('RemoveFromBasket');
var SpanADD = document.getElementById('addedSpan');
var SpanRemove = document.getElementById('removedSpan');
var select = document.getElementById('select');
var colors = document.querySelectorAll('.colors');
var addIcon = document.createElement('i');
addIcon.className = 'fa fa-check';
// check if product in basket
if(currentUser!=='not found' && currentUserBasket[product.id]){
    addBtn.style.display = "none";
    removeBtn.style.display = "inline-block";
    select.value = currentUserBasket[product.id].size
    console.log(product.size)
    colors.forEach(color => {
        if(color.dataset.color == currentUserBasket[product.id].color){
            color.appendChild(addIcon);  
            color.style.transform = 'scale(1)';
        } 
    });
}

// /////// add to basket
//  to get the value of size

function addToBasketBTN(){
    if(currentUser!=='not found'){
        this.style.display = "none";
        removeBtn.style.display = "inline-block";
        SpanADD.style.transform = "translate(0)";
        SpanADD.style.transition = ".8s";
        SpanADD.style.position = "fixed";
        SpanRemove.style.transform = "translate(0,-400%)";       
        setTimeout(function(){
            SpanADD.style.transform = "translate(0,-400%)";   
            SpanADD.style.transition = ".8s";
        }, 3000);
        // add the product to basket
        // let product = JSON.parse(e.target.dataset.product)
        if(currentUser!=='not found'){
            product.size = select.value;
            currentUserBasket[product.id] = {...product}
            localStorage.setItem(currentUser.email+'Basket',JSON.stringify(currentUserBasket))
            navbarBasketCounter.innerHTML = Object.keys(currentUserBasket).length
        }
    }
    else{
        location.href = 'signIn.html'
    }
    // console.log(currentUserBasket);
    console.log(product);
    // console.log(select.value);

}
addBtn.onclick = addToBasketBTN;


// //// removwe from basket

function removeFromBasketBTN(){
    this.style.display = "none";
    addBtn.style.display = "inline-block";
    SpanRemove.style.transform = "translate(0)";
    SpanRemove.style.transition = ".8s";
    SpanRemove.style.position = "fixed";
    SpanADD.style.transform = "translate(0,-400%)";  
    setTimeout(function(){
        SpanRemove.style.transform = "translate(0,-400%)";   
        SpanRemove.style.transition = ".8s";
    }, 3000);
    /// remove product from basket
    delete currentUserBasket[product.id]
    localStorage.setItem(currentUser.email+'Basket',JSON.stringify(currentUserBasket))
    navbarBasketCounter.innerHTML = Object.keys(currentUserBasket).length;
}
removeBtn.onclick = removeFromBasketBTN;


////////////////// handle colors div
ativateColor()
function ativateColor(){
    colors.forEach(color => {
        color.onclick = addingStyle; 
        function addingStyle(){
            color.appendChild(addIcon);  
            color.style.transform = 'scale(1)';
            // update color
            product.color = color.dataset.color;
        }    
    });
}

