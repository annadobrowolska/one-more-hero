Player = function (game) {

    this.game = game;
    this.player = null;
};

Player.prototype = {

    preload: function () {
        this.game.load.spritesheet('player', 'assets/player.png', 48, 48);
    },

    create: function () {
        player = game.add.sprite(0, game.world.height - 115, 'player');
    }
};
