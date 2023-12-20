import Animation from "./Animation.js";
export default class Player {
    constructor() {
        this.animation = new Animation();
        this.image = this.animation.image;
        this.canvas = document.getElementById('character2d');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext('2d');
        this.isFacingRight = true;
        this.position = {
            x: 50, 
            y: 50, 
        };
        this.size = {
            width: 320,
            height: 271,
        };
        this.velocity = {
            x: 0,
            y: 1,
        };
        this.gravity = 0.5;
    }
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (!this.isFacingRight) {
            this.ctx.save();
            this.ctx.scale(-1, 1); 
            this.ctx.drawImage(this.image, -this.position.x - this.size.width, this.position.y, this.size.width, this.size.height);
            this.ctx.restore();
        } 
        else {
            this.ctx.drawImage(this.image, this.position.x, this.position.y, this.size.width, this.size.height);
        }
    }
    update() {
        this.draw(this.ctx);
        this.applyGravity();
        this.position.x += this.velocity.x;
        this.animation.animate() 
        this.resetAnimation();
        this.checkCollisionWithElements(); 
    }
    resetAnimation() {
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
    checkCollisionWithElements() {
        const collidables = document.querySelectorAll('.collidable');

        const playerBox = {
            x: this.position.x,
            y: this.position.y,
            width: this.size.width,
            height: this.size.height
        };
        collidables.forEach(collidable => {
            const collidableRect = collidable.getBoundingClientRect();

            // create collision box 
            const collidableBox = {
                x: collidableRect.left,
                y: collidableRect.top,
                width: collidableRect.width,
                height: collidableRect.height
            };

            // collision detection logic
            if (
                playerBox.x < collidableBox.x + collidableBox.width &&
                playerBox.x + playerBox.width > collidableBox.x &&
                playerBox.y < collidableBox.y + collidableBox.height &&
                playerBox.y + playerBox.height > collidableBox.y
            ) {
                console.log('Collision detected with:', collidable);
            }
        });
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
