var Load = {
    preload: function() {
      var loadingLabel = game.add.text(game.world.centerX, 150, 'Loading!', { font: '28px Sans Comic', fill: '#ffffff' });
      loadingLabel.anchor.setTo(0.5, 0,5);
      
      var progressBar = game.add.sprite(game.world.centerX, 200, 'progressBar');
      progressBar.anchor.setTo(0.5, 0.5);
      game.load.setPreloadSprite(progressBar);
      
      
      // test 
      game.load.image('snake', './assets/images/snake.png');
          game.load.image('apple', './assets/images/apple.png');
          
          // här kommer knapparna
          game.load.image('up', '/assets/images/up.png' + Date.now());
          game.load.image('right', '/assets/images/right.png' + Date.now());
          game.load.image('down', '/assets/images/down.png' + Date.now());
          game.load.image('left', '/assets/images/left.png' + Date.now());
          //game.load.audio('eat', './assets/sounds/boop2.ogg?' + Date.now());
          // hit = gameOver
          game.load.audio('hit', '/assets/audio/Yeet.mp3' + Date.now());
      
    },
    
    create: function() {
        game.stage.backgroundColor = '#061ffff';
        console.log("foobar");
        
      game.state.start('Menu');
    }
  };