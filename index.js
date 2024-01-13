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
let chartData = [];
let soundType = "beat";


sound = new Howl({
    src: [`audio/${soundType}.mp3`],
    loop: true
});
adjustTempo();
adjustVol();

function adjustVol() {
    vol = $("#volume-slider")[0].value;
    sound.volume(vol * .01);
}

function adjustTempo() {
    tempo = $("#tempo-slider")[0].value;
    tempo_ms = (60 / tempo) * 1000;
    sound.rate(tempo / 99);
}

//add event for chaning tempo and volume
$("#volume-slider").on('input', adjustVol);
$("#tempo-slider").on('input', adjustTempo);


$("#play").on("click", () => {
    if (!playMusicClicked) {
        $(".bi-music-note-beamed").addClass("hidden");
        $(".bi-play-fill").removeClass("hidden");

        let sound1 = sound.play();
        playMusicClicked = true;
    }
    else {
        clearStartPage()
        // this is made multiple times after retry, fix
        $("body").append("<h2 id='count' class='disable-select'></h2>");
        $("body").on("click keydown", handleClick);
    }
})

function clearStartPage() {
    $("#title").addClass("transition").addClass("small-title");
    $("#start-container").fadeOut(350);
}

function handleClick() {
    numClicks++;

    let currentTime = window.performance.now();
    let userResult = calcUserResults(timeSinceLastBeat, currentTime);
    if (numClicks >= 9 && numClicks <= 28)
        userInputArr.push(userResult);
    timeSinceLastBeat = currentTime;

    if (numClicks !== 1 && numClicks !== 28)
        drawNote();

    if (numClicks >= 4 && numClicks <= 8) {
        $("#count").show().text(5 - numClicks + 4);
    }
    else if (numClicks === 9) {
        $("#count").fadeOut(200);
        sound.fade(vol * .01, 0, 1000);
    }
    else if (numClicks >= 23 && numClicks <=27) {
        $("#count").fadeIn(200);
        $("#count").text(5 - numClicks + 23);
    }
    else if (numClicks === 28) {
        $("#count").fadeOut(200);
        showResults();
    }
    /*  //  score debug
    console.log("userResult.score: " + userResult.score);
    console.log("userResult.miss: " + userResult.miss);
    console.log("userResult.missPerc: " + userResult.missPerc);
    console.log("");
     */    
    
}

function drawNote() {
    const note = $('<div class="music-note disable-select"></div>');
    const noteImage = $('<img src="images/eighth-note.png" alt="Music Note" width="200" height="300">');
    note.append(noteImage);
    $('body').append(note);
    setTimeout(function() {
      note.remove();
    }, 500);
}

function calcUserResults(timeSinceLastBeat, currentTime) {
    // make userResult object to hold beat data
    let userResult = {};
    userResult.duration = currentTime - timeSinceLastBeat;
    userResult.miss = userResult.duration - tempo_ms;
    userResult.missPerc = (userResult.miss / tempo_ms) * 100;
    // scoreFactor can't go below 0
    let scoreFactor = Math.max(0, 1 - Math.abs(userResult.missPerc) / 20);

    userResult.score = Math.round(scoreFactor * maxPointsPerNote);
    return userResult;
}

function resetGame() {
    // maybe need to delete deep for the userResult objects in array
    userInputArr = [];
    timeSinceLastBeat = 0;
    userInputArr = [];
    numClicks = 0;
    chartData = [];

    $("#results-container").fadeOut(200, () => {
        $("#start-container").fadeIn(300, () => {
            $("#title").removeClass("transition")
        });
    });
    $("#title").removeClass("small-title");
    if (!sound.playing()) sound.play()
    sound.fade(0, vol * .01, 100);
}
$("#retry-button").on("click", resetGame)

function showResults() {
    $("body").off("click keydown");
    numClicks = 0;

    calcTotalScore();
    $("#results").text(calcTotalScore);
    chartData = userInputArr.map((obj) => obj.score);
    myChart.data.datasets[0].data = chartData;
    myChart.update();   

    $("#results-container").fadeIn(500)
    
}

function calcTotalScore() {
    let totalScore = 0;
    for (let i = 0; i < userInputArr.length; i++) {
        totalScore += userInputArr[i].score;
    }
    return totalScore;
}

function isScreenSmall() {
    return $(window).width() <= 720;
}

let initial = isScreenSmall()
$(window).on("resize", () => {
    //update chart when it switches screen modes
    if (initial !== isScreenSmall()) {
        myChart.options.maintainAspectRatio = !isScreenSmall();
        if (!isScreenSmall()) myChart.options.aspectRatio = 2 / 1;
        /*
        does not work with updating properly
        myChart.options.indexAxis = isScreenSmall() ? "y" : "x";
        */
        myChart.update();
        initial = isScreenSmall();
    }
})

Chart.defaults.color = '#000';
const ctx = $("#results-chart");
const myChart = new Chart(ctx, {
    type: "bar",
    data: {
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        datasets: [{
            label: "points",
            data: chartData,
            backgroundColor: "#C4B0FF",
            borderWidth: 1
        }]
    },
    options: {
        maintainAspectRatio: !isScreenSmall(),
        indexAxis: isScreenSmall() ? "y" : "x",
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

//easter egg ;)
const sequence = [70, 65, 82, 84, 13]
let i = 0;
$(window).on("keydown", (event) => { 
    const keycode = event.which;
    i = (keycode === sequence[i]) ? i + 1 : 0;
    console.log(keycode, i)
    if (i === sequence.length) {
        i = 0;

        const isPlaying = (sound.playing() && numClicks < 8) ? true : false;
        console.log(isPlaying)
        
        if (isPlaying) sound.stop();
        soundType = (soundType === "beat") ? "fart" : "beat";
        sound = new Howl({
            src: [`audio/${soundType}.mp3`],
            loop: true
        });
        if (isPlaying) sound.play();

        adjustTempo();
        adjustVol();
    }
})