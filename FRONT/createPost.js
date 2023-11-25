var valid_test;

function all_filled(entries){
    if(entries.titleInput.value.length == 0){
        valid_test = false;
        console.log("didnt validate title");
    }

    if(entries.timeInput.value.length == 0){
        valid_test = false;
        console.log("didnt validate time");
    }

    if(entries.infoInput.value.length == 0){
        valid_test = false;
        console.log("didnt validate info");
    }

    if(entries.priceInput.value.length == 0 && entries.payCheck.checked == false){
        valid_test = false;
        console.log("didnt validate pay");
    }
    mapMarked();
}

async function sendPost(fData){
    var res = await axios.post(LINK + '/api/userPost', fData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    if(res.data.success){
        alert("Objava je postavljena na sajt.");
        document.location.href = "map.html";
    }else{
        alert("Objava nije uspesno postavljena. Greška: " + res.data.errorMessage);
    }
}

function createPost(entries){
    var formData = new FormData();

    formData.append("uploader", localStorage.getItem("key"));
    formData.append("eventName", entries.titleInput.value);
    formData.append("eventDateTime", entries.timeInput.value);
    formData.append("eventDescription", entries.infoInput.value);
    formData.append("eventType", entries.typeInput.value);

    var postPrice;
    if(entries.payCheck.checked){
        postPrice = 0;
    } else{
        postPrice = entries.priceInput.value;
    }

    var isFree = false;
    if (postPrice == 0){
        isFree = true;
    }

    formData.append("eventPrice", postPrice);
    formData.append("isFree", isFree);

    var location = document.getElementById("map").getAttribute("marked").slice(1,-1).split(",");

    formData.append("lat", parseFloat(location[0]));
    formData.append("lon", parseFloat(location[1]));

    var fileInput = entries.myFile;
    
    formData.append('postImage', fileInput.files[0]);

    sendPost(formData);
}

function validate(){
    var entries = document.getElementById("postForm");
    valid_test = true;
    all_filled(entries);

    if(new Date(entries.timeInput.value) <= new Date()){
        valid_test = false;
    }

    if(valid_test){
        document.getElementById("BadEntriesWarning").classList.add("d-none");
        createPost(entries);
    }else document.getElementById("BadEntriesWarning").classList.remove("d-none");
}

function payChecked(){
    var pInput = document.getElementById("priceInput");
    if (document.getElementById("payCheck").checked){
        pInput.value = null;
        pInput.disabled = true;
    }else pInput.disabled = false;
}

function mapMarked(){
    var mapInput = document.getElementById("map");
    if(!mapInput.hasAttribute("marked")){
        valid_test = false;
    }
}

//reset the form when page reloads
$(document).ready(function () {
    resetForms();
});

function resetForms() {
    document.forms['postForm'].reset();
}