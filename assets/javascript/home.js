// Sidenav
$(document).ready(function () {
  $("#search_result").hide();
  $(".sidenav").sidenav();
  $('.carousel').carousel();
  $(".slider").slider({ full_width: true });


});
$('input.autocomplete').autocomplete({
  data: {
    "Apple": null,
    "Microsoft": null,
    "Google": 'https://placehold.it/250x250'
  },
  onAutocomplete: function () {
    console.log("autocompleted address")
  }
});

function addressValidation(address, addressCook) {
  console.log("Address Validation Called");
  var key = "AlAWRCVzQaselab1SC0uQ6Iv6pJ4jmNux7hGgBmewvh7UVQmlWnTuMYMIGE3jdxM";
  var address1 = address;
  var address2 = addressCook;

  address1 = encodeURI(address1);
  address2 = encodeURI(address2);

  var queryURL = "http://dev.virtualearth.net/REST/V1/Routes/Driving?wp.0=" +
    address1 + "&wp.1=" + address2 + "&distanceUnit=mi&key=" + key;

  // console.log(queryURL);

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log("AJAX Called");
    var data = response.resourceSets[0].resources[0];
    // console.log(data);

    if (data.travelDistance > 20) {
      validator.push(0);
    }
    else {
      validator.push(1);
    }
  });
}

function badAddressAlert() {
  alert("Address Invalid! Please enter a valid address.");
}

var validator = [];
$("#submit").on("click", function (event) {
  event.preventDefault();

  var address = $("#autocomplete-input").val().trim();
  // console.log(address);
  $("#autocomplete-input").val("");

  var cookAddress = ["7500 W Slaughter Ln, Austin, TX 78749", "300 S Lamar Blvd, Austin, TX 78704", "2103 E 16th St, Austin, TX 78702"];

  for (let i = 0; i < cookAddress.length; i++) {
    addressValidation(address, cookAddress[i]);
  }
  console.log(validator);

  setTimeout(function(){
    var errorFlag = 1;
    for (let i = 0; i < 3; i++) {
      console.log("Looping");
      if (validator[i] === 0) {
        errorFlag = 0;
        console.log("Error flag called");
      }
    }
    console.log("This is error flag: " + errorFlag);
  
    if (errorFlag === 0) {
      badAddressAlert();
    }
    else {
      console.log("Good to go!");
    }
    validator = [];
  }, 1000);

});