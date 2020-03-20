console.log("File Linked");
  var key = "98cdf2c2b9f13779be5b1cdf9fe60347";
  var appID = "9ad3a6a6";

  var queryURL = "https://api.edamam.com/search?q=tempura&app_id=" +
    appID + "&app_key=" + key;

  console.log(queryURL);

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    var recipe = response.hits[0].recipe;
    console.log(recipe);
  })

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
  dataRef.ref().on("value", function(snapshot) {
    console.log("Data read!");
    console.log(snapshot.val().address);
    address = snapshot.val().address;
  })