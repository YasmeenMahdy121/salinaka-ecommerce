import {currentUser, currentUserBasket, navbarBasketCounter} from './navBar.js'
var checkoutSteps = 3;
var currentStep = 1;
let steps =$(".step")


$('.button-next-step').click(function() {

  
    if(currentStep < checkoutSteps){
      if (currentStep == 2) {
                var fullName = document.getElementById("fullName");
          var email = document.getElementById("email");
          var adress = document.getElementById("adress");
          var mobile = document.getElementById("mobile");

          
          try {
            if (validationFullName(fullName.value) == true&&validateEmail(email.value) == true&&validationAdress(adress.value) == true&&validationMobil(mobile.value) == true) {
              document.querySelector('#nextBtn').removeAttribute("disabled")
              $(".checkout-step-"+currentStep+"").hide();
              currentStep++;
              
              $(".checkout-step-"+currentStep+"").show();
              for (let i = 0; i < steps.length; i++) {
                steps[i].classList.remove("active")
                
              }
              steps[currentStep-1].classList.add("active")
            
            }
          
          } catch (error) {
            document.querySelector('#nextBtn').setAttribute("disabled","")
           
          
           
            isRequired(fullName,"fullName")
            isRequired(email,"Email")
            isRequired(adress,"Adress")
            isRequired(mobile,"Mobile")
            
            
          }
      }
      else
      {
        $(".checkout-step-"+currentStep+"").hide();
        currentStep++;
        
        $(".checkout-step-"+currentStep+"").show();
        for (let i = 0; i < steps.length; i++) {
          steps[i].classList.remove("active")
          
        }
        steps[currentStep-1].classList.add("active")
      }
      
      
      // Handilng steps

   
    }
});
$('.button-prev-step').click(function() {
    if(currentStep > 1){
      
      $(".checkout-step-"+currentStep+"").hide();
      currentStep--;
      $(".checkout-step-"+currentStep+"").show();
      for (let i = 0; i < steps.length; i++) {
        steps[i].classList.remove("active")
        
      }
      steps[currentStep-1].classList.add("active")
    }
});
$('.button-prev-step').click(function() {
  if(currentStep == 3){
    
   
    
  $(".checkout-step-"+currentStep+"").hide();
  currentStep--;
  $(".checkout-step-"+currentStep+"").show();
  }
})

function isRequired(inputFeild,feildName) {
  if (inputFeild.value == '') {
    inputFeild.nextElementSibling.innerText=`${feildName} is required`
  }
  else
  {
    
      if (inputFeild.id == "fullName") {
       try {
        validationFullName(inputFeild.value)
        inputFeild.nextElementSibling.innerText=""
       } catch (error) {
        inputFeild.nextElementSibling.innerText=error.message
       }
      } 
      else  if (inputFeild.id == "email") {
        try {
          validateEmail(inputFeild.value)
         inputFeild.nextElementSibling.innerText=""
        } catch (error) {
         inputFeild.nextElementSibling.innerText=error.message
        }
       } 
       else  if (inputFeild.id == "adress") {
        try {
          validationAdress(inputFeild.value)
         inputFeild.nextElementSibling.innerText=""
        } catch (error) {
         inputFeild.nextElementSibling.innerText=error.message
        }
       }
       else  if (inputFeild.id == "mobile") {
        try {
          validationMobil(inputFeild.value)
         inputFeild.nextElementSibling.innerText=""
        } catch (error) {
         inputFeild.nextElementSibling.innerText=error.message
        }
       }

    
    
  }

}


function toChecked() {
  let pymentChecked = document.getElementById("pymentChecked1")
  
  let labelOne=document.getElementById("label1")
    let labelTwo=document.getElementById("label2")
  if(pymentChecked.checked == true){
    
    document.getElementById('credit').style.display='block';
    labelOne.style.color="black"
    labelTwo.style.color="gray"
  }
    

    else {document.getElementById('credit').style.display='none';
        labelTwo.style.color="black"
        labelOne.style.color="gray"
  }

    

  
  
}

window.toChecked=toChecked



document.getElementById("fullName").onblur=function () {
  

 
  
  try {
    validationFullName(this.value)
    this.nextElementSibling.innerText=""
  // console.log(nameFeedback);

  } catch (e) {
    
    this.nextElementSibling.innerText=e.message
    
  }
}

document.getElementById("email").onblur=function () {
  
  try {
    validateEmail(this.value)
    this.nextElementSibling.innerText=""
    document.querySelector('#nextBtn').disabled = false
  } catch (e) {
    this.nextElementSibling.innerText=e.message
  }
}

document.getElementById("adress").onblur=function () {
  
  try {
    validationAdress(this.value)
    this.nextElementSibling.innerText=""
  } catch (e) {
    this.nextElementSibling.innerText=e.message
  }
}

document.getElementById("mobile").onblur=function () {
  try {
    validationMobil(this.value)
    this.nextElementSibling.innerText=""
  } catch (e) {
    this.nextElementSibling.innerText=e.message
  }
}




// ------- handling step3 validate



document.getElementById("Name").onblur=function () {
  

 
  
  try {
    validationName(this.value)
    this.nextElementSibling.innerText=""
  // console.log(nameFeedback);

  } catch (e) {
    
    this.nextElementSibling.innerText=e.message
    
  }
}

document.getElementById("card").onblur=function () {
  
  try {
    validateCardBumber(this.value)
    this.nextElementSibling.innerText=""
   
  } catch (e) {
    this.nextElementSibling.innerText=e.message
  }
}

document.getElementById("date").onblur=function () {
  
  try {
    validationDate(this.value)
    this.nextElementSibling.innerText=""
  } catch (e) {
    this.nextElementSibling.innerText=e.message
  }
}

document.getElementById("ccv").onblur=function () {
  try {
    validationCode(this.value)
    this.nextElementSibling.innerText=""
  } catch (e) {
    this.nextElementSibling.innerText=e.message
  }
}
// order summary
let subtotalAmout = 0
let checkoutSubtotalAmoutEle = document.querySelector('.checkoutSubtotalAmoutEle')
let checkoutSubTotalPrice = document.querySelector('.checkoutSubTotalPrice')
let checkoutTotalPrice = document.querySelector('.checkoutTotalPrice')
let checkoutProducts = document.querySelector('.checkoutProducts')
let internationalShipping = document.querySelector('.internationalShipping')

orderSummary()
function orderSummary(){
    if(currentUser!=='not found'){
        checkoutProducts.innerHTML = ''
        if(Object.keys(currentUserBasket).length){
            for(let productId in currentUserBasket){
                let ProductCard = createBasketProduct(currentUserBasket[productId])
                checkoutProducts.appendChild(ProductCard);
                subtotalAmout+=currentUserBasket[productId].quantity * currentUserBasket[productId].price
            }
        }
        else{
            subtotalAmout = 0
        }
        checkoutSubtotalAmoutEle.innerHTML = `$${subtotalAmout}`
        checkoutSubTotalPrice.innerHTML = `$${subtotalAmout}`
        checkoutTotalPrice.innerHTML = `$${subtotalAmout}`
        
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
    checkoutSubtotalAmoutEle.innerHTML= `$${subtotalAmout}`
    checkoutSubTotalPrice.innerHTML = `$${subtotalAmout}`
    checkoutTotalPrice.innerHTML = `$${subtotalAmout}`
    localStorage.setItem(currentUser.email+'Basket',JSON.stringify(currentUserBasket))
}
function countDown(e){
    if(currentUserBasket[e.target.dataset.productid].quantity > 1){
        e.target.parentElement.parentElement.querySelector('.quantity').innerHTML = --currentUserBasket[e.target.dataset.productid].quantity
        e.target.parentElement.parentElement.querySelector('.product-total-quantity-price').innerHTML = `$`+currentUserBasket[e.target.dataset.productid].quantity * currentUserBasket[e.target.dataset.productid].price
        subtotalAmout-=currentUserBasket[e.target.dataset.productid].price
        checkoutSubtotalAmoutEle.innerHTML= `$${subtotalAmout}`
        checkoutSubTotalPrice.innerHTML = `$${subtotalAmout}`
        checkoutTotalPrice.innerHTML = `$${subtotalAmout}`
        localStorage.setItem(currentUser.email+'Basket',JSON.stringify(currentUserBasket))
    }
}

function deleteProduct(e){
    subtotalAmout-=currentUserBasket[e.target.dataset.productid].quantity * currentUserBasket[e.target.dataset.productid].price
    checkoutSubtotalAmoutEle.innerHTML= `$${subtotalAmout}`
    checkoutSubTotalPrice.innerHTML = `$${subtotalAmout}`
    checkoutTotalPrice.innerHTML = `$${subtotalAmout}`
    // 
    e.target.parentElement.parentElement.remove()
    delete currentUserBasket[e.target.dataset.productid]
    // 
    navbarBasketCounter.innerHTML = Object.keys(currentUserBasket).length
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
}

document.querySelector('#shipping').addEventListener('click',function(){
  if(this.checked){
    checkoutTotalPrice.innerHTML = `$${subtotalAmout+50}`
    internationalShipping.innerHTML = `$50`
  }
  else{
    checkoutTotalPrice.innerHTML = `$${subtotalAmout}`
    internationalShipping.innerHTML = `$0.00`
  }
})