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
  
};