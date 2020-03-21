console.log("File successfully linked")

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
var food = "";
var time;
var total;
var cost;
var driveCost;

dataRef.ref().on("value", function (snapshot) {
  console.log("data read!");
  address = snapshot.val().address;
  food = snapshot.val().food;
  time = snapshot.val().totalTime;
  driveCost = snapshot.val().driveLength;
  console.log(food);
  console.log(time);
  console.log(address);
  console.log(driveCost);

  if(time < 45){
    cost = 20;
  }
  else{
    cost = 25;
  }
});

setTimeout(function () {
  var newRow = $("<tr>").append(
    $("<td>").text(food),
    $("<td>").text("x1"),
    $("<td>").text("$" + cost)
  );
  var totalRow = $("<tr>").append(
    $("<td>"),
    $("<td>").html("<b>Total</b>"),
    $("<td>").text("$" + (cost + driveCost))
  )

  $("tbody").append(newRow);
  $("tbody").append(totalRow);
},1000)