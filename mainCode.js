
var game = new Phaser.Game(600, 480, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

var MySprite = function(who,x,y,dx,dy,width,height,color,isDragable){
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.width = width;
	this.height = height;
	this.image = game.add.sprite(x, y, who);
	this.image.scale.setTo(width/this.image.width, height/this.image.height);
	this.image.anchor.setTo(0.5,0.5);
	//this.bounceAmount = dy;
	//this.y = y - this.image.height;
	//this.drawing = game.add.graphics(this.x,this.y);
	//this.drawing.beginFill(color);
	//this.drawing.drawCircle(0,0,this.width);
	//this.drawing.endFill();
	if(isDragable){
		//this.drawing.inputEnabled = true;
		//this.drawing.input.enableDrag(true);
		this.image.inputEnabled = true;
		this.image.input.enableDrag(true);
	}
	this.chase = function(chaseWho){
		
		if(chaseWho.getX() > this.x){
			this.dx = Math.abs(this.dx);
		}
		if(chaseWho.getX() <= this.x){
			this.dx = -Math.abs(this.dx);
		}
		if(chaseWho.getY() >this.y){
			this.dy = Math.abs(this.dy);
		}
		if(chaseWho.getY() <= this.y){
			this.dy = -Math.abs(this.dy);
		}
		this.x+=this.dx;
		this.y+=this.dy;
		this.image.x = this.x;
		this.image.y = this.y;
	
	};
	this.faceRight = function(){
		this.image.scale.x = Math.abs(this.image.scale.x);
	};
	this.faceLeft = function(){
		this.image.scale.x = -Math.abs(this.image.scale.x);
	};
	this.moveGhost = function(lb,rb,tb,bb){
		this.image.x = this.x;
		this.image.y = this.y;
		this.x += this.dx;
		this.y += this.dy;
		if(this.y + this.dy - this.height/2 < tb || this.y + this.dy + this.height/2 > bb  ){
			this.dy = -this.dy;
		}
	};
	this.move = function(lb,rb,tb,bb){
		//this.drawing.x = this.x;
		//this.drawing.y = this.y;
		this.image.x = this.x;
		this.image.y = this.y;
		
		
		if(this.x + this.dx - this.width/2 >= lb && this.x + this.dx + this.width/2 <= rb){			
			this.x += this.dx;
		}
		if(this.y + this.dy - this.height/2 >= tb && this.y + this.dy + this.height/2 <= bb){
			this.y += this.dy;
		}
		/*
		if(this.x + this.dx  >= lb && this.x + this.dx + this.width <= rb){			
			this.x += this.dx;
		}
		if(this.y + this.dy  >= tb && this.y + this.dy + this.height <= bb){
			this.y += this.dy;
		}*/
		
		
	};
	this.reset = function(newX,newY,newDx,newDy){
		this.x = newX;
		this.y = newY;
		this.dx = newDx;
		this.dy = newDy;
		this.image.x = this.x;
		this.image.y = this.y;
	};
	this.flip = function(){
		
		if(this.x > game.width/2){
			this.x = 25;
		}
		else{
			this.x = game.width - 25;
		}
		this.image.x = this.x;
		
	};
	this.getWidth = function(){
		return this.width;
	};
	this.getX = function(){
		return this.x;
	};
	this.getY = function(){
		return this.y;
	};
	
	this.setDx = function(anydx){
		this.dx = anydx;
	};
	this.setDy = function(anydy){
		this.dy = anydy;
	};
	
	this.toString = function(){
		return "" + this.x + ", " + this.y + "--" + this.dx + ", " + this.dy + " - " ;
	};
	
	this.respawn = function(p){
		if(p.getX()> game.width/2){
			this.x = 25;
			this.y = game.height/2;
		}
		else{
			this.x = game.width - 25;
			this.y = game.height/2;
		}
		this.image.x = this.x;
		this.image.y = this.y;
	};
};

var gameState;

var text;
var text2;
var textGameOver;
var pacman;
var blue, orange, pink, red;
var pellet;
var upKey;
var downKey;
var leftKey;
var rightKey;
var spaceKey;
var enterKey;

var score = 0;
var lives = 10;


function preload() {

    //  You can fill the preloader with as many assets as your game requires

    //  Here we are loading an image. The first parameter is the unique
    //  string by which we'll identify the image later in our code.

    //  The second parameter is the URL of the image (relative)
	
    game.load.image('pacman', 'assets/pics/pacman.png');
    game.load.image('blue', 'assets/pics/blue.png');
    game.load.image('orange', 'assets/pics/orange.png');
    game.load.image('pink', 'assets/pics/pink.png');
    game.load.image('red', 'assets/pics/red.png');
    game.load.image('pellet', 'assets/pics/pellet.png');
    /*
    game.load.image('soccerball', 'assets/pics/soccerBall.png');
    game.load.image('tennisball', 'assets/pics/tennisball.png');
    game.load.image('volleyball', 'assets/pics/volleyball.png');
    
    game.load.image('background', 'assets/pics/background.png');
    */
}

function create() {

    //  This creates a simple sprite that is using our loaded image and
    //  displays it on-screen
    //  and assign it to a variable
   // var image = game.add.sprite(0, 0, 'einstein');

    //game.physics.enable(image, Phaser.Physics.ARCADE);

    //image.body.velocity.x=150;
	//var background = new MySprite(0,0,0,0,game.width,game.height,'background');
	pellet = new MySprite('pellet',game.width - 25,game.height/2,0,0,25,25, 0xffff00,false);
	pacman = new MySprite('pacman',25,game.height/2,0,0,50,50, 0xffff00,false);
	blue = new MySprite('blue',game.width/2,game.height/4,0,7,50,50, 0xffff00,false);
	orange = new MySprite('orange',game.width/2,game.height/2,-1,-1,50,50, 0xffff00,false);
	pink = new MySprite('pink',3*game.width/4,game.height/2,0,-4,50,50, 0xffff00,false);
	red = new MySprite('red',game.width/4,game.height/2,0,-5,50,50, 0xffff00,false);
	
	//yellowCircle = new MySprite('pacman',3*game.width/4,game.height/2,0,0,-25,25,0xff0000,true);

	
	upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_0);
    enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
	

	
	 var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

    //  The Text is positioned at 0, 100
    text = game.add.text(game.width/2-200, 50, "The Obstacle Game", style);
    textGameOver = game.add.text(game.width/2-50, game.height/2, "Game Over!", style);
    textGameOver.visible = false;
    text2 = game.add.text(game.width/2-300, game.height-50, "Collect the pellet, avoid the ghosts.", style);
    
    gameState = 0;
   // game.input.onDown.add(actionOnClick, this);
    //this.game.input.keyboard.onDown(actionOnClick,this);
   // this.game.input.addCallbacks(this, null, null,actionOnClick);
    
    this.game.input.keyboard.onDownCallback = function(e) {
    	if(gameState == 0){
    		gameState = 1;
    	}
    	else if(gameState == 2){
    		actionOnClick();
    	}
    };
}

function actionOnClick () {

	if(gameState == 2){
		score = 0;
		lives = 10;
		text.x = game.width/2-200;
		text.y = 50;
		text.text = "The Obstacle Game";
		text2.x = game.width/2-300;
		text2.y = game.height-50;
		text2.text = "Collect the pellet, avoid the ghosts.";
		gameState = 0;
		textGameOver.visible = false;
		pellet.reset(game.width - 25,game.height/2,0,0);
		pacman.reset(25,game.height/2,0,0);
		pacman.faceRight();
		blue.reset(game.width/2,game.height/4,0,7);
		orange.reset(game.width/2,game.height/2,-1,-1);
		pink.reset(3*game.width/4,game.height/2,0,-4);
		red.reset(game.width/4,game.height/2,0,-5);
		
	}
    

}

function update() {
	
	
	
	if(gameState == 2){
		textGameOver.visible = true;
	}
	
	
	if(gameState == 1){
		text.x = 0;
		text.y = 0;
		text.text = "Score = " + score;
		text2.x = game.width - 170;
		text2.y = 0;
		text2.text = "Lives = " + lives;
		pacman.move(0,game.width,0,game.height);
		red.moveGhost(0,game.width,0,game.height);
		pink.moveGhost(0,game.width,0,game.height);
		blue.moveGhost(0,game.width,0,game.height);
		orange.chase(pacman);
		
		if(collision(pacman,pellet,false)){
			score++;
			pellet.flip();
		}
		
		if(collision(pacman,pink,true)){
			pacman.respawn(pellet);
			lives--;
			if(lives <= 0){
				gameState = 2;
			}
		}
		if(collision(pacman,orange,true)){
			pacman.respawn(pellet);
			lives--;
			if(lives <= 0){
				gameState = 2;
			}
		}
		if(collision(pacman,red,true)){
			pacman.respawn(pellet);
			lives--;
			if(lives <= 0){
				gameState = 2;
			}
		}
		if(collision(pacman,blue,true)){
			pacman.respawn(pellet);
			lives--;
			if(lives <= 0){
				gameState = 2;
			}
		}
		//yellowCircle.move(0,game.width,0,game.height);
		if (spaceKey.isDown)
	    {
	        pacman.setDx(0);
	        pacman.setDy(0);
	    }
		if (upKey.isDown)
	    {
	        pacman.setDx(0);
	        pacman.setDy(-5);
	    }
	    else if (downKey.isDown)
	    {
	    	pacman.setDx(0);
	    	pacman.setDy(5);
	    }

	    if (leftKey.isDown)
	    {
	    	pacman.faceLeft();
	    	pacman.setDx(-5);
	    	pacman.setDy(0);
	    }
	    else if (rightKey.isDown)
	    {
	    	pacman.faceRight();
	    	pacman.setDx(5);
	    	pacman.setDy(0);
	    }

	}
	
}

function collision(who1, who2, isGhost){
	
	var xdiff = who1.getX() - who2.getX();
	var ydiff = who1.getY() - who2.getY();
	var divide = 2;
	if(isGhost){
		divide = 1.5;
	}
	
	var distance = Math.sqrt(xdiff*xdiff + ydiff*ydiff);
	//text.text = ""+ distance;
	if (distance <= who1.getWidth()/divide){
		return true;
	}
	
		return false;
	
}


