var FIRST_LEVEL_STATE = "firstLevel";

var level = null;
var player = null;
var gameInterface = null;
var TILE_SIZE = 64;

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

var game = new Phaser.Game(1088, 640, Phaser.AUTO, 'game');
game.state.add(FIRST_LEVEL_STATE, firstLevelState);
game.state.start(FIRST_LEVEL_STATE);