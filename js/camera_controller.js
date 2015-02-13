function CameraController() {
    
    this.MAX_SPEED = toRad(60.0);
    this.ACCELERATION = toRad(720.0);
    this.DECELERATION = toRad(360.0);

    this.verticalAngle;
    this.horizontalAngle;
    
    this.verticalSpeed;
    this.horizontalSpeed;
    
    this.zoom;
    
	
	this.init = function() {
		
        this.verticalAngle = toRad(30);
        this.horizontalAngle = toRad(45);
        
        this.verticalSpeed = 0.0;
        this.horizontalSpeed = 0.0;
        
        this.zoom = 6.4;
        
        this.update();
	};
	
	
	this.mouseAndKeyboardInput = function() {
		
        if(mouse.dragging && mouse.draggingMode == "camera" && (mouse.dragDeltaX != 0 || mouse.dragDeltaY != 0)) {
            this.horizontalAngle += mouse.dragDeltaX * toRad(0.2);
            this.verticalAngle += mouse.dragDeltaY * toRad(0.2);
            this.update();
        }
        
        if((keyboard.isPressed(Keyboard.ARROW_LEFT) || keyboard.isPressed(Keyboard.A)) &&
                !keyboard.isPressed(Keyboard.ARROW_RIGHT) && !keyboard.isPressed(Keyboard.D)) {
            this.horizontalSpeed += this.ACCELERATION * timer.delta;
            
        } else if((keyboard.isPressed(Keyboard.ARROW_RIGHT) || keyboard.isPressed(Keyboard.D)) &&
                !keyboard.isPressed(Keyboard.ARROW_LEFT) && !keyboard.isPressed(Keyboard.A)) {
            this.horizontalSpeed -= this.ACCELERATION * timer.delta;
            
        } else {
            if(this.horizontalSpeed > 0) {
                this.horizontalSpeed -= this.DECELERATION * timer.delta;
                if(this.horizontalSpeed < 0) {
                    this.horizontalSpeed = 0;
                }
            } else if(this.horizontalSpeed < 0) {
                this.horizontalSpeed += this.DECELERATION * timer.delta;
                if(this.horizontalSpeed > 0) {
                    this.horizontalSpeed = 0;
                }
            }
        }
        
        if((keyboard.isPressed(Keyboard.ARROW_UP) || keyboard.isPressed(Keyboard.W)) &&
                !keyboard.isPressed(Keyboard.ARROW_DOWN) && !keyboard.isPressed(Keyboard.S)) {
            this.verticalSpeed += this.ACCELERATION * timer.delta;
            
        } else if((keyboard.isPressed(Keyboard.ARROW_DOWN) || keyboard.isPressed(Keyboard.S)) &&
                !keyboard.isPressed(Keyboard.ARROW_UP) && !keyboard.isPressed(Keyboard.W)) {
            this.verticalSpeed -= this.ACCELERATION * timer.delta;
        } else {
            if(this.verticalSpeed > 0) {
                this.verticalSpeed -= this.DECELERATION * timer.delta;
                if(this.verticalSpeed < 0) {
                    this.verticalSpeed = 0;
                }
            } else if(this.verticalSpeed < 0) {
                this.verticalSpeed += this.DECELERATION * timer.delta;
                if(this.verticalSpeed > 0) {
                    this.verticalSpeed = 0;
                }
            }
        }
        
        if(this.horizontalSpeed != 0.0 || this.verticalSpeed != 0.0) {
            this.horizontalSpeed = limit(this.horizontalSpeed, -this.MAX_SPEED, this.MAX_SPEED);
            this.verticalSpeed = limit(this.verticalSpeed, -this.MAX_SPEED, this.MAX_SPEED);
            this.horizontalAngle += this.horizontalSpeed * timer.delta;
            this.verticalAngle += this.verticalSpeed * timer.delta;
            this.update();
        }
	};
    
    
	this.update = function() {
        if(this.horizontalAngle > toRad(180)) {
            this.horizontalAngle -= toRad(360);
        } else if(this.horizontalAngle < toRad(-180)) {
            this.horizontalAngle += toRad(360);
        }
        if(this.verticalAngle > toRad(89.9)) {
            this.verticalAngle = toRad(89.9);
        } else if(this.verticalAngle < toRad(15)) {
            this.verticalAngle = toRad(15);
        }

        var camX = this.zoom * Math.cos(this.verticalAngle) * Math.cos(this.horizontalAngle);
        var camY = this.zoom * Math.sin(this.verticalAngle);
        var camZ = this.zoom * Math.cos(this.verticalAngle) * Math.sin(this.horizontalAngle);

        cam.setPosition(camX, camY, camZ);
        cam.lookAt(0, -1.5, 0);
	};
    
}