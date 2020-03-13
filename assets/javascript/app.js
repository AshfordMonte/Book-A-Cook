// Sidenav
$(document).ready(function(){
    $(".sidenav").sidenav();
    $(".carousel").carousel();
    $('.slider').slider({full_width: true});
    $(".tabs" ).css("background-color", themeColor);

    // TAB Indicator/Underline Color
    $(".tabs>.indicator").css("background-color", '#FFF');
 
    // TAB Text Color
    $(".tabs>li>a").css("color", '#FFF');
});