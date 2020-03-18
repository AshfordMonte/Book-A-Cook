// Sidenav
$(document).ready(function () {
  $("#search_result").hide();

  $(".sidenav").sidenav();
  $(".carousel").carousel();
  $('.slider').slider({ full_width: true });


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

var address = "";
$("#submit").on("click", function(event) {
  event.preventDefault();

  address = $("#autocomplete-input").val().trim();
  console.log(address);
  $("#autocomplete-input").val("");
});