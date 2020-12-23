var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var turtle,rabbit,participant;

function preload(){
  turtleImg = loadImage("turtle.png");
  rabbitImg = loadImage("rabbit.png");
  trackImg = loadImage("track.png");

}
function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
  
}


function draw(){
  if(playerCount === 2){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState===2)
  {
    game.end();
  }
}
