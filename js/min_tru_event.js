/**
 * Created by janmeier on 25.01.15.
 */

function MinTruEventsPrototype() {
    this.events = {
        1: {
            0: {
                title: "Water power",
                description: "Drag upgrade icon unto desired tile.",
                action: function(neighbourTown) {
                    //var effect = NeighbourTownEffect.make(1, 1, 0, 0);
                    //effect.apply(neighbourTown);
                    alert("Min tru event" + neighbourTown);
                }
            }
        }
    };

    this.getRandomEventForLevel = function(level) {
        return this.events[1][0];

    }
}


function MinTruEventManager() {
    var EVENT_INTERVAL = 20;

    this.init = function() {
        this.timer = 15;
        this.eventRepository = new MinTruEventsPrototype();

    };


    this.update = function(delta, town) {
        this.timer += delta;

        if (EVENT_INTERVAL <= this.timer) {
            this.timer -= EVENT_INTERVAL;
            level = 1;
            return this.eventRepository.getRandomEventForLevel(level)
        }

        return false

    };
}

MinTruEventManager.make = function() {
    var instance = new MinTruEventManager();
    instance.init();
    return instance;
};
