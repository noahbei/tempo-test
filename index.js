//tempo in bpm
let tempo = $("#tempo-slider")[0].value;
//vol between 0 - 100
let vol = $("#volume-slider")[0].value;

tempo_ms = tempo * 60 * 1000;
Howler.volume(vol * .01);

var sound = new Howl({
    src: ['fart.mp3']
});

$(document).on("click", () => {
    sound.play();
})
