/**
 * Created by janmeier on 25.01.15.
 */

function TownEventsPrototype() {
    this.events = {
        1: {
            0: {
                target: BuildingCodes.FARM,
                title: "Fire",
                description: "A fire broke out in your town. All your factory's productivity is lowered by 50%",
                action: function() {
                    var buff = BuildingBuff.make(
                        10,
                        function(building){
                            building.productivity *= 0.5;
                        },
                        function(building){
                            building.productivity *= 0.5;
                        }
                    )
                    //TODO: This way of calculating the buff effects can have nasty side effects => Fins better ones!
                    gameLogic.town.utils.applyBuffToBuildingTypes(BuildingCodes.FACTORY,buff);
                }
            }
        }
    };

    this.getRandomEventForLevel = function(){
        return this.events[1][0];

    }
};

var TownEvents = new TownEventsPrototype();
