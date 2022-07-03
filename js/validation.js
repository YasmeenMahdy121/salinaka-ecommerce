//// full name validation
function fullNameValidation(name){
    var regex = new RegExp(/^[a-z]{3,}\s[a-z]{3,}$/,"i");
    if(regex.test(name))
        return true;
    else{
        var error = new TypeError("Name was not is the correct format");
        throw error;
    }
}

// // email validation
function emailValidation(email){
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if(filter.test(email)){
        return true;
    } else{
        var error = new TypeError("Email was not is the correct format");
        throw error;
    }
} 

//// password validation
function passwordValidation(pass){
    // /^[a-zA-Z0-9!@#$%^&*]{6,16}$/
    var regex = new RegExp(/^[a-zA-Z0-9!@#$%^&*]{6,}$/,"i");
    if(regex.test(pass.value)){
        return true;
    } 
    else{
        var error = new TypeError("password was not is the correct format");
        throw error;
    }
}
////