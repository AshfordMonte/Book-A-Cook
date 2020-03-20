console.log("File Linked");

var firebaseConfig = {
  apiKey: "AIzaSyChYCEg8dMgpUKXoyZVMVlCSEt7Gver2xU",
  authDomain: "book-a-cook-bee9f.firebaseapp.com",
  databaseURL: "https://book-a-cook-bee9f.firebaseio.com",
  projectId: "book-a-cook-bee9f",
  storageBucket: "book-a-cook-bee9f.appspot.com",
  messagingSenderId: "938760268502",
  appId: "1:938760268502:web:4b624c8fdc949f897db777"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var dataRef = firebase.database();

var address = "";
dataRef.ref().on("value", function (snapshot) {
  // console.log("Data read!");
  // console.log(snapshot.val().address);
  address = snapshot.val().address;
})

var itemList = [];
var cookTime = [];

var item1 = $("#item-1").text();
var item2 = $("#item-2").text();
var item3 = $("#item-3").text();
item1 = item1.substring(0, item1.length - 5);
item2 = item2.substring(0, item2.length - 5);
item3 = item3.substring(0, item3.length - 5);
itemList.push(item1);
itemList.push(item2);
itemList.push(item3);

for (let i = 0; i < itemList.length; i++) {
  recipeAssigner(itemList[i], i);
}

function recipeAssigner(item, index) {
  var key = "98cdf2c2b9f13779be5b1cdf9fe60347";
  var appID = "9ad3a6a6";

  var queryURL = "https://api.edamam.com/search?q=" + item + "&app_id=" +
    appID + "&app_key=" + key;

  console.log(queryURL);

  $.ajax({
    url: queryURL,
    method: "GET",
    dataType: "jsonp"
  }).then(function (response) {

    if(response.hits[0].recipe.totalTime != 0){
      cookTime.push(response.hits[0].recipe.totalTime);
    }
    else{
      cookTime.push(45);
    }

    index++;
    // console.log(response);
    var recipeURL = response.hits[0].recipe.url;
    // console.log(response.hits[0].recipe);
    $("#recipe" + index).attr("href", recipeURL);
  })
}

var selectedFood = "";
var selectedIndex;
$("select").change(function () {
  selectedFood = $("select option:selected").text();
  selectedIndex = $("select").val();
  console.log(selectedFood);
  console.log(selectedIndex);
})

$("#orderButton").on("click", function () {
  var driveTime = 0;
  var prepTime = cookTime[selectedIndex - 1];

  setTimeout(function () {
    var key = "AlAWRCVzQaselab1SC0uQ6Iv6pJ4jmNux7hGgBmewvh7UVQmlWnTuMYMIGE3jdxM";
    var address1 = address;
    var address2 = $("#address").text().trim();

    address1 = encodeURI(address1);
    address2 = encodeURI(address2);

    var queryURL = "https://dev.virtualearth.net/REST/V1/Routes/Driving?wp.0=" +
      address1 + "&wp.1=" + address2 + "&distanceUnit=mi&key=" + key;

    // console.log(queryURL);

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      console.log("AJAX Called");
      var data = response.resourceSets[0].resources[0];
      driveTime = Math.floor(data.travelDurationTraffic / 60);
      var totalTime = driveTime + prepTime;
      console.log("Drive time: " + driveTime);
      console.log("Prep Time: " + prepTime);
      // console.log(driveTime);
      dataRef.ref().set({
        address: address,
        totalTime: totalTime,
        food: selectedFood,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });
    });
  }, 1000);
  setTimeout(function () {


    console.log("Changing page!");
    // location.href = "../../invoicePages/index.html"
  }, 2000);
});