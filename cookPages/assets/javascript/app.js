console.log("File Linked");

// var key = "98cdf2c2b9f13779be5b1cdf9fe60347";
// var appID = "9ad3a6a6";

// var queryURL = "https://api.edamam.com/search?q=lasagna&app_id=" +
//   appID + "&app_key=" + key;

// console.log(queryURL);

// $.ajax({
//   url: queryURL,
//   method: "GET"
// }).then(function(response) {
//   console.log(response);
//   var recipe = response.hits[0].recipe;
//   console.log(recipe);
// });

var key = "AlAWRCVzQaselab1SC0uQ6Iv6pJ4jmNux7hGgBmewvh7UVQmlWnTuMYMIGE3jdxM";
var address1 = "909 Ambling Way Ct";
var address2 = "714 N Comanche St";

address1 = encodeURI(address1);
address2 = encodeURI(address2);

var queryURL = "http://dev.virtualearth.net/REST/V1/Routes/Driving?wp.0=" +
  address1 + "&wp.1=" + address2 + "&distanceUnit=mi&key=" + key;

console.log(queryURL);

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
  console.log(response);
  var data = response.resourceSets[0].resources[0];
  console.log(data);
});