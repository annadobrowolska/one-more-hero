function Level(game) {
    this.game = game;
    this.curedElements = null;
    this.stars = null;
}

Level.prototype = {
    preload: function () {
        this.game.load.image('sky', 'assets/sky.png');
        this.game.load.image('ground', 'assets/ground.png');
        this.game.load.image('item', 'assets/item.png');
    },

    create: function () {
        this.game.add.sprite(0, 0, 'sky');
        this.createCuredElements();
        this.createScoredItems();
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
    },

    /**
     * Creates cured level components: ground and platforms
     * Function can be used only in Level class, don't use externally!
     */
    createCuredElements: function () {
        this.curedElements = this.game.add.group();
        for (var x = 0; x <= this.game.width; x += 80) {
            if (x != 320) {  //stworzenie przepaści jeśli x = 320
                var groundBlock = this.game.add.sprite(x, this.game.height - 67, 'ground');
                this.game.physics.enable(groundBlock, Phaser.Physics.ARCADE);
                groundBlock.body.immovable = true;
                groundBlock.body.allowGravity = false;
                this.curedElements.add(groundBlock);
            }
        }
    },

    /**
     * Creates scored items
     * Function can be used only in Level class, don't use externally!
     */
    createScoredItems: function () {
        this.stars = game.add.group();
        this.stars.enableBody = true;
        for (var i = 0; i < 4; i++) {
            var star = this.game.add.sprite((i + 1) * 150, this.game.height - 200, 'item');
            this.game.physics.enable(star, Phaser.Physics.ARCADE);
            star.body.allowGravity = false;
            this.stars.add(star);
        }
    },

    /**
     * Handling end of the game
     */
    gameOver: function () {
        game.add.text(game.world.centerX, 400, '- GAME OVER -', { font: "40px Arial", fill: "#ffffff", align: "center" });
        game.add.text(game.world.centerX + 80, 450, 'click to restart', { font: "20px Arial", fill: "#ffffff", align: "center" });
        this.game.input.onDown.add(this.restartGame, this);
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
        game.add.text(game.world.centerX, 400, '- YOU WIN! -', { font: "40px Arial", fill: "#ffffff", align: "center" });
        game.add.text(game.world.centerX + 50, 450, 'click to restart', { font: "20px Arial", fill: "#ffffff", align: "center" });
        this.game.input.onDown.add(this.restartGame, this);
    }
}
;
