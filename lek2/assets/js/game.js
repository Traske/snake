//gamea.js
// Sätter in globala variabler som vi behöver i spelet
var snake, apple, squareSize, score, speed,
    updateDelay, direction, new_direction,
    addNew, cursors, scoreTextValue, speedTextValue, textStyle_Key, textStyle_Value, score, style;
var Game = {
	preload : function() {
		game.load.image('snake', './assets/images/snake.png');
        game.load.image('apple', './assets/images/apple.png');
        game.load.image('Up', '/assets/images/up.png');
        game.load.image('Down', '/assets/images/down.png');
        game.load.image('Right', '/assets/images/right.png');
        game.load.image('Left', '/assets/images/left.png');
	},
	create : function() {
		// Initilaze
		snake = [];						// this will work as a stack
		apple = {};                     // An object for the apple;
		squareSize = 15;                // The length of a side of the squares. Our image is 15x15 pixels.
		speed = 0;
		direction = 'right';			// The directin of our snake
        new_direction = null;
        updateDelay= 0;			        // A Buffer to store the new direction into
        addNew= false;
        score = 0;
		
        cursors = game.input.keyboard.createCursorKeys();
        scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
		
	    game.stage.backgroundColor = '#061fff';	
	    console.log("FOO");
	 
        for(var i = 0; i < 10; i++){
            snake[i] = game.add.sprite(150+i*squareSize, 150, 'snake');  
        }
	    
	    this.generateApple();
	},
	update : function() {
        if (cursors.right.isDown && direction!='left') {
            direction = 'right';
        } else if (cursors.left.isDown && direction!='right') {
            direction = 'left';
        } else if (cursors.up.isDown && direction!='down') {
            direction = 'up';
        } else if (cursors.down.isDown && direction!='up') {
            direction = 'down';
        }
        updateDelay ++;
        if (updateDelay%(10-speed) == 0) {
           
		    var firstCell = snake[snake.length -1],
			lastCell = snake.shift(),
			oldLastCellx = lastCell.x,
			oldLastCelly = lastCell.y;
			if(new_direction) {
				direction = new_direction;
				new_direction = null;
			}
			if(direction == 'right' ) {
				lastCell.x = firstCell.x +15;
				lastCell.y = firstCell.y;
				
			} else if (direction == 'left') {
                lastCell.x = firstCell.x -15;
                lastCell.y = firstCell.y;
            } else if (direction == 'up') {
                lastCell.x = firstCell.x;
                lastCell.y = firstCell.y -15;
            } else if (direction == 'down') {
                lastCell.x = firstCell.x;
                lastCell.y = firstCell.y +15;
            }
		
			snake.push(lastCell);
            firstCell = lastCell;
            if (addNew) {
                snake.unshift(game.add.sprite(oldLastCellx, oldLastCelly, 'snake'))
                addNew = false;
            }
            this.appleCollision();
            this.selfCollision(firstCell);
            this.wallCollision(firstCell);
        }
        this.add.button(300, 330, 'Up', this.up, this);
        this.add.button(300, 390, 'Down', this.down, this);
        this.add.button(270, 360, 'Left', this.left, this);
        this.add.button(330, 360, 'Right', this.right, this);
    },
    appleCollision: function(){
        for (var i = 0; i < snake.length; i++) {
            if (snake[i].x == apple.x && snake[i].y == apple.y) {
                addNew=true;
                apple.destroy();
                this.generateApple();
                score++;
                scoreText.text = 'Score: ' + score;
                speed = speed + 0.5;
                console.log("speed = " + speed);
            }
        }
    },
	
	generateApple: function(){
  
        var randomX = Math.floor(Math.random() * 40 ) * squareSize,
            randomY = Math.floor(Math.random() * 30 ) * squareSize;
       
        apple = game.add.sprite(randomX, randomY, 'apple');
    },
    selfCollision: function(head){
        for (var i = 0; i < snake.length-1; i++) {
            if (head.x == snake[i].x && head.y == snake[i].y) {
                game.state.start('Game_Over');
                console.log(score)
            }
        }
    },
    wallCollision: function(head) {
        // Check if the head of the snake is in the boundaries of the game field.
        if(head.x >= 600 || head.x < 0 || head.y >= 450 || head.y < 0){
            // If it's not in, we've hit a wall. Go to game over screen.
            game.state.start('Game_Over');
            console.log(score)
        }
    },
    up: function(){
        if (direction!='down') {
            direction = 'up';
        }
    },
    down: function(){
        if (direction!='up') {
            direction = 'down';
        }
    },
    right: function(){
        if (direction!='left') {
            direction = 'right';
        }
    },
    left: function(){
        if (direction!='right') {
            direction = 'left';
        }
    },
};