// //////// firebase
import {signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js";
import {doc, onSnapshot} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-firestore.js";
import {auth, firestore} from './firebase.js'

// sign in js
// labels var
var label1 = document.getElementById('emailLabel');
var label2 = document.getElementById('passLabel');

/// inputs var
var input1 = document.getElementById("email");
var input2 = document.getElementById("pass");

/// content varibles
var content1 = "Email";
var content2 = "Password";

label1.innerHTML = content1;
label2.innerHTML = content2;
// 
var flag = false;
//#region sign in page
document.getElementById('signUpForm').onsubmit = function(e){
    var email = input1.value;
    var password = input2.value;
    e.preventDefault();  
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {  
        const user = userCredential.user;
        onSnapshot(doc(firestore, "users", user.uid), (doc) => {
            let currentUser = doc.data()
            localStorage.setItem('currentUserKey', user.uid)
            localStorage.setItem('currentUser', JSON.stringify(currentUser))
            this.submit();
        });   
        //      
    })
    .catch((error) => {
        document.getElementById('forError').style.display ="flex";
        document.getElementById('signUpSection').style.border = "1px solid red";
    });
}