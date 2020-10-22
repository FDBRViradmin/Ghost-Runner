var gameState="PLAY";

var ghost, ghostImage, ghostJump
var fortress, backImage
var door, doorImage, doorGroup
var climber, climberImage, climberGroup
var halloweenSound
var invisibleBlock, invisibleBlockGroup

function preload(){
  ghostImage=loadImage("ghost-standing.png");
  ghostJump=loadImage("ghost-jumping.png");
  backImage=loadImage("tower.png");
  climberImage=loadImage("climber.png");
  doorImage=loadImage("door.png");
}

function setup(){
  createCanvas(600,600);
  
  fortress=createSprite(300,300);
  fortress.addImage(backImage);
  fortress.y=fortress.height/2;

  doorGroup=createGroup();
  climberGroup=createGroup();
  invisibleBlockGroup=createGroup();
  
  ghost=createSprite(300,300);
  ghost.addImage(ghostImage);
  ghost.scale=0.4
}

function draw(){
  background(0);
  if (gameState==="PLAY"){
  fortress.velocityY=3;
  if (fortress.y>600){
    fortress.y=300;
  }
  if(keyDown("left")){
    ghost.x=ghost.x-3;
  }
  if(keyDown("right")){
    ghost.x=ghost.x+3;
  }
  if(keyDown("space")){
    ghost.velocityY=-3;
  }
  ghost.velocityY=ghost.velocityY+0.5;
  
  if(climberGroup.isTouching(ghost)){
    ghost.velocityY=0;
  }
  if(invisibleBlockGroup.isTouching(ghost) || ghost.y>600){
    ghost.destroy();
    gameState="END";
  }
  spawnDoors();
  drawSprites(); 
  } 
  if (gameState==="END"){
    textSize(50);
    stroke("yellow");
    fill("yellow");
    text("Game Over",300,300);
  }
}

function spawnDoors(){
  if(frameCount % 200===0){
  door=createSprite(200,-50);
  door.addImage(doorImage);
  door.x=Math.round(random(200,400));
  climber=createSprite(door.x,10);
  climber.addImage(climberImage);
  
  invisibleBlock=createSprite(door.x,15,climber.width,2);
    
  door.velocityY=3;
  climber.velocityY=3;
  invisibleBlock.velocityY=3;
    
  door.lifetime=200;
  climber.lifetime=200;
  invisibleBlock.lifetime=200;
  
  door.depth=ghost.depth;
  ghost.depth=ghost.depth+1;
  
  doorGroup.add(door);
  climberGroup.add(climber);
  invisibleBlock.debug=true;
  invisibleBlockGroup.add(invisibleBlock);
  }
}