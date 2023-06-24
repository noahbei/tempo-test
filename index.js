//tempo in bpm, between 50 - 250
let tempo = $("#tempo-slider")[0].value;
let tempo_ms = (60 / tempo) * 1000;
//vol between 0 - 100
let vol = $("#volume-slider")[0].value;
let playMusicClicked = false;
const maxPointsPerNote = 50;
let timeSinceLastBeat = 0;
let userInputArr = [];
let numClicks = 0;


let sound = new Howl({
    src: ['audio/fart.mp3'],
    loop: true
});
adjustTempo();
adjustVol();

function adjustVol() {
    vol = $("#volume-slider")[0].value;
    Howler.volume(vol * .01);
}

function adjustTempo() {
    tempo = $("#tempo-slider")[0].value;
    tempo_ms = (60 / tempo) * 1000;
    sound.rate(tempo / 99);
}

//add event for chaning tempo and volume
$("#volume-slider").change(adjustVol)
$("#tempo-slider").change(adjustTempo)


$("#play").on("click", () => {
    //show play button
    //maybe toggle and maybe make clicked a bool
    if (!playMusicClicked) {
        $(".bi-music-note-beamed").addClass("hidden");
        $(".bi-play-fill").removeClass("hidden");
        //sound start
        //maybe have function that does everytihng for reset here
        let sound1 = sound.play();
        playMusicClicked = true;
    }
    else {
        clearStartPage()
        $("body").append("<h2 id='count' class='disable-select'></h2>");
        
        // add event on click that will handle everything for the click.s
        //add this when we go to game screen, remove when we are done
        $("body").on("click keydown", handleClick);



        // call function(s) to start the game
        // animate the control grid going away
        // animate title going to the top of the screen
    }
})

function clearStartPage() {
    $("#title").addClass("small-title")
    $(".rest-container").fadeOut(350);
}

function handleClick() {
    numClicks++;
    // if it is time for getting the user's input from the game from the game.

    let currentTime = window.performance.now();
    let userResult = calcUserResults(timeSinceLastBeat, currentTime);
    userInputArr.push(userResult);
    timeSinceLastBeat = currentTime;

    console.log(numClicks);
    if (numClicks >= 4 && numClicks <= 8) {
        $("#count").text(5 - numClicks + 4);
    }
    else if (numClicks === 9) {
        $("#count").fadeOut(200);
    }
    else if (numClicks >= 23 && numClicks <=27) {
        $("#count").fadeIn(200);
        $("#count").text(5 - numClicks + 23);
    }
    else if (numClicks === 28) {
        $("#count").fadeOut(200);
    }
    /* //  score debug
    console.log("userResult.score: " + userResult.score);
    console.log("userResult.miss: " + userResult.miss);
    console.log("userResult.missPerc: " + userResult.missPerc);
    console.log("");
        */

    drawNote();
}

function drawNote() {

}

function calcUserResults(timeSinceLastBeat, currentTime) {
    // make userResult object to hold beat data
    let userResult = {};
    userResult.duration = currentTime - timeSinceLastBeat;
    userResult.miss = userResult.duration - tempo_ms;
    userResult.missPerc = (userResult.miss / tempo_ms) * 100;
    // scoreFactor cant go below 0
    let scoreFactor = Math.max(0, 1 - Math.abs(userResult.missPerc) / 20);

    userResult.score = Math.round(scoreFactor * maxPointsPerNote);
    return userResult;
}

function resetGame() {
    // maybe need to delete deep for the userResult objects in array
    userInputArr = [];
    
}

// happens at the end of play screen
function showResults() {
    $("body").off("click keydown");
    numClicks = 0; // or do this in reset game
}