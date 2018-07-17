$(document).ready(function() {
  console.log("We are ready.");
  $(".new-tweet textarea").on("input", function () {
    let charNumber = 140 - this.value.length;
    $(".counter").text(charNumber);
      if(charNumber < 0) {
        $(".counter").addClass("invalid");
      } else {
        $(".counter").removeClass("invalid")
      }
    })
  });


