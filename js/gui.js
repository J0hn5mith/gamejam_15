function Gui() {
  
  this.assemblyInput = [];
  
  this.resources;
  
  this.components;
  
  this.gotGear = false;
  this.gotPiston = false;
  
  
  this.init = function() {
    
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
  
  
  this.updateResources = function() {
    
    var gameResources = gameLogic.playerState.resources;
    var gameResourceTrend = gameLogic.playerState.resourceTrend;
    
    if(gameResources.coal != this.resources.coal) {
      jQuery("#coal_stock .value").html(gameResources.coal.toString(10));
    }
    if(gameResources.iron != this.resources.iron) {
      jQuery("#iron_stock .value").html(gameResources.iron.toString(10));
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
  
  
  this.showOneLineHint = function(text) {
    jQuery("#one_line_hint").html(text).show();
  };
  
  
  this.hideOneLineHint = function(text) {
    jQuery("#one_line_hint").hide();
  };
  
}