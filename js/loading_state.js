function LoadingState() {

    this.SOUND_MANAGER_PERCENTAGE = 5;
    this.IMAGE_PERCENTAGE = 35;
    this.SOUND_PERCENTAGE = 10;
    this.SHADER_PERCENTAGE = 30;
    this.FAKE_PERCENTAGE = 20;

    this.FAKE_LOADING_TIME = 0.1;

    this.TIME_BEFORE_SOUND_LOADING_FAIL = 5.0;

    this.percentage = 0;
    this.fakeLoadingCountdown = 0.0;
    this.soundLoadingCountdown = 0.0;


    this.init = function () {

        this.fakeLoadingCountdown = this.FAKE_LOADING_TIME;
        this.soundLoadingCountdown = this.TIME_BEFORE_SOUND_LOADING_FAIL;

        preloadingManager.preload();
    };


    this.hide = function () {
        jQuery("#loading").hide();
    };


    this.update = function () {

        var soundManagerPreloader = preloadingManager.soundManagerPreloader;
        var imagePreloader = preloadingManager.imagePreloader;
        var soundPreloader = preloadingManager.soundPreloader;
        var shaderPreloader = preloadingManager.shaderPreloader;

        var soundManagerPercentage = soundManagerPreloader.getFractionLoaded() * this.SOUND_MANAGER_PERCENTAGE;
        var imagePercentage = imagePreloader.getFractionLoaded() * this.IMAGE_PERCENTAGE;
        var soundPercentage = soundPreloader.getFractionLoaded() * this.SOUND_PERCENTAGE;
        var shaderPercentage = soundPreloader.getFractionLoaded() * this.SHADER_PERCENTAGE;
        var fakeLoadingPercentage = (1.0 - (this.fakeLoadingCountdown / this.FAKE_LOADING_TIME)) * this.FAKE_PERCENTAGE;
        this.percentage = soundManagerPercentage + imagePercentage + soundPercentage + fakeLoadingPercentage + shaderPercentage;

        if (
            imagePreloader.isLoaded()
            && ((soundManagerPreloader.isLoaded() && soundPreloader.isLoaded())
            || this.soundLoadingCountdown < 0)
            && shaderPreloader.isLoaded()
        ) {
            this.fakeLoadingCountdown -= timer.delta;
            if (this.fakeLoadingCountdown < 0) {
                game.setState("ingame");
            }
        }

        if (imagePreloader.isLoaded() && !soundPreloader.isLoaded()) {
            this.soundLoadingCountdown -= timer.delta;
        }
    };


    this.draw = function() {
        jQuery("#loading_text").text(Math.ceil(this.percentage) + "%");
        jQuery("#loading_bar").width(jQuery("#loading_bar_box").width() * (this.percentage / 100.0));
    };
    
    
    this.resize = function() {
      var hPadding = (game.WIDTH - 210) / 2;
      var vPadding = (game.HEIGHT - 50) / 2;
      jQuery("#loading").css("padding", vPadding + "px " + hPadding + "px");
    };

}