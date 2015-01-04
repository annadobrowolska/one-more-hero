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
        this.initInterface();
        this.game.time.events.loop(Phaser.Timer.SECOND, this.updateTime, this);
    },

    update: function (alive) {
        if (alive == false) {
            this.game.time.removeAll();
        }
    },

    /**
     * Adds time and points.
     * Function can be used only in Interface class, don't use externally!
     */
    initInterface: function () {
        this.timerText = this.game.add.text(16, 16, "time: " + "  00:00", { fontSize: '32px', fill: '#ffffff' });
        this.timerText.fixedToCamera = true;
        this.scoreText = this.game.add.text(16, 40, 'score: 0', { fontSize: '32px', fill: '#ffffff' });
        this.scoreText.fixedToCamera = true;
    },

    /**
     * Count seconds and update timer text.
     * Function can be used only in Interface class, don't use externally!
     */
    updateTime: function () {
        this.sec += 1;
        this.timerText.setText("time: " + this.formattedTime())
    },

    /**
     * Format current time to proper format mm:ss
     * Function can be used only in Interface class, don't use externally!
     */
    formattedTime: function () {
        var min = this.sec / 60;
        this.formattedSec = this.sec % 60;
        return "  " + this.pad(min.toFixed(0), 2) + ":" + this.pad(this.formattedSec.toFixed(0), 2);
    },

    /**
     * Function can be used only in Interface class, don't use externally!
     * @param num number
     * @param size target length
     * @return number number with leading zeros to a given length
     */
    pad: function (num, size) {
        var s = num + "";
        while (s.length < size) s = "0" + s;
        return s;
    },

    /**
     * Update score text
     */
    addPoints: function (points) {
        this.score += points;
        this.scoreText.setText("score: " + this.score)
    }
}
;