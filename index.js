//tempo in bpm, between 50 - 250
let tempo = $("#tempo-slider")[0].value;
//vol between 0 - 100
let vol = $("#volume-slider")[0].value;
let timesClicked = 0;



function adjustVol() {
    vol = $("#volume-slider")[0].value;
    Howler.volume(vol * .01);
}

function adjustTempo() {
    tempo = $("#tempo-slider")[0].value;
    sound.rate(tempo / 99);
}

var sound = new Howl({
    src: ['audio/fart.mp3'],
    loop: true
});

$("#play").on("click", () => {
    //show play button
    //maybe toggle and maybe make clicked a bool
    if (timesClicked === 0) {
        $(".bi-play-fill").removeClass("hidden");
        $(".bi-music-note-beamed").addClass("hidden");
        //sound start
        sound.play();
    }
    else if (timesClicked === 1) {
        clearStartPage()
        // call function(s) to start the game
        // animate the control grid going away
        // animate title going to the top of the screen
    }
    else {
        // maybe reset the counter or something
        // or reset the play button toggle thing
    }
    
    
    
    timesClicked = (timesClicked + 1) % 3;
    console.log(timesClicked)
})

$("#volume-slider").change(adjustVol)
$("#tempo-slider").change(adjustTempo)

//when the user clicks (after the game has started registering all of their clicks after a counter)
//add their time intervals to an array.
//compare this array and the intervals to the bpm/tempo

function clearStartPage() {
    $("#title").addClass("small-title")
    $(".rest-container").fadeOut(350);
}
