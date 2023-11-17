var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;



// window.addEventListener("resize", () => {
    // console.log("Resized");
//     if (window.innerWidth < 450) {
    // console.log('Working');
//       document.querySelector("#level-title").innerText = "Touch Screen To Start";
//     } else {
//       document.querySelector("#level-title").innerText = "Press A Key to Start";
//     }
//  });

$(document).ready(function() {
    window.addEventListener("resize", () => {
      console.log("Resize event triggered");
      if (window.innerWidth <  500) {
        console.log('Working');
        $("#level-title").text("Touch Screen To Start");
      } else {
        $("#level-title").text("Press A Key to Start");
      }
    });
  });
  
  

$(document).keypress(function(){ 
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

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

     $("#level-title").text("Game Over, Press Any Key to Restart");
        
        startOver();

      }
        
}

function nextSequence() {

    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    
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
    console.log (level + gamePattern + started);
}