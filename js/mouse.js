function Mouse() {
  
  this.DRAGGING_THRESHOLD = 3;
  this.DEFAULT_DRAGGING_MODE = "camera";
  
  this.x = 0;
  this.y = 0;
  
  this.downAreas = {};
  this.upAreas = {};
  
  
  this.down = false;
  this.downX = 0;
  this.downY = 0;
  
  this.draggingModeOnDown = this.DEFAULT_DRAGGING_MODE;
  this.draggingMode = null;
  this.dragging = false;
  this.lastDragX = 0;
  this.lastDragY = 0;
  this.dragDeltaX = 0;
  this.dragDeltaY = 0;
  
  this.init = function() {
    
    jQuery("body").attr("unselectable", "on").css("user-select", "none").on("selectstart", false);
    
    jQuery("body").mousemove(function(event) {
      mouse.updatePosition(event);
      
    }).mousedown(function(event) {
      mouse.down = true;
      mouse.updatePosition(event);
      mouse.downX = mouse.x;
      mouse.downY = mouse.y;
      mouse.lastDragX = mouse.x;
      mouse.lastDragY = mouse.y;
      mouse.draggingMode = mouse.draggingModeOnDown;
      if(event.which == 1) {
        for(var name in mouse.downAreas) {
          var area = mouse.downAreas[name];
          if(mouse.isOver(area.x, area.y, area.w, area.h)) {
            area.callback();
          }
        }
      }
      
    }).mouseup(function(event) {
      mouse.down = false;
      mouse.updatePosition(event);
      mouse.dragging = false;
      if(event.which == 1) {
        for(var name in mouse.upAreas) {
          var area = mouse.upAreas[name];
          if(mouse.isOver(area.x, area.y, area.w, area.h)) {
            area.callback();
          }
        }
      }
    });
  };
  
  
  this.updatePosition = function(event) {
    var offset = jQuery("#game").offset();
    this.x = event.pageX - offset.left;
    this.y = event.pageY - offset.top;
    
    if(this.down && 
        (Math.abs(this.x - this.downX) >= this.DRAGGING_THRESHOLD || 
         Math.abs(this.y - this.downY) >= this.DRAGGING_THRESHOLD)) {
      this.dragging = true;
    }
  };
  
  
  this.update = function() {
    if(this.dragging) {
      this.dragDeltaX = this.x - this.lastDragX;
      this.dragDeltaY = this.y - this.lastDragY;
      this.lastDragX = this.x;
      this.lastDragY = this.y;
    } else {
      this.dragDeltaX = 0;
      this.dragDeltaY = 0;
    }
  };
  
  
  this.isOver = function(x, y, w, h) {
    return (this.x >= x && this.x < x + w && this.y >= y && this.y < y + h);
  };
  
  
  this.registerDownArea = function(name, x, y, w, h, callback) {
    this.downAreas[name] = { name : name, x : x, y : y, w : w, h : h, callback : callback};
  };
  
  
  this.deleteDownArea = function(name) {
    if(this.downAreas.hasOwnProperty(name)) {
      delete this.downAreas[name];
    }
  };
  
  
  this.registerUpArea = function(name, x, y, w, h, callback) {
    this.upAreas[name] = { name : name, x : x, y : y, w : w, h : h, callback : callback};
  };
  
  
  this.deleteUpArea = function(name) {
    if(this.upAreas.hasOwnProperty(name)) {
      delete this.upAreas[name];
    }
  };
  
}