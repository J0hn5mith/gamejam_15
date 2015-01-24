/**
 * Created by janmeier on 23.01.15.
 */

function PlayerState() {
    this.level = 0;
    this.levelUpHandler = null;
    this.resources = new ResourcesState();
    this.components = new ComponentsState();

}


function ResourcesState() {

    this.iron = 0;
    this.coal = 0;

    this.add = function (resourcesState) {
        this.iron += resourcesState.iron;
        this.coal += resourcesState.coal;

    }

}

function ComponentsState() {

    this.gears = 0;
    this.pipes = 0;
    this.beam = 0;
    this.piston = 0;

}
