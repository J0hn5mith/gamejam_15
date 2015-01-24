/**
 * Created by janmeier on 23.01.15.
 */


function NeighbourTown() {
    this.resourcesPool;
    this.attackPool = [];

    this.resourcesProductionStrategy;
    this.attackProductionStrategy;

    this.init = function(){
        this.resoucresPool = new ResourcesState();
        this.attackPool = [];

        this.resourcesProductionStrategy = new ResourcesProductionStrategy();
        this.attackProductionStrategy = new AttackProductionStrategy();

    };


    this.update = function(delta){
        this.produceResources(delta);
        this.produceAttacks(delta);
    };


    this.produceResources = function (delta) {
        var result = this.resourcesProductionStrategy.produce(this, delta);
        this.resoucresPool.add(result);
    };


    this.produceAttacks = function (delta) {
        var result = this.attackProductionStrategy.produce(this, delta);
        this.attackPool.concat(result)

    };


    this.harvestResources = function (delta) {
        returnValue = jQuery.extend(true, {}, this.resoucresPool);
        this.resoucresPool = new ResourcesState();
        return returnValue;
    };

    this.harvestAttacks = function (delta) {
        returnValue = this.attackPool.slice();
        this.attackPool = [];
        return returnValue;

    }


}
NeighbourTown.makeNeighbourTown = function() {
    var neighbourTown = new NeighbourTown();
    neighbourTown.init();
    return neighbourTown;

};


function ResourcesProductionStrategy() {
    this.produce = function(neighbourTown, delta){
        var result = new ResourcesState();
        result.coal = 1;
        return result;
    }

}


function AttackProductionStrategy() {
    this.produce = function(neighbourTown, delta){
        return [];

    }
}
