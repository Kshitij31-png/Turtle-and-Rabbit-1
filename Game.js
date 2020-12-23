class Game {
  constructor() {

  }

  getState() {
    var gameStateRef = database.ref('gameState');
    gameStateRef.on("value", function (data) {
      gameState = data.val();
    })

  }

  update(state) {
    database.ref('/').update({
      gameState: state
    });
  }

  async start() {
    if (gameState === 0) {
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if (playerCountRef.exists()) {
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form();
      form.display();
    }


    turtle = createSprite(800, 500);
    turtle.addImage(turtleImg);
    rabbit = createSprite(900, 500);
    rabbit.addImage(rabbitImg);
    participant = [turtle,rabbit];   
  }

  play() {
    form.hide();

    Player.getPlayerInfo();

    if (allPlayers !== undefined) {
      //var display_position = 100;
      background("#c68767");
      image(trackImg, 0, -displayHeight * 4, displayWidth, displayHeight * 5)
      //index of the array
      var index = 0;

      //x and y position of the participant
      var x = 300;
      var y;

      for (var plr in allPlayers) {
        //add 1 to the index for every loop
        index = index + 1;

        //position the participant a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the participant in y direction
        y = displayHeight - allPlayers[plr].distance;
        participant[index - 1].x = x;
        participant[index - 1].y = y;

        if (index === player.index) {
          participant[index - 1].shapeColor = "red";
          camera.position.x = displayWidth / 2;
          camera.position.y = participant[index - 1].y
        }

        // textSize(15);
        // text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if (keyDown(UP_ARROW) && player.index !== null) {
      player.distance += 10
      player.update();
    }
    if (player.distance >= 2000) {
      gameState = 2;
    }

    drawSprites();
  }
  end() {
    console.log("Game Ended");
  }
}
