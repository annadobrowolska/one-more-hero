Player = function (game, level, gameInterface) {

    this.game = game;
    this.level = level;
    this.gameInterface = gameInterface;
    this.player = null;
    this.cursors = null;
    this.alive = true;
    this.isTurnRight = true;
};

/** constant, defines player speed */
SPEED = 300;
/** constant, defines enemy speed */
ENEMY_SPEED = 80;
/** constant, defines the length of the area on which the player can hit during the attack */
PLAYER_HIT_AREA = 2 * TILE_SIZE;
/** constant, defines width of the area in which the enemy sees the player */
VISIBILITY_WIDTH = 5 * TILE_SIZE;
/** constant, defines height of the area in which the enemy sees the player */
VISIBILITY_HEIGHT = 3 * TILE_SIZE;

Player.prototype = {

    preload: function () {
        this.game.load.spritesheet('player', 'assets/player.png', TILE_SIZE, TILE_SIZE);
    },

    create: function () {
        this.enablePlayerPhysics();
        this.player.body.drag.setTo(1000, 0); // zwalnianie postaci jak nie są naciskane klawisze
        this.addKeyboardControl();
        this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);
    },

    update: function () {
        this.enableInteractions();
        this.handleReachEndOfLevel();
        this.interactionWithEnemies();
        this.addSensitivityToKeys();
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

        this.player.animations.add('left', [3, 4, 5, 6], 10, true);
        this.player.animations.add('right', [0, 1, 2], 10, true);
    },

    /**
     * Enables keyboard control sensitivity
     * Function can be used only in Player class, don't use externally!
     */
    addKeyboardControl: function () {
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },

    /**
     * Enables interactions between player and other objects
     * Function can be used only in Player class, don't use externally!
     */
    enableInteractions: function () {
        this.game.physics.arcade.collide(this.player, this.level.ground);
        this.game.physics.arcade.collide(this.player, this.level.gulfs);
        this.game.physics.arcade.collide(this.player, this.level.items);
        this.level.map.setTileIndexCallback(4, this.handleFallIntoGulf, this, this.level.gulfs);
        this.level.map.setTileIndexCallback([11, 12, 15], this.collectStar, this, this.level.items);
    },

    /**
     * Supports player control.
     * Function can be used only in Player class, don't use externally!
     */
    addSensitivityToKeys: function () {
        if (this.cursors.left.isDown) {
            this.player.body.velocity.x = -SPEED;
            this.isTurnRight = false;
            this.player.animations.play('left');
        }
        else if (this.cursors.right.isDown) {
            this.player.body.velocity.x = SPEED;
            this.isTurnRight = true;
            this.player.animations.play('right');
        } else {
            this.player.body.velocity.x = 0;
            this.player.animations.stop();
            if (this.isTurnRight) {
                this.player.frame = 2;
            } else {
                this.player.frame = 3;
            }
        }
        if (this.cursors.up.isDown && this.player.body.blocked.down) {
            this.player.body.velocity.y -= (3 * SPEED);
        }
    },

    /**
     * Handling fall into the gulf.
     * Function can be used only in Player class, don't use externally!
     */
    handleFallIntoGulf: function () {
        this.player.body.collideWorldBounds = false;
        this.level.gameOver();
        this.alive = false;
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
        this.level.map.removeTile(star.x, star.y, this.level.items);
        var points;
        switch (star.index) {
            case 12:
                points = 200;
                break;
            case 15:
                points = 300;
                break;
            default:
                points = 100;
        }
        this.gameInterface.addPoints(points);
    },

    /**
     * Handling player interaction with enemies. Enemies moves towards the player.
     * Function can be used only in Player class, don't use externally!
     */
    interactionWithEnemies: function () {
        for (var i = 0; i < this.level.enemies.length; i++) {
            var enemy = this.level.enemies.getAt(i);

            if (enemy.body.blocked.down) {
                if (Math.abs(this.player.body.x - enemy.body.x) < VISIBILITY_WIDTH && Math.abs(this.player.body.y - enemy.body.y) < VISIBILITY_HEIGHT) {
                    this.game.physics.arcade.moveToXY(enemy, this.player.x, enemy.body.y, ENEMY_SPEED + TILE_SIZE);
                } else {
                    if (this.enemyGoToLeft(enemy)) {
                        this.game.physics.arcade.moveToXY(enemy, enemy.body.x - TILE_SIZE, enemy.body.y, ENEMY_SPEED);
                    } else {
                        this.game.physics.arcade.moveToXY(enemy, enemy.body.x + TILE_SIZE, enemy.body.y, ENEMY_SPEED);
                    }
                }
            }

            if (enemy.body.y > this.game.height) {
                enemy.destroy();
            }
            this.handleFight(enemy);
        }
        this.game.physics.arcade.overlap(this.player, this.level.enemies, this.hitPlayer, null, this);
    },

    /**
     * Checks if the enemy should move to the left. Changes the return value of every 5 seconds
     * Function can be used only in Player class, don't use externally!
     */
    enemyGoToLeft: function (enemy) {
        var timeFactor = this.gameInterface.formattedSec % 10;
        return timeFactor < 5 && enemy.disorderedDirection == false;
    },

    /**
     * If enemy is enough close to player and space bar is pressed then player kill enemy
     * Function can be used only in Player class, don't use externally!
     */
    handleFight: function (enemy) {
        if (this.game.input.keyboard.upDuration(Phaser.Keyboard.SPACEBAR, 50)) {
            var delta;
            if (this.isTurnRight == true) {
                delta = enemy.body.x - this.player.body.x;
            } else {
                delta = this.player.body.x - enemy.body.x;
            }
            if (delta < (PLAYER_HIT_AREA)) {
                enemy.destroy();
                this.gameInterface.addPoints(100);
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