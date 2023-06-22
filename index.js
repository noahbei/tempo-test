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

function drawNote() {

}

//for testing
clearStartPage();

/* const numberOfInstances = 3;
const positions = [
  { x: 100, y: 100 },
  { x: 200, y: 200 },
  { x: 300, y: 300 },
  // Add more positions as needed
];

for (let i = 0; i < numberOfInstances; i++) {
  // Create a new SVG element
  const $svgInstance = $('<img>');

  // Load the SVG file
  $.get('images/eighth-note.png', function(data) {
    // Insert the SVG content into the new SVG element
    $svgInstance.html(data);

    // Set the position of the SVG instance
    $svgInstance.attr('x', positions[i].x);
    $svgInstance.attr('y', positions[i].y);

    // Append the SVG instance to the document
    $('body').append($svgInstance);
  });
} */



const numberOfInstances = 3;
const positions = [
  { x: 100, y: 100 },
  { x: 200, y: 200 },
  { x: 300, y: 300 }
  // Add more positions as needed
];

// Create a container element
const $container = $('<div>').css("position", "relative");

for (let i = 0; i < numberOfInstances; i++) {
  // Create a new image element
  const $image = $('<img>');

  // Set the image source
  $image.attr('src', 'images/eighth-note.png');
  $image.attr('alt', 'music note');
  $image.addClass("note-size note");

  // Set the position of the image
  $image.css({
    left: positions[i].x + 'px',
    top: positions[i].y + 'px'
  });

  // Append the image to the container
  $container.append($image);
}

// Append the container to the document body
$('body').append($container);
