/**
 * Created by janmeier on 25.01.15.
 */


function MinLovEventManager() {
    var EVENT_INTERVAL = 15;

    this.init = function() {
        this.timer = 13;
        this.eventRepository = MinLovRepository;

    };


    this.update = function(delta, town) {
        this.timer += delta;

        if (EVENT_INTERVAL <= this.timer) {
            this.timer -= EVENT_INTERVAL;
            //level = town.getMinLoveLevel();
            level = 1;
            var research = this.eventRepository.getRandomResultForLevel(level);

            return research
        }

        return false

    };
}

MinLovEventManager.make = function() {
    var instance = new MinLovEventManager();
    instance.init();
    return instance;
};
