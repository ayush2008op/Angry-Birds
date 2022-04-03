const { Engine, World, Bodies, Mouse, MouseConstraint, Constraint } = Matter;

let ground;
const boxes = [];
let bird;
let world, engine;
let mConstraint;
let slingshot;

let dotImg;
let boxImg;
let bkgImg;
var score = 0;
var bksound

function preload() {
  dotImg = loadImage('images/Ab2-red.webp');
  boxImg = loadImage('images/equals.png');
  bkgImg = loadImage('images/skyBackground.png');
  song = loadSound('images/Yoooo.mp3');
  song1 = loadSound('images/y1.mp3')
  song2 = loadSound('images/reload.mp3')
}

function setup() {
  var isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent)
  if (isMobile){
    canW = displayWidth;
    canH = displayHeight;
    createCanvas(displayWidth+80,displayHeight);
  }
  else{
    canW = windowWidth;
    canH = windowHeight;
    createCanvas(windowWidth,windowHeight);
  }
  
  song.play()
  song.setVolume(0.1)
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width / 2, height - 10, width, 20);
  for (let i = 0; i < 3; i++) {
    boxes[i] = new Box(width - 200, 300 - i * 75, 84, 100);
  }
  bird = new Bird(150, 300, 25);
  
  slingshot = new SlingShot(250, 300, bird.body);

  const mouse = Mouse.create(canvas.elt);
  const options = {
    mouse: mouse
  };

 
  mouse.pixelRatio = pixelDensity();
  mConstraint = MouseConstraint.create(engine, options);
  World.add(world, mConstraint);
}

function keyPressed() {
  if (key == ' ') {
    World.remove(world, bird.body);
    bird = new Bird(150, 300, 25);
    slingshot.attach(bird.body);
    song2.play()
  }

}

function mouseReleased() {
  setTimeout(() => {
    slingshot.fly();
    song1.play();
  }, 100);
}

function draw() {
  background(bkgImg);
  Matter.Engine.update(engine);
  textSize(22);
  text("Drag mouse to shoot & space for reloding",10,20);
  ground.show();
  for (let box of boxes) {
    box.show();
  }
  slingshot.show();
  bird.show();
}


