function Gui() {
  
  this.assemplyInput = [];
  
  this.gotGear = false;
  this.gotPiston = false;
  
  
  this.init = function() {
    
    this.assemplyInput[0] = "I";
    this.assemplyInput[1] = "I";
    this.assemplyInput[2] = "I";
    
    this.updateAssemblyInputAvailability();
  };
  
  
  this.show = function() {
    
    this.updateResources();
    this.updateComponents();
    
    jQuery("#assemply_input_0").click(function() {
      gui.switchAssemblyInput(0);
    });
    jQuery("#assemply_input_1").click(function() {
      gui.switchAssemblyInput(1);
    });
    jQuery("#assemply_input_2").click(function() {
      gui.switchAssemblyInput(2);
    });
    
    jQuery("#coal_stock").mouseover(function() {
      gui.showOneLineHint("Coal");
    });
    jQuery("#coal_stock").mouseout(function() {
      gui.hideOneLineHint();
    });
    
    jQuery("#iron_stock").mouseover(function() {
      gui.showOneLineHint("Iron");
    });
    jQuery("#iron_stock").mouseout(function() {
      gui.hideOneLineHint();
    });
    
    jQuery("#beam_stock").mouseover(function() {
      gui.showOneLineHint("Beams");
    });
    jQuery("#beam_stock").mouseout(function() {
      gui.hideOneLineHint();
    });
    
    jQuery("#pipe_stock").mouseover(function() {
      gui.showOneLineHint("Pipes");
    });
    jQuery("#pipe_stock").mouseout(function() {
      gui.hideOneLineHint();
    });
    
    jQuery("#gear_stock").mouseover(function() {
      gui.showOneLineHint("Gears");
    });
    jQuery("#gear_stock").mouseout(function() {
      gui.hideOneLineHint();
    });
    
    jQuery("#piston_stock").mouseover(function() {
      gui.showOneLineHint("Pistons");
    });
    jQuery("#piston_stock").mouseout(function() {
      gui.hideOneLineHint();
    });
    
    jQuery("#gui").show();
  };
  
  
  this.hide = function() {
    jQuery("#gui").hide();
  };
  
  
  this.switchAssemblyInput = function(slot) {
    
    if(this.assemplyInput[slot] == "I") {
      this.assemplyInput[slot] = "O";
      
    } else if(this.assemplyInput[slot] == "O") {
      if(this.gotGear) {
        this.assemplyInput[slot] = "X";
      } else if(this.gotPiston) {
        this.assemplyInput[slot] = "T";
      } else {
        this.assemplyInput[slot] = "I";
      }
      
    } else if(this.assemplyInput[slot] == "X") {
      if(this.gotPiston) {
        this.assemplyInput[slot] = "T";
      } else {
        this.assemplyInput[slot] = "I";
      }
      
    } else if(this.assemplyInput[slot] == "T") {
      this.assemplyInput[slot] = "I";
      
    }
    
    if(this.assemplyInput[slot] == "I") {
      jQuery("#assemply_input_" + slot).css("background-position", "-27px -2px");
    } else if(this.assemplyInput[slot] == "O") {
      jQuery("#assemply_input_" + slot).css("background-position", "-127px -2px");
    } else if(this.assemplyInput[slot] == "X") {
      jQuery("#assemply_input_" + slot).css("background-position", "-227px -2px");
    } else if(this.assemplyInput[slot] == "T") {
      jQuery("#assemply_input_" + slot).css("background-position", "-327px -2px");
    }
    
    this.updateAssemblyInputAvailability();
  };
  
  
  this.updateResources = function() {
    
    jQuery("#coal_stock .value").html(gameLogic.playerState.resources.coal.toString(10));
    jQuery("#iron_stock .value").html(gameLogic.playerState.resources.iron.toString(10));
    
    var coalTrend = gameLogic.playerState.resourceTrend.coal;
    var ironTrend = gameLogic.playerState.resourceTrend.iron;
    
    if(coalTrend > 0.1) {
      jQuery("#coal_stock .trend").css("background-position", "0px -36px");
    } else if(coalTrend < -0.1) {
      jQuery("#coal_stock .trend").css("background-position", "0px -72px");
    } else {
      jQuery("#coal_stock .trend").css("background-position", "0px 0px");
    }
    
    if(ironTrend > 0.1) {
      jQuery("#iron_stock .trend").css("background-position", "0px -36px");
    } else if(ironTrend < -0.1) {
      jQuery("#iron_stock .trend").css("background-position", "0px -72px");
    } else {
      jQuery("#iron_stock .trend").css("background-position", "0px 0px");
    }
  };
  
  
  this.updateComponents = function() {
    
    var beams = gameLogic.playerState.components.beams.toString(10);
    var pipes = gameLogic.playerState.components.pipes.toString(10);
    var gears = gameLogic.playerState.components.gears.toString(10);
    var pistons = gameLogic.playerState.components.pistons.toString(10);
    
    jQuery("#beam_stock").html(beams);
    jQuery("#pipe_stock").html(pipes);
    jQuery("#gear_stock").html(gears);
    jQuery("#piston_stock").html(pistons);
    
    if(gears > 1) {
      this.gotGear = true;
    }
    if(pistons > 1) {
      this.gotPiston = true;
    }
    
    this.updateAssemblyInputAvailability();
  };
  
  
  this.updateAssemblyInputAvailability = function() {
    
  };
  
  
  this.showOneLineHint = function(text) {
    jQuery("#one_line_hint").html(text).show();
  };
  
  
  this.hideOneLineHint = function(text) {
    jQuery("#one_line_hint").hide();
  };
  
}