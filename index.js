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


let sound = new Howl({
    src: ['audio/fart.mp3'],
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
$("#volume-slider").change(adjustVol)
$("#tempo-slider").change(adjustTempo)


$("#play").on("click", () => {
    if (!playMusicClicked) {
        $(".bi-music-note-beamed").addClass("hidden");
        $(".bi-play-fill").removeClass("hidden");

        let sound1 = sound.play();
        playMusicClicked = true;
    }
    else {
        clearStartPage()
        $("body").append("<h2 id='count' class='disable-select'></h2>");
        $("body").on("click keydown", handleClick);
    }
})

function clearStartPage() {
    $("#title").addClass("small-title")
    $("#start-container").fadeOut(350);
}

function handleClick() {
    numClicks++;
    // if it is time for getting the user's input from the game from the game.

    let currentTime = window.performance.now();
    let userResult = calcUserResults(timeSinceLastBeat, currentTime);
    if (numClicks >= 9 && numClicks <= 28)
        userInputArr.push(userResult);
    timeSinceLastBeat = currentTime;

    console.log(numClicks);
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
    timeSinceLastBeat = 0;
    userInputArr = [];
    numClicks = 0;
    chartData = [];

    $("#results-container").fadeOut(200, () => {
        $("#start-container").fadeIn(300);
    });
    sound.fade(0, vol * .01, 100);
}
$("#retry-button").on("click", resetGame)


// happens at the end of play screen
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

/* trying to make chart vertical
function updateChartType() {
    myChart.options.indexAxis = isScreenSmall() ? "y" : "x";

    if (myChart.options.indexAxis === "x") {
        myChart.options.scales = {
            x: {
                beginAtZero: true,
                max: 50
            },
            y: {
                beginAtZero: true,
                max: 20
            }
        };
    } else {
        myChart.options.scales = {
            x: {
                beginAtZero: true,
                max: 20
            },
            y: {
                beginAtZero: true,
                max: 50
            }
        };
    }

    chart.update();
}

$(window).on('resize', updateChartType); */

Chart.defaults.color = '#000';

const ctx = $("#results-chart");
const myChart = new Chart(ctx, {
    type: "bar",
    data: {
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        datasets: [{
            label: "points",
            data: chartData,
            borderWidth: 1
        }]
    },
    options: {
        indexAxis: isScreenSmall() ? "y" : "x",
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});