var FIRST_LEVEL_STATE = "firstLevel";

var level = null;
var player = null;
var gameInterface = null;

var firstLevelState = {
    preload: function () {
        level = new Level(game);
        level.preload();

        gameInterface = new Interface(game);

        player = new Player(game, level, gameInterface);
        player.preload();

    },
    create: function () {
        level.create();
        gameInterface.create();
        player.create();
    },
    update: function () {
        player.update();
    }
};

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'One More Hero');
game.state.add(FIRST_LEVEL_STATE, firstLevelState);
game.state.start(FIRST_LEVEL_STATE);

