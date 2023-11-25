async function setupFyp(){

    var postedAnything = false;

    let allPosts = (await axios.get(LINK + '/api/userPosts')).data;
  
    if (allPosts.success){
    var uPosts = allPosts.userPosts;

    for(i=0; i<uPosts.length; i++){
            let card = 
            '<div class="my-5 ml-5">'+
                '<div class="card dropShadow" style="width: 18rem">'+
                    `<img src="${LINK + "/" + uPosts[i].postImage}" class="card-img-top" alt="...">`+
                    '<hr>'+
                    '<div class="card-body">'+
                        `<h5 class="card-title">${uPosts[i].eventName}</h5>`+
                        `<p class="card-text">${uPosts[i].eventDescription}</p>`+
                        `<a href="map.html?lat=${uPosts[i].lat}&lng=${uPosts[i].lon}" class="btn btn-primary">Saznajte više</a>`+
                    '</div>'+
                '</div>'+
            '</div>'
            document.getElementById("cardContainer").innerHTML += card;

            postedAnything = true;
    }
    }

    if(!postedAnything){

        let apologyCard = 
        '<div class="my-auto ml-5 py-5">'+
            '<div class="card dropShadow" style="width: 30rem">'+
                '<div class="card-body">'+
                    `<h5 class="card-title">Ništa nije pronađeno!</h5>`+
                    `<p class="card-text">Trenutno nema objava na sajtu.</p>`+
                    `<a href="map.html" class="btn btn-primary">Pogledajte sve objave na mapi</a>`+
                '</div>'+
            '</div>'+
        '</div>'

        document.getElementById("cardContainer").innerHTML += apologyCard;
    }

}

setupFyp();
