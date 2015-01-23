/**
 * Created by janmeier on 23.01.15.
 */

function PlayerState() {
    this.resources = new Resources();
    this.components = new ComponentsState();

}


function ResourcesState() {

    this.iron = 0;
    this.cola = 0;

}

function ComponentsState() {

    this.gears = 0;
    this.pipes = 0;
    this.bars = 0;
    this.pumps = 0;

}
