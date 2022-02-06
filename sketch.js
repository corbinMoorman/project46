var gameState = "start"
var fsImg1, fsImg2
var rightRunanimation, leftRunanimation
var jump1, jump2
var jL, jR
var runL, runR ,zRWalk,zLwalk
var bgImg
var futureSldr
var zLDead, zRDead, zLAttack,zRAttack
var titleImg
var playBtn, backBtn, storyBtn
var bulletImg

function preload(){
//titleAndBackground  
bgImg = loadImage("background.png")
titleImg = loadImage("zSlayer_title.png")
//buttons
playBtn = loadImage("playBtn.png")
backBtn = loadImage("backButton.png")
storyBtn = loadImage("storyButton.png")
bulletImg = loadImage("bullet.png")
//soldierAnimations  
fsImg1 = loadAnimation("future_soldier1.png")
fsImg2 = loadAnimation("future_soldier2.png")
jump1 = loadAnimation("fsldr_jump1.png")
jump2 = loadAnimation("fsldr_jump2.png")
rightRunanimation = loadAnimation("fsldr_runR1.png","fsldr_runR2.png","fsldr_runR3.png","fsldr_runR4.png","fsldr_runR5.png","fsldr_runR6.png")
leftRunanimation = loadAnimation("fsldr_runL2.png","fsldr_runL3.png","fsldr_runL4.png","fsldr_runL5.png")
//zombieAnimations
zRWalk = loadAnimation("zL_walk1.png", "zL_walk2.png","zL_walk3.png","zL_walk4.png", "zL_walk5.png", "zL_walk6.png", "zL_walk7.png", "zL_walk8.png")
zRDead = loadAnimation("zL_dead10.png","zL_dead20.png","zL_dead30.png","zL_dead40.png",)
zRAttack = loadAnimation("zL_attack10.png", "zL_attack20.png", "zL_attack30.png", "zL_attack40.png", "zL_attack50.png", "zL_attack60.png", "zL_attack70.png", "zL_attack80.png")

zLWalk = loadAnimation("zR_walk10.png", "zR_walk20.png","zR_walk30.png","zR_walk40.png","zR_walk50.png","zR_walk60.png","zR_walk70.png","zR_walk80.png","zR_walk90.png")
zLAttack = loadAnimation("zR_attack10.png","zR_attack20.png","zR_attack30.png","zR_attack40.png","zR_attack50.png","zR_attack60.png","zR_attack70.png","zR_attack80.png")
zLDead = loadAnimation("zR_dead10.png","zR_dead20.png","zR_dead30.png","zR_dead40.png")
}

function setup() {
  createCanvas(900,600);
  title =  createSprite(500,250,10,20)
  title.addImage(titleImg)
  title.scale = 2
 
  startButton = createSprite(478, 340, 50, 50);
  startButton.addImage(playBtn)
  startButton.scale = 2
  
  //bullet group
  bulletGroup = new Group()
  
  //zrwalk group
   zRightWalkGroup = new Group()

   //zlwalk group
   zLeftWalkGroup = new Group()


  //PC
  futureSldr = createSprite(466,486,70,70)
  futureSldr.addAnimation("normal1",fsImg1)
  futureSldr.addAnimation("normal2",fsImg2)
  futureSldr.addAnimation("jumpL",jump1)
  futureSldr.addAnimation("jumpR",jump2)
  futureSldr.addAnimation("RunL",leftRunanimation)
  futureSldr.addAnimation("RunR",rightRunanimation)
  futureSldr.changeAnimation("normal1",fsImg1)
  futureSldr.scale = 2

  
 
  //invisibleGround
  invisibleGround = createSprite(450,545,900,10)
  invisibleGround.visible = false

  
}

function draw() {
  background(bgImg) 
  fill ("white")
  text(mouseX+','+ mouseY,mouseX,mouseY);

   // Start 
   if(gameState ===  "start"){
    
    //change gameState to play
    if(mousePressedOver(startButton)){
     gameState = "play"
     startButton.destroy()
     
    }
   }

   //play state
   if(gameState ===  "play"){
     title.visible = false
   
    //npc
    spawnRightZombies()
    spawnLeftZombies()

    //PC movement
    if(keyWentDown(LEFT_ARROW)){
      futureSldr.velocityX = -5
      futureSldr.changeAnimation("RunL")
      
    } 
    if(keyWentUp(LEFT_ARROW)){
      
      futureSldr.changeAnimation("normal2")
      futureSldr.velocityX = 0
    } 
    if(keyWentDown(RIGHT_ARROW)){
      futureSldr.velocityX = 5
      futureSldr.changeAnimation("RunR")
    }
    if(keyWentUp(RIGHT_ARROW)){
    
      futureSldr.changeAnimation("normal1")
      futureSldr.velocityX = 0
    } 
    if(keyWentDown(UP_ARROW)){
      futureSldr.velocityY = -20
      futureSldr.changeAnimation("jumpL")
    }
    if(keyWentUp(UP_ARROW)){
      futureSldr.changeAnimation("normal1")
      futureSldr.velocityY = 1
    }
  // zombie attack  
  if(zLeftWalkGroup.collide(futureSldr)){
   zLeftWalk.changeAnimation("zLA", zLAttack)
   zLeftWalk.velocityX = 0
   zLeftWalk.lifetime = 180
  }
  if(zRightWalkGroup.collide(futureSldr)){
    zRightWalk.changeAnimation("zRA", zRAttack)
    zRightWalk.velocityX = 0
    zLeftWalk.lifetime = 180

   }
   
    //futuresldr defeat zombie
  if(keyCode === 83){
    shootBulletRIght()
  }

  if(keyCode === 65){
    shootBulletLeft()
  }
  if(bulletGroup.collide(zLeftWalkGroup)){
    bulletGroup.destroyEach()
    zLeftWalkGroup.destroyEach()
    }

  if(bulletGroup.collide(zRightWalkGroup)){
    bulletGroup.destroyEach()
    zRightWalkGroup.destroyEach()
  }
  
  
    //applying Gravity
    futureSldr.velocityY = futureSldr.velocityY +1
   }

   //colliding the future soldier with the ground 
   futureSldr.collide(invisibleGround)
  
  drawSprites();
}
//Npc
function spawnRightZombies(){
  if(frameCount % 120 === 0){
   zRightWalk = createSprite(0,500, 10,10)
   zRightWalk.lifetime = 180
   zRightWalk.addAnimation("zLW", zLWalk)
   zRightWalk.addAnimation("zRA", zRAttack)
   zRightWalk.addAnimation("zLD", zLDead)
   zRightWalk.velocityX = 5
   zRightWalk.scale = 1.4
   zRightWalkGroup.add(zRightWalk)
  }
  
}
//Npc
function spawnLeftZombies(){
  if(frameCount % 100 === 0){
    zLeftWalk = createSprite(900,510, 10,10)
    zLeftWalk.lifetime = 180
    zLeftWalk.addAnimation("zRW", zRWalk)
    zLeftWalk.addAnimation("zLA", zLAttack)
    zLeftWalk.addAnimation("zRD", zRDead)
    zLeftWalk.velocityX = -5
    zLeftWalk.scale =  1.4
    zLeftWalkGroup.add(zLeftWalk)
    zLeftWalkGroup.collide(invisibleGround)
   }
   
}
//bullet
function shootBulletRIght(){
 if(frameCount % 4 === 0){
  bullet= createSprite(150, width/2, 50,20)
  bullet.x = futureSldr.x 
  bullet.y = futureSldr.y 
  bullet.addImage(bulletImg)
  bullet.scale=1.1
  bullet.velocityX= 25
  bulletGroup.add(bullet)
  zRightWalkGroup.collide(invisibleGround)
 }
}
function shootBulletLeft(){
  if(frameCount % 4 === 0){
   bullet= createSprite(150, width/2, 50,20)
   bullet.x = futureSldr.x 
   bullet.y = futureSldr.y 
   bullet.addImage(bulletImg)
   bullet.scale=1.1
   bullet.velocityX= -25
   bulletGroup.add(bullet)
  }
 }