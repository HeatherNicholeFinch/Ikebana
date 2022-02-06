class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = null;
        this.y = null;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/HUD_mockup.png");
        this.animation = new Animator(this.spritesheet, 0, 0, 1483, 198, 1, 1);

        this.health = 3;
        this.ammo = { bullet: 255, energy: 55};
        this.flowers = 0;

        this.xMidpoint = null;
        this.yMidpoint = null;

        //this.gameOver = false;
        this.level = "level1";
        this.levelXSize = 75; // # of tiles
        this.levelYSize = 41;
        this.game.numXTiles = this.levelXSize;
        this.game.numYTiles = this.levelYSize;

        this.startXPlayer = (this.levelXSize*5*16)/2;
        this.startYPlayer = (this.levelYSize*5*16)/2;

        this.loadLevel(this.level);
    };

    loadLevel(level) {

        // build level map
        this.game.level = new LevelGenerator(this.game, this.levelXSize, this.levelYSize);
        this.randomLocation();

        // add crosshair
        this.game.crosshair= new Crosshair(this.game);

        // add gun
        this.game.addEntity(new Gun("uzi",this.game)); // 5 is level scaler and 16 is the sprite width/height for level tiles
        
        // add goop
        this.game.addEntity(new Goop(this.game)); // 5 is level scaler and 16 is the sprite width/height for level tiles

        this.xMidpoint = this.game.ctx.canvas.width/2 - (this.game.goop.spriteWidth/2);
        this.yMidpoint = this.game.ctx.canvas.height/2 - (this.game.goop.spriteHeight/2);

        this.x = this.game.goop.xMap - this.xMidpoint;
        this.y = this.game.goop.yMap - this.yMidpoint;


    }

    clearEntities() {
        this.game.entities.forEach(function (entity) {
            entity.removeFromWorld = true;
        });
    };

    // used to find a random start location for goop
    randomLocation() {
        var choice = floor(Math.random() * 2);

        // start at the top
        if (choice < 1) {
            for (let row = 1; row < this.levelYSize - 3; row++) {
                for (let col = 1; col < this.levelXSize - 3; col++) {
                    if (this.acceptableSpawnLocation(row, col)) {
                        this.startXPlayer = col * 5 * 16;
                        this.startYPlayer = row * 5 * 16;
                        break;
                    }
                }
            }
        // start at the bottom
        } else {
            for (let row = this.levelYSize - 3; row > 0; row--) {
                for (let col = this.levelXSize - 3; col > 0; col--) {
                    if (this.acceptableSpawnLocation(row, col)) {
                        this.startXPlayer = col * 5 * 16;
                        this.startYPlayer = row * 5 * 16;
                        break;
                    }
                }
            }
        }
    };

    // returns true if the location is a 3x3 grid of floorspace
    acceptableSpawnLocation(row, col) {
        if (this.game.spriteGrid[row][col].type == "floor"
            && this.game.spriteGrid[row+1][col].type == "floor"
            && this.game.spriteGrid[row+2][col].type == "floor"
            && this.game.spriteGrid[row][col+1].type == "floor"
            && this.game.spriteGrid[row+1][col+1].type == "floor"
            && this.game.spriteGrid[row+2][col+1].type == "floor"
            && this.game.spriteGrid[row][col+2].type == "floor"
            && this.game.spriteGrid[row+1][col+2].type == "floor"
            && this.game.spriteGrid[row+2][col+2].type == "floor")
            return true;
        return false;
    };

    update() {
        let radius = 200;
        let xDistance = ((this.game.crosshair.xMap + this.game.crosshair.spriteSize/2) - (this.game.goop.xMap + this.game.goop.spriteWidth/2));
        let yDistance = ((this.game.crosshair.yMap + this.game.crosshair.spriteSize/2) - (this.game.goop.yMap + this.game.goop.spriteHeight/2));
        let totalDistance = Math.sqrt((xDistance*xDistance) + (yDistance*yDistance));

        
        //TODO: make this radius bound work for camera
        // if(totalDistance > radius){
        //     console.log("here");
        //     this.x = this.game.goop.xMap - this.xMidpoint + ((xDistance/totalDistance)*radius);
        //     this.y = this.game.goop.yMap - this.yMidpoint + ((yDistance/totalDistance)*radius);
        // }
        // else if (totalDistance <= radius){
            this.x = this.game.goop.xMap - this.xMidpoint + (xDistance/2);
            this.y = this.game.goop.yMap - this.yMidpoint + (yDistance/2);
        // }
   

        
        // ScreenMouse = GetComponent.<Camera>().main.ScreenToWorldPoint(Vector3(MousePos1.x, MousePos1.y, Obj.position.z-GetComponent.<Camera>().main.transform.position.z));
        // MouseOffset = ScreenMouse - Parent.position;
    
        // MousePos2 = Camera.main.ScreenToWorldPoint(Vector3(Input.mousePosition.x, Input.mousePosition.y, -transform.position.z));
        // Obj.position.y = ((this.game.mouseY - Parent.position.y)/2.0)+Parent.position.y;
        // Obj.position.x = ((this.game.mouseX - Parent.position.x)/2.0)+Parent.position.x;
        
        // Dist = Vector2.Distance(Vector2(Obj.position.x, Obj.position.y), Vector2(Parent.position.x, Parent.position.y));
        
        // if(Dist > Radius){
        //     var norm = MouseOffset.normalized;
        //     Obj.position.x = norm.x*Radius + Parent.position.x;
        //     Obj.position.y = norm.y*Radius + Parent.position.y;
        // }
    }

    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, 0, 0, .5);
    };
}
