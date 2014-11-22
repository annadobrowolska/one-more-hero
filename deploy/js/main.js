var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var level = null;
var text = "Phaser Version " + Phaser.DEV_VERSION + " works!";
var style = { font: "24px Arial", fill: "#fff", align: "center" };
var t = game.add.text(this.world.centerX, this.world.centerY, text, style);
t.anchor.setTo(0.5, 0.5);

function preload() {
    level = new Level(game);
    level.preload();
}
function create() {
    level.create();
}
function update() {
}


