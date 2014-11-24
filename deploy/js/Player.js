Player = function (game, level) {

    this.game = game;
    this.level = level;
    this.player = null;
    this.cursors = null;
    this.SPEED = 200;
};

Player.prototype = {

    preload: function () {
        this.game.load.spritesheet('player', 'assets/player.png', 48, 48);
    },

    create: function () {
        this.player = game.add.sprite(this.game.width / 5, game.world.height / 2, 'player');

        this.enablePlayerPhysics();
        this.player.body.collideWorldBounds = true;
        this.player.body.drag.setTo(600, 0); // zwalnianie postaci jak nie są naciskane klawisze (x,y)

        this.cursors = this.game.input.keyboard.createCursorKeys();
    },

    update: function () {
        this.game.physics.arcade.collide(this.player, this.level.curedElements);
        this.addSensitivityToKeys();
        this.handleFallIntoGulf();
        this.handleReachEndOfLevel();
    },

    /**
     * Enables player physics with proper gravity
     * Function can be used only in Player class, don't use externally!
     */
    enablePlayerPhysics: function () {
        this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 1869;
        this.game.physics.arcade.enableBody(this.player);
    },

    /**
     * Supports player control.
     * Function can be used only in Player class, don't use externally!
     */
    addSensitivityToKeys: function () {
        if (this.cursors.left.isDown) {
            this.player.body.velocity.x = -this.SPEED;
        }
        else if (this.cursors.right.isDown) {
            this.player.body.velocity.x = this.SPEED;
        }
        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.body.velocity.y = -700;
        }
    },

    /**
     * Handling fall into the gulf.
     */
    handleFallIntoGulf: function () {
        if (this.player.body.onFloor()) {
            this.player.body.collideWorldBounds = false;
            level.gameOver();
        }
    },

    /**
     * Handling reach end of the level.
     */
    handleReachEndOfLevel: function () {
        if (this.player.position.x > 700) {
            this.game.input.keyboard.destroy();
            level.winLevel();
        }
    }
};