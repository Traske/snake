var Game_Over = {

    preload : function() {
        
        game.load.image('Game_over', './assets/images/Game-over.png');
    },

    create: function () {

       
        this.add.button(0, 0, 'Game_over', this.startGame, this);

    },

    startGame: function () {

       
        this.state.start('Game_Over');

    }

};