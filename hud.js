class Hud {
    constructor(game) {
        this.game = game;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/HUD_mockup.png");
        this.animation = new Animator(this.spritesheet, 0, 0, 1483, 198, 1, 1);

        //this.animation = this.animations.get(this.state);
        //Animator constructor(spritesheet, xStart, yStart, width, height, frameCount, frameDuration) {

    };

    loadAnimations() {
       // this.animations.set("growing", new Animator(this.spritesheet, 0, 0, 12, 20, 6, .2));
       // this.animations.set("grown", new Animator(this.spritesheet, 60, 0, 12, 20, 1, .08));
        //this.animations.set("picked", new Animator(this.spritesheet, 72, 0, 12, 20, 1, .08));

    };

    update() {
     //   if (this.animation.currentFrame() == 5) {
       //     this.state = "grown";
       //     this.animation = this.animations.get(this.state);
        //}
        // update speed
        // update position
        // update armed or unarmed
        //this.x -= this.speed + this.game.clockTick;
        //if (this.x < 0) this.x = 1000;
    };

    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, 0, 0, .5);
    };
};