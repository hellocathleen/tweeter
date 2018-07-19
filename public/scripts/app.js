/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  function createTweetElement(tweetData){
    let $tweet = $("<article>").addClass("tweet");
    let $header = $("<header>").appendTo($tweet);
    let $avatar = $("<img>").attr("src", tweetData.user.avatars.small).appendTo($header);
    let $name = $("<h2>").text(tweetData.user.name).appendTo($header);
    let $handle = $("<span>").addClass("handle").text(tweetData.user.handle).appendTo($header);
    let $tweetcontent = $("<p>").addClass("tweet-content").text(tweetData.content.text).appendTo($tweet);
    let $footer = $("<footer>").appendTo($tweet);
    let $date = $("<p>").addClass("date").text(tweetData.created_at).appendTo($footer);
    let $icons = $("<div>").addClass("icons").html("<i class='fas fa-heart'></i> <i class='fas fa-retweet'></i> <i class='fas fa-flag'></i>").appendTo($footer);

    return $tweet;
  }

  function renderTweets(tweets){
    $(".tweet-container").empty();
    tweets.forEach(function(element){
      $(".tweet-container").prepend(createTweetElement(element));
    });
  }

  function loadTweets() {
    $.ajax('/tweets', { method: 'GET' })
      .done(function (input) {
      renderTweets(input);
    });
  }
  //hide the compose tweet textbox upon page loading
  $(".new-tweet").hide();
  
  //hide error messages until triggered
  $('.errors .null-errormsg').hide();
  $('.errors .toolong-errormsg').hide();

  //submit a tweet if number of characters is between 1-140; otherwise show error
  $('form').on('submit', function(event) {
  event.preventDefault();
  $('.errors .null-errormsg').slideUp("fast");
  $('.errors .toolong-errormsg').slideUp("fast");
  let input = $(".new-tweet textarea");
    if (!input.val()) {
      $('.errors .null-errormsg').slideDown("fast");
    } else if (input.val().length > 140) {
      $('.errors .toolong-errormsg').slideDown("fast");
    } else {
      $.ajax('/tweets', 
      { method: 'POST', 
        data: $(this).serialize(), 
        success: loadTweets })
      input.val("");
    }
  })

  //show and hide tweet textbox when Compose button is clicked
  $("#nav-bar .compose").on("click", (function() {
    $(".new-tweet").slideToggle("slow", function() {
      $(".new-tweet textarea").select();
    });
  }));
});