function Assembler() {
  
  
    this.init = function() {
    
    };
  
  
    this.doesRecipeExist = function(suggestion) {
        return assemblyRecipes.hasOwnProperty(suggestion);
    };
  
  
    this.getTitle = function(recipe) {
        return assemblyRecipes[recipe].title;
    };
  
  
    this.getDescription = function(recipe) {
        return assemblyRecipes[recipe].description;
    };
    
    
    this.assembleRecipe = function(recipe, assembly, selectedDrawableTile) {

        if(assembly.target == null) {
            this.executeAssembly(recipe, assembly, null);
        
        } else if(selectedDrawableTile != null) {
            
            var tile = selectedDrawableTile.tile;
            if(tile.isBuildable(assembly)) {
            	this.executeAssembly(recipe, assembly, tile);
            }          
        } 
    };
    
    
    this.executeAssembly = function(recipe, assembly, tile) {
        assembly.action(tile);
        
        var ingredients = recipe.split("");
        for(var i = 0; i < ingredients.length; i++) {
            var input = ingredients[i];
            if(input == "I") {
                gameLogic.playerState.components.beams--;
            } else if(input == "O") {
                gameLogic.playerState.components.pipes--;
            } else if(input == "X") {
                gameLogic.playerState.components.gears--;
            } else if(input == "T") {
                gameLogic.playerState.components.pistons--;
            }
        }
    };
  
};