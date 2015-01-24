/**
 *
 * Created by janmeier on 23.01.15.
 */



function GameLogic() {
    var NUM_CITIES = 6;
    this.playerState;
    this.neighbourCities;
    this.map = new Map();


    this.init = function(){
        this.playerState = new PlayerState();
        this.map = new Map();
        this.map.init(10);
        this.initNeighbourCities();
    };

    this.initNeighbourCities = function() {
        for (var i = 0; i < GameLogic.NUM_CITIES; i++) {
            this.playerState.push(NeighbourTown.makeNeighbourTown());
        }
    };

    this.update = function(){

    };

    this.up
}

GameLogic.makeGameLogic = function(){
    var gameLogic = new GameLogic();
    gameLogic.init();
    return gameLogic;

}

