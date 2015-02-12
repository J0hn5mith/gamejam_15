/**
 * Created by janmeier on 25.01.15.
 */


function MinLovEventManager() {
    var EVENT_INTERVAL = 15;
    var MAX_LEVEL_SUM = 15;

    this.init = function(town) {
        this.town = town;
        this.timer = 13;
        this.eventRepository = MinLovRepository;

    };


    this.update = function(delta, town) {
        this.timer += delta;

        if (EVENT_INTERVAL <= this.timer) {
            this.timer -= EVENT_INTERVAL;
            var level = this.calculateLevel();
            var research = this.eventRepository.getRandomResultForLevel(level);
            DebugPanel.print(research.name + "(Level: " + level + ")");

            return research
        }

        return false

    };


    this.calculateLevel = function(){

        var minLovBuildings = this.town.getBuildingsOfType(BuildingCodes.MINI_LOV);
        var levelSum = 0;


        for (var buildingID in minLovBuildings){
            var building = minLovBuildings[buildingID];
            levelSum += building.level;
        }

        return Math.floor(1 + levelSum/MAX_LEVEL_SUM * (this.eventRepository.getMaxLevel() - 1));

    };
}

MinLovEventManager.make = function(town) {
    var instance = new MinLovEventManager();
    instance.init(town);
    return instance;
};
