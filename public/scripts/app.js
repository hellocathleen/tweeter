/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

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

// Test / driver code (temporary). Eventually will get this from the server.
// const tweetData = {
//   "user": {
//     "name": "Newton",
//     "avatars": {
//       "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
//       "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
//       "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
//     },
//     "handle": "@SirIsaac"
//   },
//   "content": {
//     "text": "If I have seen further it is by standing on the shoulders of giants"
//   },
//   "created_at": 1461116232227
// }

//var $tweet = createTweetElement(tweetData);

// // Test / driver code (temporary)
// $(document).ready(function() {
// console.log($tweet); // to see what it looks like
// $('.tweet-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
// });

function renderTweets(tweets){
  $(".tweet-container").empty();
  tweets.forEach(function(element){
     $(".tweet-container").prepend(createTweetElement(element));
  });
}

$(document).ready(function() {

    $('form').on('submit', function(event) {
    event.preventDefault();
    let input = $(".new-tweet textarea");
      if (!input.val()) {
        alert("You must enter a tweet.");
      } else if (input.val().length > 140) {
        alert("Your tweet is too long.");
      } else {
        console.log('Button clicked, performing ajax call...');
        $.ajax('/tweets', 
        { method: 'POST', 
          data: $(this).serialize(), 
          success: loadTweets })
      }
      input.val().empty();
    })


  function loadTweets() {
    $.ajax('/tweets', { method: 'GET' })
      .done(function (input) {
      console.log("success");
      renderTweets(input);
    });
  }

});