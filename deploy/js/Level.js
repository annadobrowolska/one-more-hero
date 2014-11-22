function Level(game) {
    this.game = game;
    this.ground = null;
}

Level.prototype = {
    preload: function () {
        this.game.load.image('sky', 'assets/sky.png');
        this.game.load.image('ground', 'assets/ground_texture.png');
    },

    create: function () {
        // add background for this level
        this.game.add.sprite(0, 0, 'sky');
    },

    update: function () {
    }
};
