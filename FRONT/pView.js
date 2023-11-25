var postData;

async function getUserInfo(targetId){
    var userData = (await axios.post(LINK + "/api/user/valueSearch",{
        target: "_id",
        value: targetId
    })).data;
    if(userData.success){
        return(userData.fUser[0]);
    }else{
        return("ERROR");
    }
}

async function populatePost(postData){
    var uploaderInfo = await getUserInfo(postData.uploadedBy);

    if(postData.uploadedBy == localStorage.getItem("key")){
        document.getElementById("postControls").classList.remove("d-none");
    } else{
        document.getElementById("postControls").classList.add("d-none");
    }

    document.getElementById("postTitle").innerHTML = postData.eventName;
    document.getElementById("postPrice").innerHTML = `Cena ulaznice: ${postData.eventPrice}`;
    document.getElementById("postDate").innerHTML = `Datum događaja: ${(postData.eventDateTime).split("T")[0]}, sa početkom u ${(postData.eventDateTime).split("T")[1]}`;
    
    
    document.getElementById("whoUploaded").innerHTML = `Objavio: ${uploaderInfo.username}`;

    document.getElementById("pImg").src = (LINK + "/" + postData.postImage);

    document.getElementById("postInfo").innerHTML = postData.eventDescription;

    document.getElementById("rsvpCount").innerHTML = `Broj zainteresovanih: ${postData.reserves.length}`;


    if(localStorage.getItem("key") != null){
        if(postData.reserves.includes(localStorage.getItem("key"))){
            document.getElementById("unRsvpButton").classList.remove("d-none");
            document.getElementById("rsvpButton").classList.add("d-none");
        }else{
            document.getElementById("unRsvpButton").classList.add("d-none");
            document.getElementById("rsvpButton").classList.remove("d-none");
        }
    }
}

async function getPostData(pId){

    postData = (await axios.post(LINK + "/api/userPost/valueSearch",{
        target: "_id",
        value: pId
    })).data.fPost[0];

    populatePost(postData);
}

function initPost(){
    var searchParams = new URLSearchParams(window.location.search);
    var postId = searchParams.get("postId");
    getPostData(postId);
}

async function delPost(){
    var passInput = prompt("Unesite lozinku naloga da obrišete objavu:");
    var currUser = (await getUserInfo(localStorage.getItem("key")));

    if(passInput == currUser.password){
        await axios.post(LINK + "/api/userPost/deletePost",{
            targetId: postData._id
        })
        alert("Objava obrisana.");
        document.location = "map.html";       
    }
}

async function addRSVP(){
    var currList = postData.reserves;
    var count = currList.push(localStorage.getItem("key"))

    console.log("currlist = " + currList);
    console.warn("KEY: " + localStorage.getItem("key"))

    let nPostInfo = (await axios.put(LINK + '/api/userPost',{
        id: postData._id,
        nReserves: currList
    })).data;

    if(nPostInfo.success){
        document.getElementById("unRsvpButton").classList.remove("d-none");
        document.getElementById("rsvpButton").classList.add("d-none");
    }else{
        console.log(nPostInfo.errorMessage);
    }

    getPostData(postData._id);
}

async function removeRSVP(){
    var currList = postData.reserves;
    var index = currList.indexOf(localStorage.getItem("key"));
    if (index > -1) { 
        currList.splice(index, 1);
    }

    console.log("currlist = " + currList);
    console.warn("KEY: " + localStorage.getItem("key"))

    let nPostInfo = (await axios.put(LINK + '/api/userPost',{
        id: postData._id,
        nReserves: currList
    })).data;

    if(nPostInfo.success){
        document.getElementById("unRsvpButton").classList.add("d-none");
        document.getElementById("rsvpButton").classList.remove("d-none");
    }else{
        console.log(nPostInfo.errorMessage);
    }

    getPostData(postData._id);
}

window.onload = initPost();