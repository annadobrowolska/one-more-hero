var FIRST_LEVEL_STATE = "firstLevel";
var MAIN_MENU = "mainMenu"

var level = null;
var player = null;
var gameInterface = null;
var TILE_SIZE = 64;

var mainMenuState = {
    preload: function () {
        this.game.load.spritesheet('menu', 'assets/menu.png', 1024, 640);
    },

    create: function () {
        this.add.sprite(0, 0, 'menu');
    },

    update: function () {

    }
};

var firstLevelState = {
    preload: function () {
        gameInterface = new Interface(game);

        level = new Level(game);
        level.preload();

        player = new Player(game, level, gameInterface);
        player.preload();
    },
    create: function () {
        level.create();
        gameInterface.create();
        player.create();
    },
    update: function () {
        gameInterface.update(player.alive);
        level.update();
        player.update();
    }
};

var game = new Phaser.Game(1024, 640, Phaser.AUTO, 'game');
game.state.add(MAIN_MENU, mainMenuState);
game.state.add(FIRST_LEVEL_STATE, firstLevelState);
game.state.start(MAIN_MENU);