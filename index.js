//tempo in bpm, between 50 - 250
let tempo = $("#tempo-slider")[0].value;

//vol between 0 - 100
let vol = $("#volume-slider")[0].value;

function adjustVol() {
    vol = vol = $("#volume-slider")[0].value;
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
    let sound1 = sound.play();
})

$("#volume-slider").change(adjustVol)
$("#tempo-slider").change(adjustTempo)