/**
 * Created by janmeier on 25.01.15.
 */

function MinLovEventsPrototype() {
    this.events = {
        1: {
            0: {
                title: "Water power",
                description: "Drag upgrade icon unto desired tile.",
                action: function(neighbourTown) {
                    //var effect = NeighbourTownEffect.make(1, 1, 0, 0);
                    //effect.apply(neighbourTown);
                    alert("Min love event for town " + neighbourTown);
                }
            }
        }
    };

    this.getRandomEventForLevel = function(level) {
        return this.events[1][0];

    }
}


function MinLovEventManager() {
    var EVENT_INTERVAL = 15;

    this.init = function() {
        this.timer = 13;
        this.eventRepository = new MinLovEventsPrototype();

    };


    this.update = function(delta, town) {
        this.timer += delta;

        if (EVENT_INTERVAL <= this.timer) {
            this.timer -= EVENT_INTERVAL;
            //level = town.getMinLoveLevel();
            level = 1;
            return this.eventRepository.getRandomEventForLevel(level)
        }

        return false

    };
}

MinLovEventManager.make = function() {
    var instance = new MinLovEventManager();
    instance.init();
    return instance;
};
