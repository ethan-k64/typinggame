let data;
let times = [];
let r;
let word;
let wordInput;
let scoreP;
let timer;
let avg;
let timeInterval
let avgTime = 0;
let score = 0;
let counter = 0;
let startTime = 3;

function preload() {
  data = loadJSON("words.json");
}

function setup() {
  noCanvas();
  
  wordInput = select("#wordInput");
  word = select("#word");
  scoreP = select("#score");
  timer = select("#timer");
  avg = select("#avg");
  
  r = floor(random(data.words.length));
}

function draw() {
  scoreP.html(`Score: ${score}`);
  timer.html(`Time: ${counter}`);
  avg.html(`Average Time: ${(Math.round(100 * avgTime) / 100)}`);
  
  wordInput.changed(checkInput);
}

function checkInput() {
  if (wordInput.value() == data.words[r].name) {
    r = floor(random(data.words.length));
    word.html(data.words[r].name);
    score++;
    times.push(counter);
    calculateAvg();
    counter = 0;
    wordInput.value("");
  } else if (wordInput.value() == "start" || wordInput.value() == "Start" || wordInput.value() == "START") {
    word.html(data.words[r].name);
    wordInput.value("");
    timeInterval = setInterval(timeIt, 1000);
  } else if (wordInput.value() == "pause" || wordInput.value() == "Pause" || wordInput.value() == "PAUSE") {
    clearInterval(timeInterval);
    word.html("Enter Start to Begin or Pause to Stop");
    r = floor(random(data.words.length));
    wordInput.value("");
    counter = 0;
  } else {
    score--;
  }
}

function timeIt() {
  counter++;
  timer.html(`Time: ${counter}`);
}

function calculateAvg() {
  for (let i = 0; i < times.length; i++) {
    avgTime += times[i];
  }
  
  avgTime /= times.length;
}
