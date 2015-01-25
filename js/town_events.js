/**
 * Created by janmeier on 25.01.15.
 */

function TownEventsPrototype() {
    this.events = {
        1: {
            "name": {
                target: BuildingCodes.FARM,
                title: "Upgrade Farm to Level 2",
                description: "Drag upgrade icon unto desired tile.",
                action: function() {
                    alert("HALLO");
                }
            }
        },
        2: {}
    };

    this.getRandomEventForLevel = function(){
        return this.events[1][0];

    }
};

var TownEvents = new TownEventsPrototype();
