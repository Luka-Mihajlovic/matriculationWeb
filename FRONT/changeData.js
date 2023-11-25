var valid_test;

async function fillDisabled(){
    let userData = (await axios.post(LINK + '/api/user/valueSearch',{
        target: "_id",
        value: localStorage.getItem("key")
    })).data.fUser[0];

    document.getElementById("registerEmailInput").value = userData.email;
    document.getElementById("usernameInput").value = userData.username;
    document.getElementById("passwInput").value = userData.password;

    var checkChildren = document.getElementById("typeInput").children;

    for(var i=0; i<checkChildren.length; i++){
        if(checkChildren[i].nodeName == "INPUT"){
            if(userData.interests.includes(checkChildren[i].value)){
                checkChildren[i].checked = true;
            }
        }
    }

}

function all_filled(entries){
    if(entries.passwInput.value.length == 0){
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

function regex_valid_pass(entries){
    var pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    var tekst = entries.passwInput.value;
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
    var password = entries.passwInput.value;
    var repeatPass = entries.repeatPassInput.value;
    if(password != repeatPass){
        valid_test = false;
        document.getElementById("ErrorRepeatWarning").classList.remove("d-none");
    } else{
        console.log("validirana ponovljena lozinka korisnika...");
        document.getElementById("ErrorRepeatWarning").classList.add("d-none");
    }
}

async function updateRequest(pw, likes){
    let regInfo = (await axios.put(LINK + '/api/user',{
        id: localStorage.getItem("key"),
        newPassword: pw,
        newInterests: likes
    })).data;

    if(regInfo.success){
        alert("Informacije na nalogu su izmenjene.");
        window.location = "index.html";
    }else{
        console.log(regInfo.errorMessage);
    }
}

function updateU(entries){
    var userPass = entries.passwInput.value;
    var interests = [];

    document.getElementsByName("interests").forEach(element => {
        if(element.checked == true){
            interests.push(element.value);
        }
    });

    updateRequest(userPass, interests);
}

function validate(){
    var entries = document.getElementById("registerForm");
    valid_test = true;
    all_filled(entries);
    regex_valid_pass(entries);
    regex_valid_repeat(entries);

    if(valid_test){
        updateU(entries);
    }
}

window.onload = fillDisabled();