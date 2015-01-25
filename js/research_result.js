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
        "template",
        new NeighbourTownEffect.make(0.8,0,1.2,0),
        "template {0}",
        [["template"]]
    ),1 );

MiniLovRepository.addEntry(
    ResearchResult.make(
        "Build a university",
        new NeighbourTownEffect.make(1.1,-5,1.1,-5),
        "When I grow up, I'm going to bovine university!",
        [[""]]
    ),1 );	
	
MiniLovRepository.addEntry(
    ResearchResult.make(
        "Build a zoo",
        new NeighbourTownEffect.make(0.8,0,1.2,0),
        "Hakuna Matata! What a wonderful phrase Hakuna Matata! Ain't no passing craze. ",
        [["template"]]
    ),1 );
	
MiniLovRepository.addEntry(
    ResearchResult.make(
        "Build a theatre",
        new NeighbourTownEffect.make(0.8,0,1.2,0),
        "One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin.",
        [[""]]
    ),1 );	
	
MiniLovRepository.addEntry(
    ResearchResult.make(
        "Build a church",
        new NeighbourTownEffect.make(0.5,0,1.5,0),
        "Pastor {0} will be a loyal ally!",
        [["Charles Ware","Brent Hawkes", "Abiel Foster","Adam Daniel Williams"]]
    ),1 );

MiniLovRepository.addEntry(
    ResearchResult.make(
        "Build a Cinema",
        new NeighbourTownEffect.make(0.8,0,1.2,0),
        "The new movie {0} will be great!",
        [["Top Secret!", "Love in Windland", "Lost in the woods"]]
    ),1 );
	

function MiniTruResearchResultRepository(){
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
var MiniTruRepository = new MiniTruResearchResultRepository();

MiniTruRepository.addEntry(
    ResearchResult.make(
        "Test result",
        new NeighbourTownEffect.make(1,-1,1,-9),
        "This is a test description with the variable a:{0} and b:{1}",
        [["variable 1', 'variable 2"], ["variable 1 v2", "variable 2 v2"]]
    ),1 );

MiniTruRepository.addEntry(
    ResearchResult.make(
        "Build a better Coal Mine",
        new NeighbourTownEffect.make(1.3,0,0.7,0),
        "Global Warming is a Hoax",
        [[""]]
    ),1 );
	
MiniTruRepository.addEntry(
    ResearchResult.make(
		//TODO add SideEffect
        "Build a better dam",
        new NeighbourTownEffect.make(1.1,0,0,0),
        "We have the ability to provide clean water for every man, woman and child on this planet",
        [[""]]
    ),1 );
	
MiniTruRepository.addEntry(
    ResearchResult.make(
        "Build a better iron mine",
        new NeighbourTownEffect.make(1.2,0,0.8,0),
        "",
        [[""]]
    ),1 );
	
MiniTruRepository.addEntry(
    ResearchResult.make(
        "Build better sanitary",
        new NeighbourTownEffect.make(1.1,0,1.1,0),
        "",
        [[""]]
    ),1 );	
	
MiniTruRepository.addEntry(
    ResearchResult.make(
        "Build better farming tools",
        new NeighbourTownEffect.make(1.1,0,1,0),
        "",
        [[""]]
    ),1 );	
	
	
	
