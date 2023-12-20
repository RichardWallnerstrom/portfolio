import Animation from "./Animation.js";
export default class Player {
    constructor(canvas) {
        this.animation = new Animation();
        this.image = this.animation.image;
        this.canvas = canvas;
        this.isFacingRight = true;
        this.position = {
            x: 50, 
            y: 50, 
        };
        this.size = {
            width: 200,
            height: 200,
        };
        this.velocity = {
            x: 0,
            y: 1,
        };
        this.gravity = 0.5;
    }
    draw(ctx) {
        if (!this.isFacingRight) {
            ctx.save();
            ctx.scale(-1, 1); 
            ctx.drawImage(this.image, -this.position.x - this.size.width, this.position.y, this.size.width, this.size.height);
            ctx.restore();
        } 
        else {
            ctx.drawImage(this.image, this.position.x, this.position.y, this.size.width, this.size.height);
        }
    }
    update(ctx) {
        this.draw(ctx);
        this.applyGravity();
        this.position.x += this.velocity.x;
        this.animation.animate() 
        this.resetAnimation();
    }
    resetAnimation() {
        console.log("velocity x =" + this.velocity.x);
        if (this.velocity.x == 0 && this.isGrounded() && this.animation.currentAnimation !== 'idle')
            this.animation.changeAnimationState('idle')
    }
    isGrounded() {
        return (this.position.y + this.size.height + this.velocity.y < this.canvas.height)
            ? false
            : true;
    }
    applyGravity() {
        this.position.y += this.velocity.y;
        if (!this.isGrounded()) {
            this.velocity.y += this.gravity;
        }
        else {
            this.velocity.y = 0;
        }
    }
    moveLeft() {
        this.isFacingRight = false;
        if (this.velocity.x > -13 )
            this.velocity.x -= 2 
        if (this.animation.currentAnimation !== 'run' && this.animation.currentAnimation !== 'jump') 
            this.animation.changeAnimationState('run')
    }
    moveRight() {
        this.isFacingRight = true;
        if (this.velocity.x < 13 )
            this.velocity.x += 2; 
        if (this.animation.currentAnimation !== 'run' && this.animation.currentAnimation !== 'jump') 
            this.animation.changeAnimationState('run')

    }
    jump() {
        if (this.isGrounded()) {
            this.velocity.y -= 23;
            this.animation.changeAnimationState('jump')
        }
    }
    slide() {
        this.velocity.x += (this.isFacingRight) ? 8 : -8;
        if (this.animation.currentAnimation !== 'slide') 
            this.animation.changeAnimationState('slide')
    }
}
