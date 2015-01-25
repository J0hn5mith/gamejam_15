/**
 * Created by janmeier on 24.01.15.
 */


function ResearchResult(){
    this.name;
    this.effect;
    this.text;
    this.variableSets = [];

    this.init = function(name, effect, text, variableSets) {
        this.name = name;
        this.effect = effect;
        this.text = text;
        this.variableSets = variableSets;
    }

    this.getDescriptionText = function() {
       var randomIndex = Math.floor(Math.random()*1000)%this.variableSets.length;
       return this.text.format(this.variableSets[randomIndex]);
    }

    this.getEffect  = function(){
        return this.effect;
    }


    this.getPossibleTargets = function(neighbourTownList) {
        return neighbourTownList;

    }

}

ResearchResult.make = function(name, effect, text, variableSets) {
    var result = new ResearchResult();
    result.init(name, effect, text, variableSets);
    return result;
}



function MiniLovResearchResultRepository(){
    this.list = [];

    this.getResearchResult = function(developmentLevel) {
        return new ResearchResult();
    }

   this.addEntry = function(researchResult, level){
       if(!this.list[level]){
           this.list[level] = [];
       }
       this.list[level].push(researchResult);
   }
}
var MiniLovRepository = new MiniLovResearchResultRepository();

MiniLovRepository.addEntry(
    ResearchResult.make(
        "Test result",
        new NeighbourTownEffect(),
        "This is a test description with the variable a:{0} and b:{1}",
        [["variable 1', 'variable 2"], ["variable 1 v2", "variable 2 v2"]]
    ),1 );


function MiniTruResearchResultRepository(){

    this.getResearchResult = function(developmentLevel) {
        return new ResearchResult();
    }
}
