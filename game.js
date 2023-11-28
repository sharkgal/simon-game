let userClickedPattern = [];

let gamePattern = [];

let buttonColors = ["red","blue","green","yellow"];

let level = 0;

function nextSequence() {
    let randomNum = Math.floor(Math.random()*4);

    let randomChosenColor = buttonColors[randomNum];

    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);

    level++;

    $("h1").text("level " + level);

}

function playSound(color) {
    let sound = new Audio("./sounds/" + color + ".mp3");
    sound.play();
}

$(".btn").on("click", function(event) {
    let userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
})

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

document.addEventListener("keydown", function() {
    if(gamePattern.length === 0) {
        nextSequence();
        $("h1").text("level " + level);
    }

})

function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
    
            userClickedPattern = [];
        }
        console.log("success");
    } else {
        let wrongSound = new Audio("./sounds/wrong.mp3");
        wrongSound.play();
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
        console.log("wrong");
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
    userClickedPattern = [];
}