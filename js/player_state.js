/**
 * Created by janmeier on 23.01.15.
 */

function PlayerState() {

    this.level = 1;
    this.levelUpHandler = null;

    this.resources = new ResourcesState();
    this.components = new ComponentsState();

    this.resourceTrend = new ResourcesState();
    this.componentTrend = new ComponentsState();


    this.init = function() {

        this.resources.iron = 10;
        this.resources.coal = 10;

        //this.components.beams = 5;
        //this.components.pipes = 5;
        //this.components.gears = 5;
        //this.components.pistons = 0;

        this.components.beams = 100;
        this.components.pipes = 100;
        this.components.gears = 100;
        this.components.pistons = 100;

    };

    this.applyTrends = function() {
        this.components.add(this.componentTrend);
        this.components.ensurePositiveValues();
        this.resources.add(this.resourceTrend);
        this.resources.ensurePositiveValues();

        this.componentTrend = new ComponentsState();
        this.resourceTrend = new ResourcesState();
    };
}


function ResourcesState() {

    this.iron = 0;
    this.coal = 0;

    this.add = function(resourcesState) {
        this.iron += resourcesState.iron;
        this.coal += resourcesState.coal;
    };


    this.ensurePositiveValues = function(){
        if (this.iron < 0) {
           this.iron = 0;
        }

        if (this.coal < 0) {
            this.coal = 0;
        }
    };
}


ResourcesState.create = function(resourcesState) {
  var newResourcesState = new ResourcesState();
  newResourcesState.iron = resourcesState.iron;
  newResourcesState.coal = resourcesState.coal;
  return newResourcesState;
};


function ComponentsState() {

    this.beams = 0;
    this.pipes = 0;
    this.gears = 0;
    this.pistons = 0;


    this.add = function(componentsState) {
        this.beams += componentsState.beams;
        this.pipes += componentsState.pipes;
        this.gears += componentsState.gears;
        this.pistons += componentsState.pistons;
    };


    this.ensurePositiveValues = function(){
        if (this.beams < 0) {
            this.beams = 0;
        }

        if (this.pipes < 0) {
            this.pipes = 0;
        }

        if (this.gears < 0) {
            this.gears = 0;
        }

        if (this.pistons < 0) {
            this.pistons = 0;
        }
    };

}


ComponentsState.create = function(componentsState) {
  var newComponentsState = new ComponentsState();
  newComponentsState.beams = componentsState.beams;
  newComponentsState.pipes = componentsState.pipes;
  newComponentsState.gears = componentsState.gears;
  newComponentsState.pistons = componentsState.pistons;
  return newComponentsState;
};
