function init(){
   canvas = document.getElementById('myCanvas');
   pen = canvas.getContext('2d');
   W = canvas.width;
   H = canvas.height;

   food = getRandomFood();
   score = 5;

  snake = {
    init_length: 5,
    color: "yellow",
    cells: [],
    direction: "right",

    createSnake : function (){
      for (var i = this.init_length-1; i >= 0; i--) {
        this.cells.push({x:i,y:0});
      }
    },

    drawSnake : function (){
      for (var i = 0; i < this.cells.length; i++) {
        pen.strokeStyle = "black"
        pen.lineWidth = '2';
        pen.fillStyle = this.color;
        pen.strokeRect(this.cells[i].x*10, this.cells[i].y*10, 10, 10);
        pen.fillRect(this.cells[i].x*10, this.cells[i].y*10, 10, 10);
      }
    },

    updateSnake : function (){
      var headX = this.cells[0].x;
      var headY = this.cells[0].y;

      // nextHeadX = headX+1;
      // this.cells.unshift({x:nextHeadX,y:headY});

      if (headX==food.x && headY==food.y) {
        food = getRandomFood();
        score++;
      }else {
        this.cells.pop();
      }

      if (this.direction == "right") {
        nextX = headX+1;
        nextY = headY;
      }else if (this.direction == "left") {
        nextX = headX-1;
        nextY = headY;
      }else if (this.direction == "down") {
        nextX = headX;
        nextY = headY+1;
      }else{
        nextX = headX;
        nextY = headY-1;
      }

      this.cells.unshift({x:nextX,y:nextY});

      var lastX = Math.round((W-10)/10);
      var lastY = Math.round((H-10)/10);

      if (this.cells[0].x<0 || this.cells[0].y<0 || this.cells[0].x>lastX || this.cells[0].y>lastY) {
        alert("GAME OVER!");
      }
    },

  };
  snake.createSnake();

  function keyPressed(e){
    // console.log('you pressed');
    // console.log(e);

    if(e.key=="ArrowRight"){
      snake.direction="right";
    }else if (e.key == "ArrowLeft") {
      snake.direction = "left";
    }else if (e.key == "ArrowDown") {
      snake.direction = "down";
    }else{
      snake.direction = "up";
    }
  }

  document.addEventListener('keydown', keyPressed);
}

function draw(){
  pen.clearRect(0,0,W,H);
  snake.drawSnake();

  pen.fillStyle = food.color;
  pen.fillRect(food.x*10,food.y*10,10,10);

  pen.fillStyle = "white";
  pen.font = "10px Arial";
  pen.fillText('Score: '+score, 10,10);
}

function update(){
  // console.log('In update');
  snake.updateSnake();
}

function gameLoop(){
  draw();
  update();
}


function getRandomFood(){

  var foodX = Math.round(Math.random()*(W-20)/20);
  var foodY = Math.round(Math.random()*(W-20)/20);

  foodColors=["red","green","aqua","coral","orchid"];
  var i = Math.round(Math.random()*foodColors.length);

  var food = {
    x: foodX,
    y: foodY,
    color: foodColors[i],
  }
  return food;
}

init();
setInterval(gameLoop, 80);
