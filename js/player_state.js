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
      
      this.components.beams = 5;
      this.components.pipes = 5;
      this.components.gears = 0;
      this.components.pistons = 0;
      
    };

    this.applyTrends = function(){
        this.components.add(this.componentTrend);
        this.resources.add(this.resourceTrend);
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

}

function ComponentsState() {
  
    this.beams = 0;
    this.pipes = 0;
    this.gears = 0;
    this.pistons = 0;

    this.add = function(componentsState){
        this.beams += componentsState.beams;
        this.pipes += componentsState.pipes;
        this.gears += componentsState.gears;
        this.pistons += componentsState.pistons;
    }
    
}
