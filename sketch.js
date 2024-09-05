var maxVolume = 0.3;
var song;
var amp;
var bins = 32; //32
var w = 64; //64;
var mic;
var vol;
var t = '';
//2048

const Y_AXIS = 1;
const X_AXIS = 2;

let k1,k2;

function preload(){
  //song = loadSound('song.mp3');
  //img = loadImage('logo.png');
}

function setup() {
  let cnv = createCanvas(bins * w, 400);
  //cnv.mouseClicked(togglePlay);
  
  k1 = color(255, 0, 0);
  k2 = color(0, 255, 20);
  
  mic = new p5.AudioIn();
  mic.start();
  
  amp = new p5.Amplitude();
  fft = new p5.FFT(0.7, bins);
  fft.setInput(mic)
  
  mic.getSources(gotSources);
  background(51);
}

function gotSources(deviceList) {
  deviceList = str(deviceList.length);
  print(deviceList);
}
  

function draw() {
  //background(51);
  setGradient(0, 0, width, height, k1, k2, Y_AXIS)

  // if(song.isPlaying()) {
  //   //fft.setInput(0);
  //   vol = amp.getLevel();
  //   text("Rasputin + mikrofon", 10, 10);
  // } else {
  //   fft.setInput(mic);
  //   vol = mic.getLevel();
  //   text("Tylko mikrofon", 10, 10);
  // }
  
  //logo();  
  analyze();
  //text(t + "chuj", 10, 10);
  
  var iloscLiniY = 17;
  var rozstawY = 64;
  var iloscLiniX = 32;
  var rozstawX = 25;
  stroke(51);
  strokeWeight(5);
  
  for(var i = 0; i < iloscLiniX; i++) {
    line(0, height - rozstawX*i, width, height - rozstawX*i);
  }
  
  for(var i = 0; i < iloscLiniX; i++) {
    line(rozstawY*i, 0, rozstawY*i, height);
  }
}

function logo() {
  var vol = amp.getLevel();
  //var vol = mic.getLevel();
  var diam = map(vol, 0, maxVolume, 200, 300);
  var posX = width  / 2 - diam / 2;
  var posY = height / 2 - diam / 2;
  image(img, posX, posY, diam, diam);
}

function analyze() {
  let spectrum = fft.analyze();
  noStroke();
  //fill(0, 255, 0);
  fill(51);
  
  for (let i = 0; i < spectrum.length; i++){
    let x = map(i, 0, spectrum.length, 0, width);
    //let h = map(spectrum[i], 0, 255, 0, 300);
    //rect(x, height, width / spectrum.length, -h);
    
    let h = map(spectrum[i], 0, 255, 400, 0);
    rect(x, 0, width / spectrum.length, h)
  }
}

function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();

  if (axis === Y_AXIS) {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  } else if (axis === X_AXIS) {
    // Left to right gradient
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x, x + w, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y + h);
    }
  }
}

// function togglePlay() {
//   if (!song.isPlaying()) {
//     song.play();
//     song.setVolume(maxVolume);
//   } else {
//     song.stop();
//   }
// }