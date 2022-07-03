import {currentUser, currentUserBasket, navbarBasketCounter} from './navBar.js'
import {doc, updateDoc} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-firestore.js";
import {firestore} from './firebase.js'
let fullName = document.querySelector('#fullName')
let address = document.querySelector('#address')
let mobile = document.querySelector('#mobile')
let email = document.querySelector('#email')
let imgInput = document.querySelector('.img-input')
let userImg = document.querySelector('.profile-img')
let bannerInput = document.querySelector('.banner-input')
let bannerImg = document.querySelector('.all-header')
// fill data
fillData()
function fillData(){
    fullName.value = currentUser.fullName
    email.value = currentUser.email
    if(currentUser.profilePhoto){
        userImg.setAttribute('src',`${currentUser.profilePhoto}`)
    }
    if(currentUser.profilebanner){
        bannerImg.setAttribute('style',`background-image: url("${currentUser.profilebanner}");`)
    }
    if(currentUser.address){
        address.value = currentUser.address
    }
    if(currentUser.mobile){
        mobile.value = currentUser.mobile
    }
    
}

fullName.onblur=function () {
    try {
      validationFullName(this.value)
      this.nextElementSibling.innerText=""
      this.setAttribute('style','border: 1px solid green')
    } catch (e) {
      this.nextElementSibling.innerText=e.message
      this.setAttribute('style','border: 1px solid red')
    }
}
  
address.onblur=function () {
    try {
        validationAdress(this.value)
        this.nextElementSibling.innerText=""
        this.setAttribute('style','border: 1px solid green')
    } catch (e) {
        this.nextElementSibling.innerText=e.message
        this.setAttribute('style','border: 1px solid red')
    }
}
  
mobile.onblur=function () {
    try {
      validationMobil(this.value)
      this.nextElementSibling.innerText=""
      this.setAttribute('style','border: 1px solid green')
    } catch (e) {
      this.nextElementSibling.innerText=e.message
      this.setAttribute('style','border: 1px solid red')
    }
}
// 
document.querySelector('.img-input').addEventListener('change',changeProfileImg)
document.querySelector('.banner-input').addEventListener('change',changeProfileBanner)

function changeProfileImg(){
    let path = this.value.split('\\')
    userImg.setAttribute('src',`img/${path[path.length-1]}`)
}
function changeProfileBanner(){
    let path = this.value.split('\\')
    bannerImg.setAttribute('style',`background-image: url("/img/${path[path.length-1]}");`)
}
// 
let updateBtn = document.querySelector('#update-profile-btn')
let newProfileData = {}
updateBtn.addEventListener('click', updateProfile)
function updateProfile(){
    if(imgInput.value){
        let path = imgInput.value.split('\\')
        newProfileData.profilePhoto = `img/${path[path.length-1]}`
    }
    if(bannerInput.value){
        let path = bannerInput.value.split('\\')
        newProfileData.profilebanner = `/img/${path[path.length-1]}`
    }
    if(fullName.value){
        newProfileData.fullName = fullName.value
    }
    if(address.value){
        newProfileData.address = address.value
    }
    if(mobile.value){
        newProfileData.mobile = mobile.value
    }
    if(fullName.value){
        try {
            validationFullName(fullName.value)
            fullName.nextElementSibling.innerText=""
            fullName.setAttribute('style','border: 1px solid green')
            updateProfileData()
          } catch (e) {
            fullName.nextElementSibling.innerText=e.message
            fullName.setAttribute('style','border: 1px solid red')
          }
    }
}

async function updateProfileData(){
    const userKey = localStorage.getItem('currentUserKey')
    const user = doc(firestore, "users", userKey);
    await updateDoc(user, newProfileData);
    location.href = 'profile.html'

}