var state = {
    init: function () {

        var text = "Phaser Version " + Phaser.DEV_VERSION + " works!";
        var style = { font: "24px Arial", fill: "#fff", align: "center" };
        var t = game.add.text(this.world.centerX, this.world.centerY, text, style);
        t.anchor.setTo(0.5, 0.5);

    },
    preload: function () {
        // STate preload logic goes here
    },
    create: function () {
        // State create logic goes here
    },
    update: function () {
        // State Update Logic goes here.
    }
};

var game = new Phaser.Game(
    800,
    480,
    Phaser.AUTO,
    'game',
    state
);