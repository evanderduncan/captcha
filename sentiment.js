let sentiment;
let canvas;
let positiveButton;
let negativeButton;
let correctCounter = 0;
let totalCounter = 0;
let correctAnswers = 0;

function setup() {
  canvas = createCanvas(400, 400);
  canvas.parent("captcha");
  sentiment = ml5.sentiment("movieReviews", modelLoaded);
}

function modelLoaded() {
  console.log("Model Loaded!");
  generatePhrase();
  drawCaptcha();
}

let phrase;

function generatePhrase() {
  const phrases = [
    "I love this product",
    "This movie was terrible",
    "The restaurant had great food but terrible service",
    "I hate waking up early",
    "The book was excellent, I couldn't put it down",
    "I'm not a fan of this song",
    "I'm really impressed with the new software update",
    "The traffic this morning was unbearable",
    "I feel fantastic after my workout",
    "The customer service was incredibly helpful"
  ];
  phrase = random(phrases);
}

function drawCaptcha() {
  background(255);
  textAlign(CENTER);
  textSize(18);
  text(phrase, width/2, height/3);
  textSize(12);
  text("Is this sentence positive or negative?", width/2, height/2);
  const positiveButton = createButton("Positive");
  positiveButton.position(width/2 - 60, height/2 + 30);
  positiveButton.mousePressed(() => checkSentiment("positive"));
  const negativeButton = createButton("Negative");
  negativeButton.position(width/2 + 10, height/2 + 30);
  negativeButton.mousePressed(() => checkSentiment("negative"));
  
  textSize(16);
  textAlign(CENTER);
  text("Correct: " + correctCounter + "/" + 5, width/2, 300);
  
   if (correctCounter === 5) {
    createButton("Continue").position(width / 2, height - 25).mousePressed(() => {
      window.location.href = "phrase_matcher.html";
    });
  }
  
  
}


function checkSentiment(label) {
  const result = sentiment.predict(phrase);
  const sentimentScore = result.score;
  const correctLabel = sentimentScore > 0.5 ? "positive" : "negative";
  console.log("Sentiment score: " + sentimentScore);
  console.log("Correct label: " + correctLabel);
  console.log("User label: " + label);
  if (label === correctLabel) {
    console.log("Correct");
    correctCounter++;
  } else {
    console.log("Wrong");
  }
  
  
  generatePhrase();
  drawCaptcha();
}



function showMessage(message, color) {
  const messageElem = createP(message);
  messageElem.style("color", color);
  messageElem.parent("captcha");
}
