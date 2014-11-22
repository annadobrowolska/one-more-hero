this.game.physics.arcade.gravity.y = 1869;
this.game.physics.arcade.enableBody(this.player);

this.cursors = this.game.input.keyboard.createCursorKeys();
this.player.body.drag.setTo(600, 0); // zwalnianie postaci jak nie są naciskane klawisze (x,y)

this.addSensitivityToKeys();
},

/**
 * Supports player control. Function can be used only in Player class, don't use externally!
 */
addSensitivityToKeys: function () {
    if (this.cursors.left.isDown) {
        this.player.body.velocity.x = -this.SPEED;
    }
    else if (this.cursors.right.isDown) {
        this.player.body.velocity.x = this.SPEED;
    }
    else if (this.cursors.up.isDown && this.player.body.touching.down) {
        this.player.body.velocity.y = -700;
    }
}

Player = function (game) {

    this.game = game;
    this.player = null;
    this.cursors = null;
    this.SPEED = 200;
};

Player.prototype = {

    preload: function () {
        this.game.load.spritesheet('player', 'assets/player.png', 48, 48);
    },

    create: function () {
        player = game.add.sprite(0, game.world.height - 115, 'player');
    }
};