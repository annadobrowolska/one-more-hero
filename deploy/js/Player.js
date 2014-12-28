Player = function (game, level, gameInterface) {

    this.game = game;
    this.level = level;
    this.gameInterface = gameInterface;
    this.player = null;
    this.cursors = null;
    this.SPEED = 200;
    this.alive = true;
};

Player.prototype = {

    preload: function () {
        this.game.load.spritesheet('player', 'assets/player.png', 48, 48);
    },

    create: function () {
        this.enablePlayerPhysics();
        this.player.body.drag.setTo(600, 0); // zwalnianie postaci jak nie są naciskane klawisze
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);
    },

    update: function () {
        this.game.physics.arcade.collide(this.player, this.level.curedElements);
        this.addSensitivityToKeys();
        this.handleFallIntoGulf();
        this.handleReachEndOfLevel();
        this.interactionWithEnemies();

        this.game.physics.arcade.overlap(this.player, this.level.stars, this.collectStar, null, this);
    },

    /**
     * Enables player physics with proper gravity
     * Function can be used only in Player class, don't use externally!
     */
    enablePlayerPhysics: function () {
        this.player = game.add.sprite(this.game.width / 5, game.world.height / 2, 'player');
        this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 1869;
        this.game.physics.arcade.enableBody(this.player);
        this.player.body.collideWorldBounds = true;
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
     * Function can be used only in Player class, don't use externally!
     */
    handleFallIntoGulf: function () {
        if (this.player.body.onFloor()) {
            this.player.body.collideWorldBounds = false;
            this.level.gameOver();
            this.alive = false;
        }
    },

    /**
     * Handling reach end of the level.
     * Function can be used only in Player class, don't use externally!
     */
    handleReachEndOfLevel: function () {
        if (this.player.position.x > REAL_WIDTH - 100) {
            this.game.input.keyboard.destroy();
            this.level.winLevel();
            this.alive = false;
        }
    },

    /**
     * Supports player control.
     * Function can be used only in Player class, don't use externally!
     */
    collectStar: function (player, star) {
        star.kill();
        this.gameInterface.score += 100;
        this.gameInterface.scoreText.setText("score: " + this.gameInterface.score)
    },

    /**
     * Handling player interaction with enemies. Enemies moves towards the player.
     * Function can be used only in Player class, don't use externally!
     */
    interactionWithEnemies: function () {
        for (var i = 0; i < this.level.enemies.length; i++) {
            var enemy = this.level.enemies.getAt(i);
            if (enemy.body.y > 500) {
                enemy.body.collideWorldBounds = false;
            } else {
                this.game.physics.arcade.moveToXY(enemy, this.player.x, enemy.body.y, 80)
            }

            this.handleFight(enemy);
        }
        this.game.physics.arcade.overlap(this.player, this.level.enemies, this.hitPlayer, null, this);
    },

    /**
     * If enemy is enough close to player and space bar is pressed then player kill enemy
     * Function can be used only in Player class, don't use externally!
     */
    handleFight: function (enemy) {
        if (Math.abs(this.player.body.x - enemy.body.x) < (2 * TILE_SIZE) && this.game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR, 5)) {
            enemy.kill();
        }
    },

    /**
     * Handling player injuries
     * Function can be used only in Player class, don't use externally!
     */
    hitPlayer: function (player) {
        player.kill();
        this.level.gameOver();
        this.alive = false;
    }
};