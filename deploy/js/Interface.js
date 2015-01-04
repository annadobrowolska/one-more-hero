Interface = function (game) {
    this.game = game;
    this.score = 0;
    this.scoreText = null;
    this.timerText = null;
    this.sec = 0;
    this.formattedSec = 0;
};

Interface.prototype = {
    create: function () {
        this.timerText = this.game.add.text(16, 16, "time: " + "  00:00", { fontSize: '32px', fill: '#ffffff' });
        this.timerText.fixedToCamera = true;
        this.scoreText = this.game.add.text(16, 40, 'score: 0', { fontSize: '32px', fill: '#ffffff' });
        this.scoreText.fixedToCamera = true;
        this.game.time.events.loop(Phaser.Timer.SECOND, this.updateTime, this);
    },

    update: function (alive) {
        if (alive == false) {
            this.game.time.removeAll();
        }
    },

    updateTime: function () {
        this.sec += 1;
        this.timerText.setText("time: " + this.formattedTime())
    },

    formattedTime: function () {
        var min = this.sec / 60;
        this.formattedSec = this.sec % 60;
        return "  " + this.pad(min.toFixed(0), 2) + ":" + this.pad(this.formattedSec.toFixed(0), 2);
    },

    pad: function (num, size) {
        var s = num + "";
        while (s.length < size) s = "0" + s;
        return s;
    },

    /**
     * Update score
     */
    addPoints: function (points) {
        this.score += points;
        this.scoreText.setText("score: " + this.score)
    }
}
;