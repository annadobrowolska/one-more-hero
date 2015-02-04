function Level(game) {
    this.game = game;
    this.enemies = null;
    this.ground = null;
    this.map = null;
    this.gulfs = null;
    this.items = null;
    this.enemiesCollisions = null;
}

/** constant, defines the width of the world */
REAL_WIDTH = 4096;
/** constant, defines number of enemies */
ENEMIES_NUMBER = 10;
/** constant, defines closest, allowed enemy position, so as not to kill the player */
ENEMY_MIN_X_POSITION = 7 * TILE_SIZE;
/** constant, defines farthest, allowed enemy position, so that it was not beyond the boundary maps */
ENEMY_MAX_X_POSITION = REAL_WIDTH - 2 * TILE_SIZE;

Level.prototype = {
    preload: function () {
        this.game.load.spritesheet('enemy', 'assets/enemy.png', TILE_SIZE, TILE_SIZE);
        this.game.load.tilemap('tilemap', 'assets/tilemap.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tileset', 'assets/tileset.png');
        this.game.load.image('sky', 'assets/background.png');
    },

    create: function () {
        this.initMap();
        this.createCuredElements();
        this.createEnemies();
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
    },

    update: function () {
        this.game.physics.arcade.collide(this.enemies, this.ground);
        this.game.physics.arcade.collide(this.enemies, this.enemiesCollisions);
    },

    /**
     * Initialize the map. Create layers.
     * Function can be used only in Level class, don't use externally!
     */
    initMap: function () {
        this.game.add.sprite(0, 0, 'sky');
        this.game.world.setBounds(0, 0, REAL_WIDTH, this.game.height);
        this.map = game.add.tilemap('tilemap');
        this.map.addTilesetImage('tileset', 'tileset');
        this.ground = this.map.createLayer('ground');
        this.gulfs = this.map.createLayer('gulfs');
        this.items = this.map.createLayer('items');
        this.enemiesCollisions = this.map.createLayer('enemiesCollisions');
        this.enemiesCollisions.visible = false;
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
     * 16 - wall for enemies
     */
    createCuredElements: function () {
        this.map.setCollision(1);
        this.map.setCollision(2);
        this.map.setCollision(3);
        this.map.setCollision(7);
        this.map.setCollision(8);
        this.map.setCollision(13);
        this.map.setCollision(14);
        this.map.setCollision(16, true, this.enemiesCollisions)
    },

    /**
     * Creates enemies
     * Function can be used only in Level class, don't use externally!
     */
    createEnemies: function () {
        this.enemies = game.add.group();
        this.enemies.enableBody = true;
        for (var i = 0; i < ENEMIES_NUMBER; i++) {
            var randomXCoordinate = this.xRandomization();
            var enemy = this.game.add.sprite(randomXCoordinate, this.game.height - 2 * TILE_SIZE, 'enemy');
            this.game.physics.enable(enemy, Phaser.Physics.ARCADE);
            enemy.body.allowGravity = true;
            enemy.body.collideWorldBounds = false;
            enemy.disorderedDirection = i % 2;
            this.enemies.add(enemy);
        }
        this.game.physics.arcade.enableBody(this.enemies);
    },

    xRandomization: function () {
        var firstRand = 24 * TILE_SIZE;
        var gulfRand = 25 * TILE_SIZE;
        var randNumber = firstRand;
        while (randNumber == firstRand || randNumber == gulfRand) {
            randNumber = Math.floor((Math.random() * ENEMY_MAX_X_POSITION) + ENEMY_MIN_X_POSITION);
        }
        return randNumber;
    },

    /**
     * Handling end of the game
     */
    gameOver: function () {
        game.add.text(game.camera.x + 400, 400, '- GAME OVER -', { font: "40px Arial", fill: "#ffffff", align: "center" });
        game.add.text(game.camera.x + 450, 450, 'click to restart', { font: "20px Arial", fill: "#ffffff", align: "center" });
        this.game.input.onDown.add(this.restartGame, this);
        for (var i = 0, max = this.enemies.length; i < max; i++) {
            var enemy = this.enemies.getAt(i);
            enemy.body.moves = false;
            enemy.animations.stop();
        }
    },

    /**
     * Restart game
     * Function can be used only in Level class, don't use externally!
     */
    restartGame: function () {
        this.game.input.keyboard.enabled = true;
        game.state.start(FIRST_LEVEL_STATE);
    },

    /**
     * Handling win the game
     */
    winLevel: function () {
        var i = this.enemies.length;
        while (i--) {
            var enemy = this.enemies.getAt(i);
            enemy.body.moves = false;
            enemy.animations.stop();
        }
        game.add.text(REAL_WIDTH - 400, 400, '- YOU WIN! -', { font: "40px Arial", fill: "#ffffff", align: "center" });
        game.add.text(REAL_WIDTH - 350, 450, 'click to restart', { font: "20px Arial", fill: "#ffffff", align: "center" });
        this.game.input.onDown.add(this.restartGame, this);
    }
};