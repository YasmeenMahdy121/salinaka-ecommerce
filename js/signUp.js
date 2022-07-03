// //////// firebase
import {createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js";
import {setDoc, doc} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-firestore.js";
import {auth, firestore} from './firebase.js'

////////////////

let flag1 = false;
let flag2 = false;
let flag3 = false;

// sign Up js
// labels var
var label1 = document.getElementById('fullNameLabel');
var label2 = document.getElementById('emailLabel');
var label3 = document.getElementById('passLabel');

/// inputs var
var input1 = document.getElementById("fullName");
var input2 = document.getElementById("email");
var input3 = document.getElementById("pass");

label1.innerHTML = "* Full Name";
label2.innerHTML = "* Email";
label3.innerHTML = "* Password";
/// full name validation //////////
input1.onkeyup = function(){
    try{
        fullNameValidation(this.value);
        label1.innerHTML = "* Full Name";
        label1.style.color = "black";
        input1.style.border = "1px solid rgb(150, 150, 150)";
        flag1 = true;
    } catch(e){
        label1.innerHTML = "invalid Full Name format";
        label1.style.color = "red";
        input1.style.border = "1px solid red";
        flag1 = false;
    }
}
input1.onblur = function(){
    if(!this.value){        
        label1.innerHTML = "Full Name is required";
        label1.style.color = "red";
        input1.style.border = "1px solid red";
        flag1 = false;
    } 
}
/// validation of email  ///////////////////////
input2.onkeyup = function(){
    try{
        emailValidation(this.value);
        label2.innerHTML = "* Email";
        label2.style.color = "black";
        input2.style.border = "1px solid rgb(150, 150, 150)";
        flag2=true;
    }
    catch(e){
        label2.innerHTML = "Email is not valid";
        label2.style.color = "red";
        input2.style.border = "1px solid red";
        flag2 = false;
    }

}
input2.onblur = function(){
    if(!this.value){        
        label2.innerHTML = "Email is required";
        label2.style.color = "red";
        input2.style.border = "1px solid red";
        flag2 = false;
    } 
}
///// validation of password
input3.onkeyup = function(){    
    try{
        passwordValidation(input3);
        label3.innerHTML = "* Password";
        label3.style.color = "black";
        input3.style.border = "1px solid rgb(150, 150, 150)";
        flag3 = true;
    } catch(e){
        label3.innerHTML = "Password should not be less than 6 characters";
        label3.style.color = "red";
        input3.style.border = "1px solid red";
        flag3 = false;
    }
}
input3.onblur = function(){
    if(!this.value){        
        label3.innerHTML = "Password is required";
        label3.style.color = "red";
        input3.style.border = "1px solid red";
        flag3 = false;
    } 
}

//// button form validation
document.getElementById('signUpForm').onsubmit = function(e){
    var name = input1.value;
    var email = input2.value;
    var passWord = input3.value;
    e.preventDefault();   
    if(flag1&&flag2&&flag3){
        createUserWithEmailAndPassword(auth, email, passWord)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            let date = new Date()
            const userData = {
                fullName: name,
                email: email,
                password: passWord,
                dateJoined: date.toDateString()
            }
            setDoc(doc(firestore, "users", user.uid), userData).then(()=>{
                localStorage.setItem('currentUserKey', user.uid)
                localStorage.setItem('currentUser', JSON.stringify(userData))
                this.submit();
            })
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // 
            document.querySelector('.forError').style.display = 'flex'
            document.querySelector('#signUPcontainer').style.border = `1px solid red`
        });
    } 
}