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
    
    
    this.assembleRecipe = function(recipe, selectedDrawableTile) {
        
        var assembly = assemblyRecipes[recipe];

        if(assembly.target == null) {
            assembly.action(null);
        
        } else if(selectedDrawableTile != null) {
            
            var tile = selectedDrawableTile.tile;
            
            if(assembly.target == BuildingCodes.ANY) {
                assembly.action(tile);
            
            } else if(assembly.target == BuildingCodes.EMPTY) {

                if(tile.building == null) {
                    assembly.action(tile);
                }
                
            } else {
                if(tile.building != null && tile.building.code == assembly.target) {
                    assembly.action(tile);
                }
            }                  
        } 
    };
  
};