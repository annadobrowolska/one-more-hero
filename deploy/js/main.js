var FIRST_LEVEL_STATE = "firstLevel";
var MAIN_MENU = "mainMenu";
var GAME_HEIGHT = 640;
var GAME_WIDTH = 1024;

var level = null;
var player = null;
var gameInterface = null;
var TILE_SIZE = 64;

var mainMenuState = {
    preload: function () {
        this.game.load.spritesheet('menu', 'assets/menu.png', 1024, 640);
        this.game.load.spritesheet('start', 'assets/start.png', 256, 128);
    },

    create: function () {
        this.add.sprite(0, 0, 'menu');
        this.add.button(GAME_WIDTH / 2 - 128, GAME_HEIGHT / 2 - 128,
            'start', this.startGame, this);
    },

    update: function () {

    },

    startGame: function () {
        this.state.start(FIRST_LEVEL_STATE);
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