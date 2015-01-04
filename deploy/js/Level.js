function Level(game) {
    this.game = game;
    this.enemies = null;
    this.ground = null;
    this.map = null;
    this.gulfs = null;
    this.items = null
}

/**
 *  constant defining the width of the world
 */
REAL_WIDTH = 4096;

Level.prototype = {
    preload: function () {
        this.game.load.image('sky', 'assets/sky.png');
        this.game.load.image('ground', 'assets/ground.png');
        this.game.load.image('item', 'assets/item.png');
        this.game.load.image('enemy', 'assets/enemy.png');

        this.game.load.tilemap('tilemap', 'assets/tilemap.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tileset', 'assets/tileset.png');
    },

    create: function () {
        this.game.world.setBounds(0, 0, REAL_WIDTH, this.game.height);
        this.game.stage.backgroundColor = '#60baf4';
        this.map = game.add.tilemap('tilemap');
        this.map.addTilesetImage('tileset', 'tileset');
        this.createCuredElements();

        this.ground = this.map.createLayer('ground');
        this.gulfs = this.map.createLayer('gulfs');
        this.items = this.map.createLayer('items');

        this.createEnemies();
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
    },

    update: function () {
        this.game.physics.arcade.collide(this.enemies, this.ground);
    },

    /**
     * Creates cured level components: ground and platforms
     * Function can be used only in Level class, don't use externally!
     *
     * 1 - ground (left corner)
     * 2 - ground (center)
     * 3 - ground (right corner)
     * 4 - gulfs
     * 5 - window (upper left corner)
     * 6 - window (upper right corner)
     * 7 - trash1
     * 8 - trash2
     * 9 - window (lower left corner)
     * 10 - window (lower right cortner)
     * 11 - item1
     * 12 - item2
     * 13 - windowsill (left)
     * 14 - windowsill (right)
     * 15 - item3
     */
    createCuredElements: function () {
        this.map.setCollision(1);
        this.map.setCollision(2);
        this.map.setCollision(3);
        this.map.setCollision(7);
        this.map.setCollision(8);
        this.map.setCollision(13);
        this.map.setCollision(14);
    },

    /**
     * Creates enemies
     * Function can be used only in Level class, don't use externally!
     */
    createEnemies: function () {
        this.enemies = game.add.group();
        this.enemies.enableBody = true;
        for (var i = 0; i < 1; i++) {
            var enemy = this.game.add.sprite(750, this.game.height - 2 * TILE_SIZE, 'enemy');
            this.game.physics.enable(enemy, Phaser.Physics.ARCADE);
            enemy.body.allowGravity = true;
            enemy.body.collideWorldBounds = false;
            this.enemies.add(enemy);
        }
        this.game.physics.arcade.enableBody(this.enemies);
    },

    /**
     * Handling end of the game
     */
    gameOver: function () {
        game.add.text(game.camera.x + 400, 400, '- GAME OVER -', { font: "40px Arial", fill: "#ffffff", align: "center" });
        game.add.text(game.camera.x + 450, 450, 'click to restart', { font: "20px Arial", fill: "#ffffff", align: "center" });
        this.game.input.onDown.add(this.restartGame, this);
        for (var i = 0; i < this.enemies.length; i++) {
            var enemy = this.enemies.getAt(i);
            enemy.body.moves = false;
        }
    },

    /**
     * Restart game
     * Function can be used only in Level class, don't use externally!
     */
    restartGame: function () {
        game.state.start(FIRST_LEVEL_STATE)
    },

    /**
     * Handling win the game
     */
    winLevel: function () {
        for (var i = 0; i < this.enemies.length; i++) {
            var enemy = this.enemies.getAt(i);
            enemy.body.moves = false;
        }
        game.add.text(REAL_WIDTH - 400, 400, '- YOU WIN! -', { font: "40px Arial", fill: "#ffffff", align: "center" });
        game.add.text(REAL_WIDTH - 350, 450, 'click to restart', { font: "20px Arial", fill: "#ffffff", align: "center" });
        this.game.input.onDown.add(this.restartGame, this);
    }
};