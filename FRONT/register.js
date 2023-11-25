var valid_test;

function all_filled(entries){
    if(entries.registerEmailInput.value.length == 0){
        valid_test = false;
        document.getElementById("EmptyMailWarning").classList.remove("d-none");
    } else document.getElementById("EmptyMailWarning").classList.add("d-none");

    if(entries.usernameInput.value.length == 0){
        valid_test = false;
        document.getElementById("EmptyNameWarning").classList.remove("d-none");
    } else document.getElementById("EmptyNameWarning").classList.add("d-none");

    if(entries.passInput.value.length == 0){
        valid_test = false;
        document.getElementById("EmptyPassWarning").classList.remove("d-none");
    } else document.getElementById("EmptyPassWarning").classList.add("d-none");

    if(entries.repeatPassInput.value.length == 0){
        valid_test = false;
        document.getElementById("EmptyRepeatWarning").classList.remove("d-none");
    } else document.getElementById("EmptyRepeatWarning").classList.add("d-none");

    var atLeastOne = false;
    document.getElementsByName("interests").forEach(element => {
        if(element.checked == true){
            atLeastOne = true;
        }
    });

    if(!atLeastOne){
        document.getElementById("EmptyInterestsWarning").classList.remove("d-none");
        valid_test = false;
    }else document.getElementById("EmptyInterestsWarning").classList.add("d-none");
}

function regex_valid_mail(entries){
    var pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    var tekst = entries.registerEmailInput.value;
    var test = tekst.match(pattern);

    if (test == null) {
        document.getElementById("ErrorMailWarning").classList.remove("d-none");
        valid_test = false;
    } else{
      console.log("validiran email korisnika...");
      document.getElementById("ErrorMailWarning").classList.add("d-none");
    }
}

function regex_valid_pass(entries){
    var pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    var tekst = entries.passInput.value;
    var test = tekst.match(pattern);
 
    if (test == null) {
         document.getElementById("ErrorPassWarning").classList.remove("d-none");
         valid_test = false;
     } else{
       console.log("validirana lozinka korisnika...");
       document.getElementById("ErrorPassWarning").classList.add("d-none");
     }
 }

 function regex_valid_repeat(entries){
    var password = entries.passInput.value;
    var repeatPass = entries.repeatPassInput.value;
    if(password != repeatPass){
        valid_test = false;
        document.getElementById("ErrorRepeatWarning").classList.remove("d-none");
    } else{
        console.log("validirana ponovljena lozinka korisnika...");
        document.getElementById("ErrorRepeatWarning").classList.add("d-none");
    }
}

function regex_valid_name(entries){
    var pattern = /^[A-Za-z0-9]{1,30}$/;
    var tekst = entries.usernameInput.value;
    var test = tekst.match(pattern);

    if (test == null) {
        document.getElementById("ErrorNameWarning").classList.remove("d-none");
        valid_test = false;
    } else{
      console.log("validirano ime korisnika...");
      document.getElementById("ErrorNameWarning").classList.add("d-none");
    }
}

async function registrationRequest(mail, name, pw, likes){

    let uniqueCheck = true;

    let mailMatch = (await axios.post(LINK + '/api/user/valueSearch',{
        target: "email",
        value: mail
    })).data;

    let userMatch = (await axios.post(LINK + '/api/user/valueSearch',{
        target: "username",
        value: name
    })).data;

    // check uniqueness
    if(userMatch.found){
        document.getElementById("TakenNameWarning").classList.remove("d-none");
        uniqueCheck = false;
    }else{
        document.getElementById("TakenNameWarning").classList.add("d-none");
    }   
    
    //mail check
    if(mailMatch.found){
        document.getElementById("ErrorMailWarning").classList.remove("d-none");
        uniqueCheck = false;
    }else{
        document.getElementById("ErrorMailWarning").classList.add("d-none");
    }
    
    if(uniqueCheck){
        let regInfo = (await axios.post(LINK + '/api/user',{
            email: mail,
            username: name,
            password: pw,
            interests: likes
        })).data;
    
        if(regInfo.success){
            alert("Registrovani ste, probajte da se prijavite!");
            document.location.href = "index.html";
        }else{
            console.log(regInfo.errorMessage);
        }
    }
}

function registerUser(entries){
    var userMail = entries.registerEmailInput.value;
    var userName = entries.usernameInput.value;
    var userPass = entries.passInput.value;
    var interests = [];

    document.getElementsByName("interests").forEach(element => {
        if(element.checked == true){
            interests.push(element.value);
        }
    });

    console.log(interests[0]);
    registrationRequest(userMail, userName, userPass, interests);
}

function validate(){
    var entries = document.getElementById("registerForm");
    valid_test = true;
    all_filled(entries);
    regex_valid_mail(entries);
    regex_valid_name(entries);
    regex_valid_pass(entries);
    regex_valid_repeat(entries);

    if(valid_test){
        registerUser(entries);
    }
}
