function validationFullName(fullName) {
   
    var regex = new RegExp(/^[a-z]{3,}\s[a-z]{3,}$/,"i");
    if (regex.test(fullName)) {
        return true
    }
    else
    {
       if (fullName !== '') {
        var error = new TypeError("Full name is no matching format");
        throw error
       } else {
        var error = new TypeError("Full Name is Required");
        throw error;
       }
    }
}

function validateEmail(email){
    var regex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    if(regex.test(email))
        return true;
    else{
        if (email !== "") {
            var error = new TypeError("Email  is no matching format");
        throw error;
        } else {
            var error = new TypeError("Email is Required");
        throw error;
        }
        
    }
}


function validationAdress(adress) {
   
    var regex = new RegExp(/^[a-z]{3,14}$/,"i");
    if (regex.test(adress)) {
        return true
    }
    else
    {
        if (adress !== "") {
            let error = new TypeError("Adress is no matching format")
        throw error
        } else {
            let error = new TypeError("Adress is Required")
        throw error
        }
        
    }
}

function validationMobil(mobile) {
   
    var regex = new RegExp(/^(01)(0|1|2|5)[0-9]{8}$/);
    if (regex.test(mobile)) {
        return true
    }
    else
    {
        if (mobile !== '') {
            let error = new TypeError("Mobile is no matching format")
        throw error
        } else {
            let error = new TypeError("Mobile is Required")
        throw error
        }
       
    }
}




// ////// step3 Validation ------------------------------------------------

function validationName(Name) {
   
    var regex = new RegExp(/^[a-z]{3,}\s[a-z]{3,}$/,"i");
    if (regex.test(Name)) {
        return true
    }
    else
    {
       if (Name !== '') {
        var error = new TypeError("Name is no matching format");
        throw error
       } else {
        var error = new TypeError("Name is Required");
        throw error;
       }
    }
}

function validateCardBumber(cardNumber){
    var regex = new RegExp(/^[0-9]{14}$/);
    if(regex.test(cardNumber))
        return true;
    else{
        if (cardNumber !== "") {
            var error = new TypeError("card Number  is no matching format");
        throw error;
        } else {
            var error = new TypeError("card Number is Required");
        throw error;
        }
        
    }
}


function validationDate(Date) {
   
    var regex = new RegExp( /^\d{2}([./-])\d{2}\1\d{4}$/,"i");
    if (regex.test(Date)) {
        return true
    }
    else
    {
        if (Date !== "") {
            let error = new TypeError("Date is no matching format")
        throw error
        } else {
            let error = new TypeError("Date is Required")
        throw error
        }
        
    }
}

function validationCode(Code) {
   
    var regex = new RegExp(/^[0-9]{5}$/);
    if (regex.test(Code)) {
        return true
    }
    else
    {
        if (Code !== '') {
            let error = new TypeError("Code is no matching format")
        throw error
        } else {
            let error = new TypeError("Code is Required")
        throw error
        }
       
    }
}

