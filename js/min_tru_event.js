/**
 * Created by janmeier on 25.01.15.
 */


function MinTruEventManager() {
    var EVENT_INTERVAL = 20;

    this.init = function() {
        this.timer = 15;
        this.eventRepository = MinTruRepository;

    };


    this.update = function(delta, town) {
        this.timer += delta;

        if (EVENT_INTERVAL <= this.timer) {
            this.timer -= EVENT_INTERVAL;
            level = 1;
            var research = this.eventRepository.getRandomResultForLevel(level);
            return research;
        }

        return false

    };
}

MinTruEventManager.make = function() {
    var instance = new MinTruEventManager();
    instance.init();
    return instance;
};
