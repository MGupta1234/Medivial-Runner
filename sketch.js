//Welcome to medivail runner
//your objective in this to get the highest score without touching the poisonous mushrooms.
//there were some bugs that i couldnt fix
// 1: gameover not going away after the gamestate End
// 2: background is overlapping score and highscore
var speedrunner, runnerImg;
var hunter,hunterImg;
var jungle,jungleImg;
var obstacle,obstacleImg,obstacleGroup;
var PLAY=1;
var END=0;
var gameState=PLAY;
var invisGround;
var score=0;
var highScore=0;
var gameover,gameoverImg;

function preload(){
runnerImg=loadAnimation("RealSpeed runner.gif");
jungleImg=loadImage("BackgroundSmp.png");
obstacleImg=loadImage("POG4.png");
gameoverImg=loadImage("gameover.jpg");
}

function setup() {
 createCanvas(450,400);
 
 jungle=createSprite(225,200,20,20);
 jungle.addImage("backImg",jungleImg);
 jungle.scale=1.5;
 jungle.x=jungle.width/2;
 
 speedrunner=createSprite(50,400,10,10);
 speedrunner.addAnimation("MGrun",runnerImg);
 speedrunner.scale=0.3;
 speedrunner.debug=true;
 speedrunner.setCollider("rectangle",0,0,300,400);
  
 invisGround=createSprite(200,400,400,20);
 invisGround.visible=false;
 obstacleGroup=createGroup();
 
}

function draw() {
 background(255);
 
 //textSize=26
 text("HI:"+highScore,300,50); 
 text("Score:"+ score,350,50);
 GameoverScreen();
  gameover.visible=false;
 if(gameState===PLAY){
   //INFINITE BACKGROUND💨
   jungle.velocityX=-(5+2* score/100);
   score=score+Math.round(getFrameRate()/60);
   if(jungle.x<0){
     jungle.x=jungle.width/2;
   }
   if(keyDown("space") && speedrunner.y>=330){
     speedrunner.velocityY=-16;
   }
   if(score>highScore){
     highScore=score;
   }
   
   speedrunner.velocityY=speedrunner.velocityY+0.6;
   spawnObstacles();
   gameover.visible=false;
   if(obstacleGroup.isTouching(speedrunner)){
     gameState=END;
   }
 }else if(gameState===END){
   jungle.velocityX=0;
   speedrunner.velocityY=0;
   
   obstacleGroup.setVelocityXEach(0);
   obstacleGroup.setLifetimeEach(-1);
   
   gameover.visible=true;
 }
 speedrunner.collide(invisGround);
 if(mousePressedOver(gameover)){
   reset();
 }
 drawSprites();
}
function spawnObstacles(){
  if(frameCount%60===0){
  obstacle=createSprite(430,350,10,10);
  obstacle.addImage(obstacleImg);
  obstacle.scale=0.1;
  obstacle.velocityX=-(6+2*score/100);
  obstacle.lifetime=70;
  obstacleGroup.add(obstacle);
  obstacle.setCollider("rectangle",0,0,obstacle.width,obstacle.height);
  obstacle.debug=true;
  }


}
function GameoverScreen(){
  gameover=createSprite(225,200,10,10);
  gameover.addImage(gameoverImg);
  gameover.scale=0.7
  
}
function reset(){
  score=0;
  obstacleGroup.destroyEach();
  gameover.destroy();
  gameState=PLAY;
}