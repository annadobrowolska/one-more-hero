var FIRST_LEVEL_STATE = "firstLevel";
var MAIN_MENU = "mainMenu";
var CONTROLS = "controls";
var GAME_HEIGHT = 640;
var GAME_WIDTH = 1024;

var level = null;
var player = null;
var gameInterface = null;
var TILE_SIZE = 64;

var mainMenuState = {
    preload: function () {
        this.game.load.spritesheet('menu', 'assets/menu.png', GAME_WIDTH, GAME_HEIGHT);
        this.game.load.spritesheet('start', 'assets/start.png', 256, 128);
        this.game.load.spritesheet('controls-button', 'assets/controls-button.png', 256, 128);
        this.game.load.spritesheet('controls', 'assets/controls.png', GAME_WIDTH, GAME_HEIGHT);
    },

    create: function () {
        this.add.sprite(0, 0, 'menu');
        this.add.button(GAME_WIDTH / 2 - 128, GAME_HEIGHT / 2 - 128,
            'start', this.startGame, this);
        this.add.button(GAME_WIDTH / 2 - 128, GAME_HEIGHT / 2 + 64,
            'controls-button', this.startControls, this);
    },

    startGame: function () {
        this.state.start(FIRST_LEVEL_STATE);
    },

    startControls: function () {
        this.state.start(CONTROLS);
    }
};

var controlsState = {
    preload: function () {
        this.game.load.spritesheet('controls', 'assets/controls.png', GAME_WIDTH, GAME_HEIGHT);
        this.game.load.spritesheet('back', 'assets/back.png', TILE_SIZE, TILE_SIZE);
    },

    create: function () {
        this.add.sprite(0, 0, 'controls');
        this.add.button(64, GAME_HEIGHT - 128, 'back', this.backToMenu, this);
    },

    backToMenu: function () {
        this.state.start(MAIN_MENU);
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
game.state.add(CONTROLS, controlsState);
game.state.add(FIRST_LEVEL_STATE, firstLevelState);
game.state.start(MAIN_MENU);