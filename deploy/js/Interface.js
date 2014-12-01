Interface = function (game) {
    this.game = game;
    this.score = 0;
    this.scoreText = null;
    this.timerText = null;
    this.miliseconds = 0;
};

Interface.prototype = {
    create: function () {
        this.timerText = this.game.add.text(16, 16, "time: " + "  00:00:000", { fontSize: '32px', fill: '#ffffff' });
        this.scoreText = this.game.add.text(16, 40, 'score: 0', { fontSize: '32px', fill: '#ffffff' });
    },

    update: function (alive) {
        if (alive == true) {
            this.updateElapsedTime();
        }
        else {
            this.game.time.removeAll();
        }
    },

    updateElapsedTime: function () {
        this.game.time.events.loop(Phaser.Timer.SECOND, this.updateTime, this);
    },

    updateTime: function () {
        this.miliseconds += 1;
        this.timerText.setText("time: " + this.formattedTime())
    },

    formattedTime: function () {
        var ms = this.miliseconds;
        var sec = ms / 1000;
        var min = sec / 60;
        sec %= 60;
        ms %= 1000;
        return "  " + this.pad(min.toFixed(0), 2) + ":" + this.pad(sec.toFixed(0), 2) + ":" + this.pad(ms.toFixed(0), 3);
    },

    pad: function (num, size) {
        var s = num + "";
        while (s.length < size) s = "0" + s;
        return s;
    }
}
;