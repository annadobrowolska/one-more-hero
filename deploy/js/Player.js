Player = function (game, level, gameInterface) {

    this.game = game;
    this.level = level;
    this.gameInterface = gameInterface;
    this.player = null;
    this.cursors = null;
    this.alive = true;
    this.isTurnRight = true;
};

/** constant defining player speed */
SPEED = 200;
/** constant defining enemy speed */
ENEMY_SPEED = 80;

Player.prototype = {

    preload: function () {
        this.game.load.spritesheet('player', 'assets/player.png', TILE_SIZE, TILE_SIZE);
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
        this.player = game.add.sprite(TILE_SIZE, game.world.height / 2, 'player');
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
            this.player.body.velocity.x = -SPEED;
            this.isTurnRight = false;
        }
        else if (this.cursors.right.isDown) {
            this.player.body.velocity.x = SPEED;
            this.isTurnRight = true;
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
        star.destroy();
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
            if (!enemy.body.touching.down) {
                enemy.body.collideWorldBounds = false;
            } else {
                this.game.physics.arcade.moveToXY(enemy, this.player.x, enemy.body.y, ENEMY_SPEED)
            }

            if (enemy.body.y > this.game.height) {
                enemy.destroy();
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
        if (this.game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR, 5)) {
            var delta;
            if (this.isTurnRight == true) {
                delta = this.player.body.x - enemy.body.x;
            } else {
                delta = enemy.body.x - this.player.body.x;
            }
            if (delta < (2 * TILE_SIZE)) {
                enemy.destroy();
            }
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