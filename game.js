// 3.At the top of the game.js file, create a new array called buttonColors and set it to hold the sequence "red", "blue", "green", "yellow"
var buttonColours = ["red", "blue", "green", "yellow"];

// 5.At the top of the gam.js file, create a new array called gamepattern
var gamePattern = [];

// 11. at the top of game.js file, create a new empty array with the name userClickedPattern
var userClickedPattern = [];


// 13.1. Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
// 14. You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;
var level = 0;
$(document).keypress(function(){
  if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// 9.use jQuery to detect when any of the buttons are clicked and trigger the handler function.
$(".btn").click(function(){
// 10. inside the handler , create a new variable called userChosenColour to store the id of the button that got clicked.
var userChosenColour = $(this).attr("id");
userClickedPattern.push(userChosenColour);
playsound(userChosenColour);
animatePress(userChosenColour);
checkAnswer(userClickedPattern.length - 1);
});

//1. Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      console.log("wrong");
      playsound("wrong");
      $("body").addClass("game-over");

      setTimeout(function() {
       $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
    }
}


// 1.Inside game.js create a new function calles nextSequence
function nextSequence() {
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);
  //2.Inside the new function generate a new random number between 0 and 3, and store it in a variable called randomNumber
  var randomNumber = Math.floor(Math.random() * 4);
  // 4.Create a new variable called randomChosenColour and use the randomNumber from step 2 to select a random colour from the buttonColours array.
  var randomChosenColour = buttonColours[randomNumber];

  // 6. add the new randomChosenColor generated in step 4 to the end of gamePattern array
  gamePattern.push(randomChosenColour);
  // 7.Use jQuery to select the button with the same id as the randomChosenColour.
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(randomChosenColour);


}
// 12. Create a new function called playSound() that takes a single input parameter called name
function playsound(name){


  // 8. Use Google/Stackoverflow to figure out  how you can use Js  to play the sound for the button colour selected in step 1.
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}
// 1. Create a new function called animatePress(), it should take a single input parameter called currentColour.
function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
     $("#" + currentColor).removeClass("pressed");
  }, 100);

}
function startOver(){
  level = 0;
  gamepattern = [];
  started = false;
}
