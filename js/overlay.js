function Overlay() {
    
    
    this.openEvent = function(title, description, image, closeCallback) {
        
        game.state.paused = true;
        game.state.blockMapInteraction = true;
        
        jQuery("#overlay_container").show();
        jQuery("#overlay_event").show();
        jQuery("#overlay_event .image").css("background-position", (-320 * image) + "px 0px")
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

    this.openNeighbourEvent = function(title, description, image, closeCallback) {
        game.state.paused = true;
        game.state.blockMapInteraction = true;

        jQuery("#overlay_container").show();
        jQuery("#overlay_event").show();
        jQuery("#overlay_event .image").css("background-position", (-320 * image) + "px 0px")
        jQuery("#overlay_event .title").html(title);
        jQuery("#overlay_event .description").html(description);

        jQuery("#overlay_event .ok_button").click(function() {

            jQuery("#overlay_event").hide();
            jQuery("#overlay_container").hide();

            game.state.paused = false;
            game.state.blockMapInteraction = false;

            jQuery("#overlay_event .ok_button").off("click");

            //@Henry: Pass the selected town to the callback
            var neighbourhoodTown = gameLogic.neighbourTowns[1];
            closeCallback(neighbourhoodTown);
        });

    };

    this.openNeighbourTown = function(town, closeCallback) {
        
        game.state.paused = true;
        game.state.blockMapInteraction = true;
        
        jQuery("#overlay_container").show();
        jQuery("#overlay_neighbour_town").show();
        
        var image = town.getImageOffset();
        jQuery("#overlay_neighbour_town .image").css("background-position", (-395 * image.x) + "px " + (-536 * image.y) + "px")
        jQuery("#overlay_neighbour_town .title").html(town.getTitle());
        jQuery("#overlay_neighbour_town .description").html(town.getDescription());
        
        jQuery("#overlay_neighbour_town .ok_button").click(function() {
            
            jQuery("#overlay_event").hide();
            jQuery("#overlay_container").hide();
            
            game.state.paused = false;
            game.state.blockMapInteraction = false;
            
            jQuery("#overlay_event .ok_button").off("click");

            closeCallback();
        });
    };
    
}


Overlay.STYRO_DOG_EYES = 0;
Overlay.STYRO_HAPPY = 1;
Overlay.STYRO_TIRED = 2;
Overlay.STYRO_MAD = 3;