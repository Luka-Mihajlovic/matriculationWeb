// Initialize and add the map
let map;

async function initMap(filterParams) {
  var searchParams = new URLSearchParams(window.location.search);
  var posLat = searchParams.get("lat");
  var posLng = searchParams.get("lng");

  var position

  if(posLat == null || posLng == null){
     position = { lat: 43.932, lng: 21.371 };
  }else{
     position = { lat: parseFloat(posLat), lng: parseFloat(posLng) };
  }
  
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerView } = await google.maps.importLibrary("marker");

  // The map, centered at Uluru
  map = new Map(document.getElementById("map"), {
    zoom: 12,
    center: position,
    mapId: "DEMO_MAP_ID",
  });

  let allPosts = (await axios.get(LINK + '/api/userPosts')).data;
  
  if (allPosts.success){
    var uPosts = allPosts.userPosts;

    for(i=0; i<uPosts.length; i++){

      //filter by name
      if(!uPosts[i].eventName.toLowerCase().includes(filterParams.titleFilter.toLowerCase())){
        continue;
      }

      //filter by type
      if(uPosts[i].eventType.toLowerCase() != filterParams.typeFilter.toLowerCase() && filterParams.typeFilter != ""){
        continue;
      }

      //filter by date
      if(new Date(uPosts[i].eventDateTime) <= filterParams.dateFilter){
        continue;
      }

      //filter by paid
      if(uPosts[i].eventPrice != 0 && !filterParams.showPaid){
        continue;
      }

      //filter if followed
      if(!(uPosts[i].reserves.includes(localStorage.getItem("key"))) && filterParams.showFollowed){
        continue;
      }

      //filter by owned
      if(uPosts[i].uploadedBy != localStorage.getItem("key")  && filterParams.showYours){
        continue;
      }

      //delete if it's over
      if(new Date(uPosts[i].eventDateTime) < new Date()){
        await axios.post(LINK + "/api/userPost/deletePost",{
          targetId: uPosts[i]
      })
        continue;
      }

      let contentString =
    '<div id="content" class="text-center">'
          //trim name if >50 characters
          var postName;
          if(uPosts[i].eventName.length > 50){
            postName = ((uPosts[i].eventName).substring(0, 50) + "...");
          }else{
            postName = (uPosts[i].eventName);
          }

        contentString+=
        `<h5 id="firstHeading" class="darkFont">${postName}</h5>` +
        `<p> ${(uPosts[i].eventDateTime).split("T")[0]}, sa početkom u ${(uPosts[i].eventDateTime).split("T")[1]} </p>` +
        "<hr>"+
          '<div id="bodyContent" style="overflow: hidden; word-wrap:break-word;">'

          //trim the description if >100 characters
          var desc;
          if(uPosts[i].eventDescription.length > 100){
            desc = ((uPosts[i].eventDescription).substring(0, 100) + "...");
          }else{
            desc = (uPosts[i].eventDescription);
          }
          
          //back to the contentstring
          contentString+=
            `<p> ${desc} </p>` +
            `<a href="viewPost.html?postId=${uPosts[i]._id}"> Saznajte više </a>`+
            "<br>"

            var priceListing;
            if(uPosts[i].eventPrice != 0){
              priceListing = uPosts[i].eventPrice + "RSD"
            }else{
              priceListing = "Besplatno!"
            }

            contentString+=
            `<p> Cena ulaznice: ${priceListing} </p>`+
          "</div>"+
    "</div>";

    let infowindow = new google.maps.InfoWindow({
      content: contentString,
      maxWidth: 500
    });

    let marker = new google.maps.Marker({
        position: new google.maps.LatLng(uPosts[i].lat, uPosts[i].lon),
        title: `${uPosts[i].eventType}`
      });
      marker.setMap(map);

      marker.addListener("click", () => {
        infowindow.open({
          anchor: marker,
          map,
        });
      });    
      
    }
  }
}

function setFilters(){

  var tFilter = document.getElementById("titleInput").value;

  var tyFilter;
  if(document.getElementById("typeInput").value != "None"){
    tyFilter = document.getElementById("typeInput").value;
  }else{
    tyFilter = "";
  }

  var dFilter;
  if(document.getElementById("dateInput").value != ""){
    dFilter = new Date(document.getElementById("dateInput").value);
  }else{
    dFilter = new Date(0);
  }

  var sPaid = document.getElementById("payCheck").checked;
  var sFollowed = document.getElementById("followCheck").checked;
  var sYours = document.getElementById("yourCheck").checked;

  initMap({
    titleFilter: tFilter,
    typeFilter: tyFilter,
    dateFilter: dFilter,
    showPaid: sPaid,
    showFollowed: sFollowed,
    showYours: sYours
  });
}

function showCreatePostButton(){
  if(localStorage.getItem("key") != null){
    document.getElementById("createButton").classList.remove("d-none")
    document.getElementById("accSensitiveFilters").classList.remove("d-none")
  }else{
    document.getElementById("accSensitiveFilters").classList.add("d-none")
  }
}

showCreatePostButton();

initMap({
  titleFilter: "",
  typeFilter: "",
  dateFilter: new Date(0), //eg. '2023-02-12T12:00:00 | YYYY/MM/DD'
  showPaid: true
});


