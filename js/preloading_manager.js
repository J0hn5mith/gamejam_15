function PreloadingManager() {

  this.soundManagerPreloader;
  this.imagePreloader;
  this.soundPreloader;


  this.preload = function() {
    
    this.soundManagerPreloader = new Preloader();
    this.imagePreloader = new Preloader();
    this.soundPreloader = new Preloader();
    this.shaderPreloader = new Preloader();

    this.soundManagerPreloader.setEndCallback(function() {
      preloadingManager.soundPreloader.loadSounds(resources.sounds);
    });
    this.shaderPreloader.loadShaders();
    this.soundManagerPreloader.loadSoundManager();
    this.imagePreloader.loadImages(resources.images);
  };
  
}