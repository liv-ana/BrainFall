let score = 0;
let screen = 0;
let fail = 0;

let mainbutton, backbutton, tryagain_button, instructions_button, instructions;
let rules_button, catcher_odd, catcher_even, start_button;
let brain1_img, brain2_img, brain3_img, brain4_img, math_img, instructions_img, background1_img, background2_img, background3_img;
let brain1, brain2, brain3, brain4, math;

let equations = [];
let equationInterval = 90;
let frameCounter = 0;

// load images
function preload(){
  brain1_img = loadImage('assets/screen1-removebg-preview.png');
  brain2_img = loadImage('assets/screen3-removebg-preview.png');
  math_img = loadImage('assets/math-removebg-preview.png');
  instructions_img = loadImage('assets/interrogacao-removebg-preview.png');
  brain3_img = loadImage('assets/screen5-removebg-preview.png');
  brain4_img = loadImage('assets/brain10-removebg-preview.png');
  background1_img = loadImage('assets/WhatsApp Image 2025-08-07 at 15.30.08.jpeg');
  background2_img = loadImage('assets/WhatsApp Image 2025-08-07 at 15.30.08 (1).jpeg');
  background3_img = loadImage('assets/WhatsApp Image 2025-08-07 at 16.12.54.jpeg');
}

function setup() {
  createCanvas(400, 400);
  textAlign(CENTER);

  //start with nothing on screen
  mainbutton = new Sprite(-200, -200);
  rules_button = new Sprite(-200, -200, "k");
  backbutton = new Sprite(-200, -200, "k");
  tryagain_button = new Sprite(-200, -200, "k");
  instructions_button = new Sprite(-200, -200, "k");
  start_button = new Sprite(-200, -200, "k");

  catcher_odd = new Sprite(-200, -200, 'k');
  catcher_even = new Sprite(-200, -200, 'k');

  //creating brain's images
  brain1 = new Sprite(brain1_img, 269, height/2 - 120);
  brain1.scale = 0.75;

  brain2 = new Sprite (brain2_img, -200, -200, "k");
  brain2.scale = 0.45;

  brain3 = new Sprite (brain3_img, -200, -200, "k");
  brain3.scale = 0.75;

  brain4 = new Sprite (brain4_img, -200, -200, "k");
  brain4.scale = 0.80;

  math = new Sprite(math_img, -200, -200, "k");
  math.scale = 0.40;

  instructions = new Sprite(instructions_img, -200, -200, "k");
  instructions.scale = 0.30;
}

function draw() {
  background("lightgray");

  if (screen == 0){
    showscreen1();
    if (mainbutton.mouse.presses()) {
      screen = 2;
    }
  }

  if (screen == 2) {
    showscreen2();
  }
  if (start_button.mouse.presses()){
    screen = 3;
    resetEquations();
    initScreen3();
    resetGameState();
  }

  if (screen == 5){
    showscreen5();
  }

  if (screen == 3) {
    showscreen3();
  }

  if (screen == 4){
    showscreen4();
  }

  if (backbutton.mouse.presses()) {
    screen = 2;
  }
  if(tryagain_button.mouse.presses()){
    fail = 0;
    score = 0;
    resetEquations();
    initScreen3();
    screen = 3;
  } else if (instructions_button.mouse.presses()){
    screen = 2;
    resetGameState();
  }
  
  //Reset equations when exiting the game screen
  if (screen != 3) {
    resetEquations(); 
  }
}

// screen 1 (the first)
function showscreen1(){
  textSize(30);
  text("Welcome to\nBrainFall!!", 90, height / 2 - 100);

  textSize(22);
  text("A place where you'll face\ncountless challenges\n that will make your brain fall apart!!", width / 2, height/2 + 20);

  // the 'main' button
  mainbutton.pos = { x: width / 2, y: height / 2 + 140};
  mainbutton.w = 135;
  mainbutton.h = 40;
  mainbutton.collider = "k";
  mainbutton.color = "white";
  mainbutton.textSize = 15;
  mainbutton.text = "Click here for start!!";
}

// screen 2
function showscreen2() {
  background("lightgray");

  // remove somethings
  tryagain_button.pos = {x: -200, y: -200};
  instructions_button.pos = {x: - 200, y: -200};
  brain3.pos = {x: -200, y: -200};
  mainbutton.pos = { x: -200, y: -200 };
  brain1.pos = {x: -200, y: -200};
  catcher_odd.pos = { x: -200, y: -200 };
  catcher_even.pos = { x: -200, y: -200 };
  instructions.pos = { x: -200, y: -200 };

  //some images
  brain2.pos = {x: 130, y: 60};
  math.pos = {x: 270, y: 60};

  //Text before the rules
  fill(0);
  textSize(20);
  textAlign(CENTER);
  text("To play, you’ll need to quickly\ncalculate the value of the falling\nequations.If the result is even, let it fall\ninto the catcher labeled 'even', and if it’s\nodd, let it fall into the catcher\nlabeled 'odd'.", width / 2, 160);

  // button for go to rules
  rules_button.pos = { x: width / 2, y: height / 2 + 140 };
  rules_button.w = 150;
  rules_button.h = 40;
  rules_button.collider = "k";
  rules_button.color = "white";
  rules_button.textSize = 15;
  rules_button.text = "click for see the rules";

  if (rules_button.mouse.presses()){
    screen = 5;
  }
}

// screen 3
function showscreen3() {
  background("lightgray");
  catcher_odd.update();
  catcher_even.update();

  // remove somethings
  start_button.pos = { x: -200, y: -200};
  mainbutton.pos = { x: -200, y: -200 };
  rules_button.pos = { x: -200, y: -200 };
  backbutton.pos = { x: -200, y: -200 };
  brain2.pos = {x: -130, y: -60};
  math.pos = {x: -270, y: -60};
  tryagain_button.pos = {x: -200, y: -200};
  instructions_button.pos = {x: - 200, y: -200};
  brain3.pos = {x: -200, y: -200};
  brain4.pos = {x: -200, y: -200};

  // the 'back to instructions' button
  instructions.pos = { x: 360, y: 29};
  instructions.w = 20;
  instructions.h = 20;
  instructions.collider = "k";

  if (instructions.mouse.presses()){
    screen = 2;
  }

  // Move catchers
  if (keyIsPressed) {
    // Move catcher_odd with 'left' and 'right'
    if (keyCode === LEFT_ARROW) {
      catcher_odd.pos.x -= 3;
    } else if (keyCode === RIGHT_ARROW) {
      catcher_odd.pos.x += 3;
    }

    // Move catcher_even with A and D
    if (key === 'a' || key === 'A') {
      catcher_even.pos.x -= 3;
    } else if (key === 'd' || key === 'D') {
      catcher_even.pos.x += 3;
    }
  }

  // create a new value
  let halfEven = catcher_even.w / 2;
  let halfOdd = catcher_odd.w / 2;

  //to prevent the catchers from going off-screen
  catcher_even.pos.x = constrain(catcher_even.pos.x, halfEven, width - halfEven);
  catcher_odd.pos.x = constrain(catcher_odd.pos.x, halfOdd, width - halfOdd);

  // if you missed 5, you can try again or read the instructions
  if (fail == 5) {
    screen = 4;
    resetEquations();
    return;
  }

  // text 'instructions'
  fill(0);
  textSize(13);
  textAlign(RIGHT);
  text(`instructions`, 390, 55);

  // text 'score' and 'mistakes'
  fill(0);
  textSize(16);
  textAlign(LEFT);
  text(`Score: ` + score, 15, 40);
  text('Mistakes: ' + fail, 15, 70);

  // to equations
  frameCounter++;
  if (frameCounter % equationInterval === 0) {
    spawnEquation();
  }

  for (let i = equations.length - 1; i >= 0; i--) {
    let eq = equations[i];
    eq.y += 2;
    eq.sprite.pos.y = eq.y;
    eq.sprite.text = eq.text;

    if (eq.sprite.collides(catcher_even)) {
      if (eq.result % 2 === 0) {
        score++;
      } else {
        fail++;
      }
      eq.sprite.remove();
      equations.splice(i, 1);
    } else if (eq.sprite.collides(catcher_odd)) {
      if (eq.result % 2 !== 0) {
        score++;
      } else {
        fail++;
      }
      eq.sprite.remove();
      equations.splice(i, 1);
    } else if (eq.y > height + 20) {
      fail++;
      eq.sprite.remove();
      equations.splice(i, 1);
    }
  }
}

// screen 4
function showscreen4 (){
  background ("lightgray");
  textAlign(CENTER);

  // remove somethings
  mainbutton.pos = { x: -200, y: -200 };
  backbutton.pos = { x: -200, y: -200 };
  brain2.pos = {x: -130, y: -60};
  math.pos = {x: -270, y: -60};
  catcher_even.pos = { x: -200, y: -200 };
  catcher_odd.pos = { x: -200, y: -200 };
  instructions.pos = { x: -200, y: -200 };
  start_button = new Sprite(-200, -200, "k");

  // texts 
  textSize(25);
  text("You missed 5!", width/2, height/2 - 30);
  
  textSize(20);
  text("Try again or go back\nto the instructions!", width/2, height/2 + 40);

  //adding brain image
  brain3.pos = {x: 200, y: 65};

  // the buttons to 'try again' and 'back instructions'
  tryagain_button.pos = { x: width / 2 - 100, y: height / 2 + 140};
  tryagain_button.w = 120;
  tryagain_button.h = 40;
  tryagain_button.collider = "k";
  tryagain_button.color = "white";
  tryagain_button.textSize = 15;
  tryagain_button.text = "Try again";

  instructions_button.pos = { x: width / 2 + 100, y: height / 2 + 140 };
  instructions_button.w = 120;
  instructions_button.h = 40;
  instructions_button.collider = "k";
  instructions_button.color = "white";
  instructions_button.textSize = 15;
  instructions_button.text = "Instructions";

}

// screen 5 (after screen 2)
function showscreen5(){
  background ("lightgray");
  textAlign(CENTER);

  // remove some things
  mainbutton.pos = { x: -200, y: -200 };
  backbutton.pos = { x: -200, y: -200 };
  brain2.pos = {x: -130, y: -60};
  math.pos = {x: -270, y: -60};
  catcher_even.pos = { x: -200, y: -200 };
  catcher_odd.pos = { x: -200, y: -200 };
  instructions.pos = { x: -200, y: -200 };
  rules_button.pos = {x: -200, y: -200};

  //adding brain image
  brain4.pos = {x: 200, y: 80};

  // the button for play the game
  start_button.pos = { x: width / 2, y: height / 2 + 140};
  start_button.w = 120;
  start_button.h = 30;
  start_button.collider = "k";
  start_button.color = "white";
  start_button.text = "START!!";

  //text for 'how to play'
  textSize(20);
  text("To play, use the 'A' and 'D'\nkeys to move the 'Even' catcher,\nand the left and right arrow keys to\ncontrol the 'Odd' catcher.", width / 2, 190);
  
}

// equations
function spawnEquation() {
  let a = Math.floor(random(1, 10));
  let b = Math.floor(random(1, 10));
  let op = random(["+", "-"]);
  let res = op === "+" ? a + b : a - b;
  let txt = `${a} ${op} ${b}`;
  let x = random(50, 350);
  let s = new Sprite(x, 0, 60, 30, 'k');
  s.color = "white";
  s.textSize = 14;
  equations.push({ sprite: s, text: txt, result: res, y: 0 });
}

// reset equations
function resetEquations() {
  for (let eq of equations) {
    eq.sprite.remove();
  }
  equations = [];
  frameCounter = 0;
}


function resetGameState() {
  score = 0;
  fail = 0;
  resetEquations();
  initScreen3(); // Resets the catchers to their initial position and state
}


function initScreen3() {
  // Reset visual state
  catcher_even.text = ""; // Clear previous text
  catcher_even.rotation = 0; // Make sure it's not tilted

  catcher_odd.text = "";
  catcher_odd.rotation = 0;

  // creating the catchers
  catcher_odd.pos = { x: 335, y: height / 2 + 170 };
  catcher_odd.w = 100;
  catcher_odd.h = 30;
  catcher_odd.collider = "d";
  catcher_odd.color = "lightpink";
  catcher_odd.textSize = 15;
  catcher_odd.text = "odd";

  catcher_even.pos = { x: 60, y: height / 2 + 120 };
  catcher_even.w = 100;
  catcher_even.h = 30;
  catcher_even.collider = "d";
  catcher_even.color = "hotpink";
  catcher_even.textSize = 15;
  catcher_even.text = "even";
}