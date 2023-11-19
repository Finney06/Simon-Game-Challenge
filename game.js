var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function () {
    if (!started) {
        startGame();
    }
});

$(document).on('touchstart', function () {
    if (!started) {
        startGame();
    }
});

function startGame() {
    $(".level-title").text("Level " + level);
    nextSequence();
    started = true;
}

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    var lastIndex = userClickedPattern.length - 1;
    checkAnswer(lastIndex);
});

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

        console.log("Success");

        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
              }, 1000);
        }

      } else {
        console.log("Wrong");
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();

        $("body").addClass( "game-over");
        setTimeout(()=> {
            $("body").removeClass( "game-over");
        }
        ,200);

     $("#desktop").text("Game Over, Press Any Key to Restart");
     $("#mobile").text("Game Over, Touch the screen to Restart");
        startOver();

      }
        
}

function nextSequence() {

    userClickedPattern = [];
    level++;
    $(".level-title").text("Level " + level);
    
    var randomNumber = Math.floor(Math.random() * 3) + 1;
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

   $("#" + randomChosenColour).fadeOut(100).fadeIn(100);;

   playSound(randomChosenColour)


}

function playSound(name) {
    var audio = new Audio("sounds/" + name + '.mp3');
    audio.play();
}

function animatePress(currentColour) {
    $( "#" + currentColour).addClass( "pressed");
    setTimeout(()=> {
        $( "#" + currentColour).removeClass( "pressed");
    }
    ,100);
}

function startOver() {

     level = 0;
     gamePattern = [];
     started = false;
    console.log (level + + gamePattern + started);
}