/**
 * Created by janmeier on 25.01.15.
 */


function MinTruEventManager() {
    var EVENT_INTERVAL = 20;
    var MAX_LEVEL_SUM = 15;

    this.init = function(town) {
        this.timer = 15;
        this.eventRepository = MinTruRepository;
        this.town = town;

    };


    this.update = function(delta) {
        this.timer += delta;

        if (EVENT_INTERVAL <= this.timer) {
            this.timer -= EVENT_INTERVAL;
            level = this.calculateLevel();
            var research = this.eventRepository.getRandomResultForLevel(level);
            DebugPanel.print(research.name + " (Level: " + level + ")");
            return research;
        }

        return false

    };

    this.calculateLevel = function(){
        return 3;
        //TODO: DEBUG

        var minTruBuildings = this.town.getBuildingsOfType(BuildingCodes.MINI_TRU);
        var levelSum = 0;


        for (var buildingID in minTruBuildings){
            var building = minTruBuildings[buildingID];
            levelSum += building.level;
        }

        return Math.floor(1 + levelSum/MAX_LEVEL_SUM * (this.eventRepository.getMaxLevel() - 1));

    };
}

MinTruEventManager.make = function(town) {
    var instance = new MinTruEventManager();
    instance.init(town);
    return instance;
};

