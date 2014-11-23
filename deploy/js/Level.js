if (x != 320) {  //stworzenie przepaści jeśli x = 320
    var groundBlock = this.game.add.sprite(x, this.game.height - 67, 'ground');
    this.game.physics.enable(groundBlock, Phaser.Physics.ARCADE);
    groundBlock.body.immovable = true;
    groundBlock.body.allowGravity = false;
    this.curedElements.add(groundBlock);
}
function Level(game) {
    this.game = game;
    this.curedElements = null;
}

Level.prototype = {
    preload: function () {
        this.game.load.image('sky', 'assets/sky.png');
        this.game.load.image('ground', 'assets/ground.png');
    }
},

/**
 * Handling end of the game
 */
    gameOver
:
function () {
    game.add.text(game.world.centerX, 400, '- GAME OVER -', { font: "40px Arial", fill: "#ffffff", align: "center" });
}
create: function () {
    this.game.add.sprite(0, 0, 'sky');
    this.createCuredElements();
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
}
,
addGround();
}
}
;

/**
 * Creates cured level components: ground and platforms
 * Function can be used only in Level class, don't use externally!
 */
createCuredElements: function () {
    function addGround() {
        this.curedElements = game.add.group();
        var ground = this.curedElements.create(0, game.world.height - 67, 'ground');
        this.game.physics.enable(ground, Phaser.Physics.ARCADE);
        ground.body.immovable = true;
    }
}
;
