// Initialize and add the map
let map;

async function initMap() {
  // The location of Uluru
  const position = { lat: -25.344, lng: 131.031 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerView } = await google.maps.importLibrary("marker");

  // The map, centered at Uluru
 // Initialize and add the map
  const srbija = { lat: 44.0165, lng: 21.0059 };
  const map = new google.maps.Map(
  document.getElementById("map"),{
      zoom: 7,
      center: srbija,
      styles: 
      [
      {
          "featureType": "poi.business",
          "elementType": "labels.text",
          "stylers": [
          {
              "visibility": "off"
          }
          ]
      },
      {
          "featureType": "poi.business",
          "elementType": "labels.text.fill",
          "stylers": [
          {
              "visibility": "off"
          }
          ]
      },
      {
          "featureType": "poi.business",
          "elementType": "labels.text.stroke",
          "stylers": [
          {
              "visibility": "off"
          }
          ]
      }
      ]
  }
  );

  map.addListener('click', function(e) {
      placeMarker(e.latLng, map);
  });

  var marker = new google.maps.Marker({
      map: map
  });

  function placeMarker(position, map) { //click to put marker
        if (marker) { //if marker exists, set the position and icon        
            marker.setPosition(position);
            } else { //if marker doesnt exist, make one with the appropriate data
                    marker = ({
                    position: position,
                    map: map,
                    });
        }   
        var att = document.createAttribute("marked");
        att.value = position;
        document.getElementById("map").setAttributeNode(att);
    }
}

initMap();