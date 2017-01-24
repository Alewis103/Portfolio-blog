/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {

        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

$(".frm").hide(); // hide the form
$("#add").on("click", function() { // show the form on click
    $(".frm2").hide();
    $(".frm").show();
});

$(".frm2").hide();
$(".chsn").on("click", function() {
    $(".frm").hide();
    console.log($(this).text());
    $("#the_id").val($(this).text());
    $("#usr").text("User: " + $(this).text());
    $(".frm2").show();
});
