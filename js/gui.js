function Gui() {
    
  this.overlay;
  
  this.assemblyInput = [];
  
  this.resources;
  
  this.components;
  
  this.gotGear = false;
  this.gotPiston = false;
  
  this.assemblyOutputHover = false;
  
  this.assemblyOutputX = 0;
  this.assemblyOutputY = 0;
  
  this.draggingGrabOffsetX = 0;
  this.draggingGrabOffsetY = 0;
  
  this.selectedMapTile = null;
  this.selectedNeighbourTown = null;
  
  this.currentRecipe;
  this.currentAssembly;
  
  this.mapClickMode = 0;
  
  
  this.init = function() {
      
    this.overlay = new Overlay();
    
    this.assemblyInput[0] = "I";
    this.assemblyInput[1] = "I";
    this.assemblyInput[2] = "I";
    
    this.resources = new ResourcesState();
    
    this.components = new ComponentsState();
    
    this.updateAssembly();
  };
  
  
  this.show = function() {
    
    this.updateResources();
    this.updateComponents();
    
    jQuery("#assembly_input_0").click(function() {
      gui.switchAssemblyInput(0);
    });
    jQuery("#assembly_input_1").click(function() {
      gui.switchAssemblyInput(1);
    });
    jQuery("#assembly_input_2").click(function() {
      gui.switchAssemblyInput(2);
    });
    
    jQuery("#coal_stock").mouseover(function() {
      gui.showOneLineHint("Coal");
    }).mouseout(function() {
      gui.hideOneLineHint();
    });
    
    jQuery("#iron_stock").mouseover(function() {
      gui.showOneLineHint("Iron");
    }).mouseout(function() {
      gui.hideOneLineHint();
    });
    
    jQuery("#beam_stock").mouseover(function() {
      gui.showOneLineHint("Beams");
    }).mouseout(function() {
      gui.hideOneLineHint();
    });
    
    jQuery("#pipe_stock").mouseover(function() {
      gui.showOneLineHint("Pipes");
    }).mouseout(function() {
      gui.hideOneLineHint();
    });
    
    jQuery("#gear_stock").mouseover(function() {
      gui.showOneLineHint("Gears");
    }).mouseout(function() {
      gui.hideOneLineHint();
    });
    
    jQuery("#piston_stock").mouseover(function() {
      gui.showOneLineHint("Pistons");
    }).mouseout(function() {
      gui.hideOneLineHint();
    });
    
    jQuery(".no_camera_dragging").mouseover(function() {
      mouse.draggingModeOnDown = "";
    }).mouseout(function() {
      mouse.draggingModeOnDown = "camera";
    });
    
    jQuery("#assembly_output").mouseover(function() {
        if(jQuery("#assembly_output").hasClass("active")) {
            mouse.draggingModeOnDown = "assembly_output";
        } else {
            mouse.draggingModeOnDown = "";
        }
        gui.assemblyOutputHover = true;
        gui.showAssemblyHint();
        
    }).mouseout(function() {
        mouse.draggingModeOnDown = "camera";
        gui.assemblyOutputHover = false;
        gui.hideAssemblyHint();
        
    }).mousedown(function() {
        if(jQuery("#assembly_output").hasClass("active")) {
            gui.startDraggingAssemblyOutput();
        }
    });
    
    mouse.registerUpArea("mapClick", -10000, -10000, 30000, 30000, function() {
    	gui.mapClick();
    });
    
    jQuery("#gui").show();
    
  };
  
  
  this.hide = function() {
    jQuery("#gui").hide();
  };
  
  
  this.switchAssemblyInput = function(slot) {
    
    if(this.assemblyInput[slot] == "I") {
      this.assemblyInput[slot] = "O";
      
    } else if(this.assemblyInput[slot] == "O") {
      if(this.gotGear) {
        this.assemblyInput[slot] = "X";
      } else if(this.gotPiston) {
        this.assemblyInput[slot] = "T";
      } else {
        this.assemblyInput[slot] = "I";
      }
      
    } else if(this.assemblyInput[slot] == "X") {
      if(this.gotPiston) {
        this.assemblyInput[slot] = "T";
      } else {
        this.assemblyInput[slot] = "I";
      }
      
    } else if(this.assemblyInput[slot] == "T") {
      this.assemblyInput[slot] = "I";
      
    }
    
    this.updateAssembly();
  };
  
  
  this.update = function() {
      this.updateResources();
      this.updateComponents();
      this.updateAssemblyOutputDragging();
  };
  
  
  this.updateResources = function() {
    
    var gameResources = gameLogic.playerState.resources;
    var gameResourceTrend = gameLogic.playerState.resourceTrend;
    
    if(gameResources.coal != this.resources.coal) {
      jQuery("#coal_stock .value").html(Math.round(gameResources.coal).toString(10));
    }
    if(gameResources.iron != this.resources.iron) {
      jQuery("#iron_stock .value").html(Math.round(gameResources.iron).toString(10));
    }
    
    if(gameResourceTrend.coal > 0.001) {
      jQuery("#coal_stock .trend").css("background-position", "0px -36px");
    } else if(gameResourceTrend.coal < -0.001) {
      jQuery("#coal_stock .trend").css("background-position", "0px -72px");
    } else {
      jQuery("#coal_stock .trend").css("background-position", "0px 0px");
    }
    
    if(gameResourceTrend.iron > 0.001) {
      jQuery("#iron_stock .trend").css("background-position", "0px -36px");
    } else if(gameResourceTrend.iron < -0.001) {
      jQuery("#iron_stock .trend").css("background-position", "0px -72px");
    } else {
      jQuery("#iron_stock .trend").css("background-position", "0px 0px");
    }
    
    this.resources = ResourcesState.create(gameResources);
  };
  
  
  this.updateComponents = function() {
    
    var gameComponents = gameLogic.playerState.components;
    
    var beams = gameComponents.beams.toString(10);
    var pipes = gameComponents.pipes.toString(10);
    var gears = gameComponents.gears.toString(10);
    var pistons = gameComponents.pistons.toString(10);
    
    if(gameComponents.beams != this.components.beams) {
      jQuery("#beam_stock").html(beams);
    }
    if(gameComponents.pipes != this.components.pipes) {
      jQuery("#pipe_stock").html(pipes);
    }
    if(gameComponents.gears != this.components.gears) {
      jQuery("#gear_stock").html(gears);
    }
    if(gameComponents.pistons != this.components.pistons) {
      jQuery("#piston_stock").html(pistons);
    }
    
    if(gears > 1) {
      this.gotGear = true;
    }
    if(pistons > 1) {
      this.gotPiston = true;
    }

    if(gameComponents.beams != this.components.beams || 
        gameComponents.pipes != this.components.pipes || 
        gameComponents.gears != this.components.gears ||
        gameComponents.pistons != this.components.pistons) {
      this.updateAssembly();
    }
    
    this.components = ComponentsState.create(gameComponents);
  };
  
  
  this.updateAssembly = function() {
    
    var beams = gameLogic.playerState.components.beams;
    var pipes = gameLogic.playerState.components.pipes;
    var gears = gameLogic.playerState.components.gears;
    var pistons = gameLogic.playerState.components.pistons;
    
    var canAssemble = true;
    
    for(var i = 0; i < 3; i++) {
      
      if(this.assemblyInput[i] == "I") {
        beams--;
        if(beams >= 0) {
          jQuery("#assembly_input_" + i).css("background-position", "-27px -2px");
        } else {
          jQuery("#assembly_input_" + i).css("background-position", "-27px -102px");
          canAssemble = false;
        }
        
      } else if(this.assemblyInput[i] == "O") {
        pipes--;
        if(pipes >= 0) {
          jQuery("#assembly_input_" + i).css("background-position", "-127px -2px");
        } else {
          jQuery("#assembly_input_" + i).css("background-position", "-127px -102px");
          canAssemble = false;
        }
        
      } else if(this.assemblyInput[i] == "X") {
        gears--;
        if(gears >= 0) {
          jQuery("#assembly_input_" + i).css("background-position", "-227px -2px");
        } else {
          jQuery("#assembly_input_" + i).css("background-position", "-227px -102px");
          canAssemble = false;
        }
        
      } else if(this.assemblyInput[i] == "T") {
        pistons--;
        if(pistons >= 0) {
          jQuery("#assembly_input_" + i).css("background-position", "-327px -2px");
        } else {
          jQuery("#assembly_input_" + i).css("background-position", "-327px -102px");
          canAssemble = false;
        }
      }
    }
    
    var recipe = this.assemblyInput[0] + this.assemblyInput[1] + this.assemblyInput[2];
    if(gameLogic.assembler.doesRecipeExist(recipe)) {
        if(canAssemble) {
            jQuery("#assembly_output_draggable").css("opacity", "1.0");
        } else {
            jQuery("#assembly_output_draggable").css("opacity", "0.4");
        }
        jQuery("#assembly_output_draggable").css("background-position", "-52px -2px");
    } else {
        jQuery("#assembly_output_draggable").css("background-position", "-2px -2px");
        canAssemble = false;
    }
    
    if(canAssemble) {
      jQuery("#assembly_arrow").css("background-position", "0px 0px");
      if(!jQuery("#assembly_output").hasClass("active")) {
        jQuery("#assembly_output").addClass("active")
      }
      
    } else {
      jQuery("#assembly_arrow").css("background-position", "0px -50px");
      if(jQuery("#assembly_output").hasClass("active")) {
        jQuery("#assembly_output").removeClass("active")
      }
    }
  };
  
  
  this.startDraggingAssemblyOutput = function() {
	  
	  this.currentRecipe = this.assemblyInput[0] + this.assemblyInput[1] + this.assemblyInput[2];
      if(!gameLogic.assembler.doesRecipeExist(this.currentRecipe)) {
    	  return;
      }
      this.currentAssembly = assemblyRecipes[this.currentRecipe];
      
      this.draggingGrabOffsetX = mouse.x - this.assemblyOutputX;
      this.draggingGrabOffsetY = mouse.y - this.assemblyOutputY;
      
      jQuery("#assembly_output").addClass("dragging");
      gameLogic.map.drawableMap.showBuildableTiles(this.currentAssembly);
      
      this.mapClickMode = 1;
  };
  
  
  this.mapClick = function() {
	  
	  if(this.mapClickMode == 0) {
		  if(!game.state.blockMapInteraction && this.selectedNeighbourTown != null) {
			  gui.overlay.openNeighbourTown(this.selectedNeighbourTown, function() {  });
		  }
		  
	  } else if(this.mapClickMode == 1) {
	      jQuery("#assembly_output").removeClass("dragging");
	      gameLogic.map.drawableMap.hideBuildableTiles();
	      if(gui.selectedMapTile != null) {
	    	  gui.selectedMapTile.showSelection(255, 255, 255);
	      }
	      
	      this.mapClickMode = 0;
	      gui.placeAssemblyOutput(this.currentAssembly);
	  }
  };
  
  
  this.updateAssemblyOutputDragging = function() {
      if(mouse.dragging && mouse.draggingMode == "assembly_output") {
          var left = mouse.x - (this.assemblyOutputX + this.draggingGrabOffsetX);
          var top = mouse.y - (this.assemblyOutputY + this.draggingGrabOffsetY);
          jQuery("#assembly_output_draggable").css({ left : left + "px", top : top + "px" });
      }
  };
  
  
  this.placeAssemblyOutput = function() {
      
      jQuery("#assembly_output_draggable").css({ left : "0px", top : "0px" });
      this.hideAssemblyHint();
      
      if(mouse.x < this.assemblyOutputX || mouse.x > this.assemblyOutputX + 50 ||
              mouse.y < this.assemblyOutputY || mouse.y > this.assemblyOutputY + 50) {
          gameLogic.assembler.assembleRecipe(this.currentRecipe, this.currentAssembly, this.selectedMapTile);
      }
      this.currentRecipe = "";
      this.currentAssembly = null;
  };
  
  
  this.showOneLineHint = function(text) {
    jQuery("#one_line_hint").html(text).show();
  };
  
  
  this.hideOneLineHint = function(text) {
    jQuery("#one_line_hint").hide();
  };
  
  
  this.showAssemblyHint = function() {
      var recipe = this.assemblyInput[0] + this.assemblyInput[1] + this.assemblyInput[2];
      if(gameLogic.assembler.doesRecipeExist(recipe)) {
          jQuery("#assembly_hint_title").html(gameLogic.assembler.getTitle(recipe));
          jQuery("#assembly_hint_description").html(gameLogic.assembler.getDescription(recipe));
          jQuery("#assembly_hint").show();
      }
  };
  
  
  this.hideAssemblyHint = function() {
      if(!this.assemblyOutputHover &&
              (!mouse.dragging || mouse.draggingMode != "assembly_output")) {
          jQuery("#assembly_hint").hide();
      }
  };
  
  
  this.setSelectedMapTile = function(newMapTile) {
      if(newMapTile != this.selectedMapTile) {
          if(this.selectedMapTile != null) {
              this.selectedMapTile.hideSelection();
          }
          if(newMapTile != null) {
        	  if(this.currentAssembly != null) {
                  if(newMapTile.tile.isBuildable(this.currentAssembly)) {
                	  newMapTile.showSelection(63, 255, 63);
                  } else {
                	  newMapTile.showSelection(255, 63, 63);
                  }
        	  } else {
        		  newMapTile.showSelection(255, 255, 255);
        	  }
          }
          this.selectedMapTile = newMapTile;
      }
  };
  
  
  this.setSelectedNeighbourTown = function(newTown) {
      if(newTown != this.selectedNeighbourTown) {
          if(this.selectedNeighbourTown != null) {
        	  this.selectedNeighbourTown.drawableNeighbourTown.hideSelection();
          }
          if(newTown != null) {
              newTown.drawableNeighbourTown.showSelection(255, 255, 255);
          }
          this.selectedNeighbourTown = newTown;
      }
  };
  
  
  this.resize = function() {
      jQuery("#gui").width(game.WIDTH).height(game.HEIGHT);
      jQuery("#assembly_panel").css("left", ((game.WIDTH / 2.0) - 150) + "px");
      jQuery("#assembly_hint").css("max-width", ((game.WIDTH / 2.0) - 194) + "px");

      var assemblyPanelPosition = jQuery("#assembly_panel").position();
      
      this.assemblyOutputX = assemblyPanelPosition.left + 250;
      this.assemblyOutputY = assemblyPanelPosition.top;

      jQuery("#overlay_container")
          .css("left", ((game.WIDTH - 880) / 2.0) + "px")
          .css("top", ((game.HEIGHT - 540) / 2.0) + "px");
  };
  
}

function DebugPanelPrototype(){

    this.print = function(text){
        //var element = this.getElement();
        //var tag = "<p>"  + text + "</p>";
        //element.prepend(tag);
    };

    this.getElement = function(){
        if (!this.element){
            this.element = jQuery("#debug_console_test_panel");
        }

        return this.element;
    };
}

var DebugPanel = new DebugPanelPrototype();