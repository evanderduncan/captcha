// Import TensorFlow.js
import * as tf from '@tensorflow/tfjs';

// Set backend
tf.setBackend('webgl');


let faceapi;
let detections = [];

let video;
let canvas;
let expressions = ["neutral", "happy", "angry", "sad", "disgusted", "surprised", "fear"];
let randomExpression = expressions[Math.floor(Math.random() * expressions.length)];
let resultText;

function setup() {
  canvas = createCanvas(480, 360);
  canvas.id("canvas");

  video = createCapture(VIDEO);
  video.id("video");
  video.size(width, height);

  const faceOptions = {
    withLandmarks: true,
    withExpressions: true,
    withDescriptors: true,
    minConfidence: 0.3
  };

  //Initialize the model
  faceapi = ml5.faceApi(video, faceOptions, faceReady);

  resultText = createDiv("Find the " + randomExpression + " expression");
  resultText.id("resultText");
  resultText.position(50, 10);
}

function faceReady() {
  faceapi.detect(gotFaces);// Start detecting faces
}

// Got faces
function gotFaces(error, result) {
  if (error) {
    console.log(error);
    return;
  }

  detections = result;　//Now all the data in this detections

  clear();//Draw transparent background
  drawBoxs(detections);
  drawLandmarks(detections);
  drawExpressions(detections);

  checkExpressionMatch(detections);

  faceapi.detect(gotFaces);// Call the function again at here
}

function drawBoxs(detections){
  if (detections.length > 0) {
    for (f=0; f < detections.length; f++){
      let {_x, _y, _width, _height} = detections[f].alignedRect._box;
      stroke(44, 169, 225);
      strokeWeight(1);
      noFill();
      rect(_x, _y, _width, _height);
    }
  }
}

function drawLandmarks(detections){
  if (detections.length > 0) {
    for (f=0; f < detections.length; f++){
      let points = detections[f].landmarks.positions;
      for (let i = 0; i < points.length; i++) {
        stroke(44, 169, 225);
        strokeWeight(3);
        point(points[i]._x, points[i]._y);
      }
    }
  }
}

function drawExpressions(detections){
  if(detections.length > 0){
    let {neutral, happy, angry, sad, disgusted, surprised, fearful} = detections[0].expressions;
    textFont('Helvetica Neue');
    textSize(14);
    noStroke();
    fill(44, 169, 225);

    text("neutral:       " + nf(neutral*100, 2, 2)+"%", 20, 330);
    text("happiness: " + nf(happy*100, 2, 2)+"%", 20, 350);
    text("anger:        " + nf(angry*100, 2, 2)+"%", 20, 370);
    text("sad:            "+ nf(sad*100, 2, 2)+"%", 20, 390);
    text("disgusted: " + nf(disgusted*100, 2, 2)+"%", 20, 410);
    text("surprised:  " + nf(surprised*100, 2, 2)+"%", 20, 430);
    text("fear:           " + nf(fearful*100));
                                
                                 }
                                 }