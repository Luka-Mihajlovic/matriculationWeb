const LINK = 'http://localhost:3000';

function checkLoginStatus(){
    if (localStorage.getItem("key") == null) {
        document.getElementById("loginLi").classList.remove("d-none");
        document.getElementById("accInfoLi").classList.add("d-none");
      }else{
        document.getElementById("loginLi").classList.add("d-none");
        document.getElementById("accInfoLi").classList.remove("d-none");
      }
}

function login(elem){
    var entries = elem.parentNode;
    
    var mail = entries.emailInput.value;
    var pass = entries.passInput.value;

    loginUser(mail,pass)
}

async function cascadeDelete(uid){
    var allPosts = (await axios.get(LINK + '/api/userPosts')).data;
    var postsToDelete = []
            
    if (allPosts.success){
        var uPosts = allPosts.userPosts;
        var i;

        for(i=0; i<uPosts.length; i++){
            if(uPosts[i].uploadedBy == uid){
                postsToDelete.push(uPosts[i]._id);
            }
        }
        console.warn(postsToDelete);
        if(postsToDelete.length !=0 ){
            for(i=0; i<postsToDelete.length; i++){
                await axios.post(LINK + "/api/userPost/deletePost",{
                    targetId: postsToDelete[i]
                })
            }
        }
    }      
    logout();   
}

async function delAcc(){
    let pw = prompt("Molimo Vas potvrdite lozinku");

    let correctPw = (await axios.post(LINK + '/api/user/valueSearch',{
        target: "_id",
        value: localStorage.getItem("key")
    })).data.fUser[0].password;

    var accId;
    accId = localStorage.getItem("key");

    if(pw==correctPw){
        axios.post(LINK + '/api/user/deleteUser',{
            targetId: accId
        }).then((result) => {
            if(result.data.success){
                console.warn("USER DELETED - " + result.data.deleted);
                alert("Nalog je obrisan.");
                cascadeDelete(accId);
            }else{
                console.log(result.data.errorMessage);
            }
          })
    }
}

function changeAcc(){
    console.log("woo");
}

function logout(){
    localStorage.removeItem("key");
    localStorage.removeItem("uName");
    location.reload();
}

async function loginUser(mail, pass)
{
    var email = mail;
    var password = pass;

    let login = (await axios.post(LINK + '/api/user/login',{
        email: email,
        password: password
    })).data;

    if(login.success)
    {
        console.log("SUCCESS");
        localStorage.setItem("key",login.id);
        localStorage.setItem("uName",login.username);
        location.reload();
    }else{
        alert("Nalog sa ovakvim podacima nije pronađen.");
    }
}

window.onload = checkLoginStatus();