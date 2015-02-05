function Overlay() {
    
    
    this.openEvent = function(title, description, image, closeCallback) {
        
        game.state.paused = true;
        game.state.blockMapInteraction = true;
        
        jQuery("#overlay_container").show();
        jQuery("#overlay_event").show();
        jQuery("#overlay_event .title").html(title);
        jQuery("#overlay_event .description").html(description);
        
        jQuery("#overlay_event .ok_button").click(function() {
            
            jQuery("#overlay_event").hide();
            jQuery("#overlay_container").hide();
            
            game.state.paused = false;
            game.state.blockMapInteraction = false;
            
            jQuery("#overlay_event .ok_button").off("click");
            
            closeCallback();
        });
    };
    
    
    
}