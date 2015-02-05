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



function MinLovResearchResultRepository(){
    this.list = [];


    this.getResearchResult = function(developmentLevel) {
        return this.list[1][1];
    };


    this.getRandomResultForLevel = function(level) {
        var random =rand(1, this.list[level].length)-1 ;
        return this.list[level][random];

    };


    this.getMaxLevel = function(level) {
        return this.list.length;
    };


   this.addEntry = function(researchResult, level){
       if(!this.list[level]){
           this.list[level] = [];
       }
       this.list[level].push(researchResult);
   }
}
var MinLovRepository = new MinLovResearchResultRepository();


MinLovRepository.addEntry(
    ResearchResult.make(
        "template",
        NeighbourTownEffect.make(0.8,0,1.2,0),
        "template {0}",
        [["template"]]
    ),1 );

MinLovRepository.addEntry(
    ResearchResult.make(
        "Build a university",
        NeighbourTownEffect.make(1.1, 1, 1.1, 1),
        "When I grow up, I'm going to bovine university!",
        [[""]]
    ),2 );
	
MinLovRepository.addEntry(
    ResearchResult.make(
        "Build a zoo",
        NeighbourTownEffect.make(0.8,0,1.2,0),
        "Hakuna Matata! What a wonderful phrase Hakuna Matata! Ain't no passing craze. ",
        [["template"]]
    ),3 );
	
MinLovRepository.addEntry(
    ResearchResult.make(
        "Build a theatre",
        NeighbourTownEffect.make(0.8,0,1.2,0),
        "One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin.",
        [[""]]
    ),4 );
	
MinLovRepository.addEntry(
    ResearchResult.make(
        "Build a church",
        NeighbourTownEffect.make(0.5,0,1.5,0),
        "Pastor {0} will be a loyal ally!",
        [["Charles Ware","Brent Hawkes", "Abiel Foster","Adam Daniel Williams"]]
    ),5 );

MinLovRepository.addEntry(
    ResearchResult.make(
        "Build a Cinema",
        NeighbourTownEffect.make(0.8,0,1.2,0),
        "The new movie {0} will be great!",
        [["Top Secret!", "Love in Windland", "Lost in the woods"]]
    ),6 );
	

function MinTruResearchResultRepository(){
    this.list = [];

    this.getRandomResultForLevel = function(level) {
        return this.list[level][rand(0, this.list[level].length - 1)];

    };

    this.getMaxLevel = function(level) {
        return this.list.length;
    };

   this.addEntry = function(researchResult, level){
       if(!this.list[level]){
           this.list[level] = [];
       }
       this.list[level].push(researchResult);
   }
}
var MinTruRepository = new MinTruResearchResultRepository();

MinTruRepository.addEntry(
    ResearchResult.make(
        "Test result",
        NeighbourTownEffect.make(1,-1,1,-9),
        "This is a test description with the variable a:{0} and b:{1}",
        [["variable 1', 'variable 2"], ["variable 1 v2", "variable 2 v2"]]
    ),1 );

MinTruRepository.addEntry(
    ResearchResult.make(
        "Build a better Coal Mine",
        NeighbourTownEffect.make(1.3,0,0.7,0),
        "Global Warming is a Hoax",
        [[""]]
    ),1 );
	
MinTruRepository.addEntry(
    ResearchResult.make(
		//TODO add SideEffect
        "Build a better dam",
        NeighbourTownEffect.make(1.1,0,0,0),
        "We have the ability to provide clean water for every man, woman and child on this planet",
        [[""]]
    ),1 );
	
MinTruRepository.addEntry(
    ResearchResult.make(
        "Build a better iron mine",
        NeighbourTownEffect.make(1.2,0,0.8,0),
        "",
        [[""]]
    ),1 );
	
MinTruRepository.addEntry(
    ResearchResult.make(
        "Build better sanitary",
        NeighbourTownEffect.make(1.1,0,1.1,0),
        "",
        [[""]]
    ),1 );	
	
MinTruRepository.addEntry(
    ResearchResult.make(
        "Build better farming tools",
        NeighbourTownEffect.make(1.1,0,1,0),
        "",
        [[""]]
    ),1 );	
	
	
	
