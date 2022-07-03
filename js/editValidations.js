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