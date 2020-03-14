console.log("File Linked");

var key = "98cdf2c2b9f13779be5b1cdf9fe60347";
var appID = "9ad3a6a6";

var queryURL = "https://api.edamam.com/search?q=lasagna&app_id=" +
  appID + "&app_key=" + key;

console.log(queryURL);

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
  console.log(response);
  var recipe = response.hits[0].recipe;
  console.log(recipe);
});
