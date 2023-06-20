//tempo in bpm, between 50 - 250
let tempo = $("#tempo-slider")[0].value;
let tempo_ms = tempo * 60 * 1000;
//vol between 0 - 100
let vol = $("#volume-slider")[0].value;

function adjustVol() {
    vol = vol = $("#volume-slider")[0].value;
    Howler.volume(vol * .01);
}

function adjustTempo() {
    tempo = $("#tempo-slider")[0].value;
    tempo_ms = tempo * 60 * 1000;
    sound.rate(tempo / 99);
    // change the speed of the audio playback
}
/*
rate Number 1.0
The rate of playback. 0.5 to 4.0, with 1.0 being normal speed.
*/

var sound = new Howl({
    src: ['audio/fart.mp3'],
    loop: true
});

$("#play").on("click", () => {
    let sound1 = sound.play();
})

$("#volume-slider").change(adjustVol)
$("#tempo-slider").change(adjustTempo)