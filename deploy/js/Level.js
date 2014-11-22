function Level(game) {
    this.game = game;
    this.curedElements = null;
}

Level.prototype = {
    preload: function () {
        this.game.load.image('sky', 'assets/sky.png');
        this.game.load.image('ground', 'assets/ground.png');
    },

    create: function () {
        this.game.add.sprite(0, 0, 'sky');
        addGround();
    }
};

function addGround() {
    this.curedElements = game.add.group();
    var ground = this.curedElements.create(0, game.world.height - 67, 'ground');
    this.game.physics.enable(ground, Phaser.Physics.ARCADE);
    ground.body.immovable = true;
}