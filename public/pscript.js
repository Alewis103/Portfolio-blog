$(document).ready(function() {
    $(".anch").on("click", function(e) {
        e.preventDefault();
        if (this.hash !== "") {
            var hash = this.hash;
            console.log($(hash).offset().top);
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 2000, function() {
                window.location.hash = hash;
            });
        }
    });

});



var projects = new Siema({
    selector: '.siema',
    duration: 500,
    easing: 'ease-in-out',
    perPage: 1,
    startIndex: 0,
    draggable: false,
    threshold: 20,
    loop: true
});

function projectSwap(){
  switch (projects.currentSlide) {
    case 0:
    $("#ptitle").text("Android calculator");
    $("#details").text("A simple calculator application built in Android Studio. Languages utilized were  Java and XML. This Application helped me learn more about layouts more specifically constraint layouts.");
      break;
      case 1:
      $("#ptitle").text("Android Weather Application");
      $("#details").text("A weather appliction which utilizes the openweathermap api to give a seven day forecast of your zipcode.This appliction aided in learning about listview adapters, listview, json parsing, and web api's");
      break;

      case 2:
      $("#ptitle").text("Spotify Jukebox");
      $("#details").text("A music player the implements the Spotify api to search and play music.This project aided in utilizing ajax calls, the 'FreezeFrame Library', font-awsome icons,Html5 audio tags ,and regular expressions");
        break;
    default:

  }
};

$("#lbtn").on("click",function(){
  projects.next();
  projectSwap();
});

$('#rbtn').on("click",function(){
  projects.prev();
  projectSwap();
});

AOS.init();
