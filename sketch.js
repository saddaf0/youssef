var flappyBird
var bG
var pipes
var pipes1
var pipesGroup
var pipesGroup1
var gameOver
var p1
var gameState = "play"
var score;

function preload(){
  flappyBirdImg = loadImage("flappybirdcharacter-removebg-preview.png")
  bG = loadImage("flappybirdbackground.jpg")
  pipeImage = loadImage("flappybirdpipedown.png")
  p1=loadImage("flappybirdpipeup.png")
  gameOverImg = loadImage("gameoverimage.jpg")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  flappyBird = createSprite(40, 200, 50, 50);
  flappyBird.addImage ("bird", flappyBirdImg)
  flappyBird.scale = 0.3
  invisibleGround = createSprite(200,height-50,400,10);
  invisibleGround.visible = false;
  pipesGroup = new Group()
  pipesGroup1 = new Group()
  // gameOver = createSprite(width/2, height/2)
  // gameOver.addImage("game Over", gameOverImg)
score=0

}



function draw() {

  if (gameState === "play"){
    text(score,0,0) 
score=score+1
  background(bG);  
  if(keyDown("space")&& flappyBird.y >= 100) {
    flappyBird.velocityY = -12;
}

spawnPipes()
spawnPipes1()
//add gravity
flappyBird.velocityY = flappyBird.velocityY + 0.8  
flappyBird.collide(invisibleGround);
  drawSprites();
  if (flappyBird.isTouching (pipesGroup) || flappyBird.isTouching(pipesGroup1)) {
  gameState="end"
   }
  }
  if(gameState==="end"){
      flappyBird.velocityY = 0
    pipesGroup.destroyEach()
    background(gameOverImg)
  }
}

function spawnPipes() {
  if (frameCount %60 === 0) {
    pipes = createSprite(width, 580);
    pipes.velocityX=-(10+score/100)
    pipes.debug = true
    pipes.setCollider("rectangle",0,-7,30,100)
    
   
    pipes.addImage(pipeImage)
    pipes.scale = 2.5
    pipes.depth = flappyBird.depth;
    flappyBird.depth = flappyBird.depth + 1;
    pipesGroup.add(pipes)

    pipes.lifetime = 500

    
  }
}

function spawnPipes1() {
  if (frameCount %60 === 0) {
    pipes1 = createSprite(width, 80);
    pipes1.debug = true
    pipes1.setCollider("rectangle",0,7,30,100)
    
    pipes1.velocityX=-(10+score/100)
    pipes1.addImage(p1)
    pipes1.scale = 2.5
    pipesGroup1.add(pipes1)

    pipes1.lifetime = 500


   
  }
}