// Player class - Represents the player character

class Player {
    constructor(x, y, maze) {
        this.x = x;
        this.y = y;
        this.maze = maze;
        this.radius = GAME_CONFIG.TILE_SIZE / 2 - 2;
        this.speed = GAME_CONFIG.PLAYER_SPEED;
        this.direction = DIRECTION.NONE;
        this.nextDirection = DIRECTION.NONE;
        this.mouthAngle = 0;
        this.mouthSpeed = 0.1;
        this.mouthOpen = true;
    }
    
    setDirection(direction) {
        this.nextDirection = direction;
    }
    
    update() {
        // Try to change direction if a new direction is queued
        if (this.nextDirection !== DIRECTION.NONE) {
            const nextX = this.x + this.nextDirection.x * this.speed;
            const nextY = this.y + this.nextDirection.y * this.speed;
            
            if (this.canMove(nextX, nextY)) {
                this.direction = this.nextDirection;
            }
        }
        
        // Move in current direction
        if (this.direction !== DIRECTION.NONE) {
            const newX = this.x + this.direction.x * this.speed;
            const newY = this.y + this.direction.y * this.speed;
            
            if (this.canMove(newX, newY)) {
                this.x = newX;
                this.y = newY;
            }
        }
        
        // Wrap around screen edges
        if (this.x < 0) {
            this.x = GAME_CONFIG.CANVAS_WIDTH;
        } else if (this.x > GAME_CONFIG.CANVAS_WIDTH) {
            this.x = 0;
        }
        
        // Animate mouth
        this.mouthAngle += this.mouthSpeed;
        if (this.mouthAngle > 0.5 || this.mouthAngle < 0) {
            this.mouthSpeed *= -1;
        }
    }
    
    canMove(x, y) {
        // Check collision with walls at the player's corners
        const offsets = [
            { x: -this.radius, y: -this.radius },
            { x: this.radius, y: -this.radius },
            { x: -this.radius, y: this.radius },
            { x: this.radius, y: this.radius }
        ];
        
        for (let offset of offsets) {
            if (!this.maze.canMoveTo(x + offset.x, y + offset.y)) {
                return false;
            }
        }
        
        return true;
    }
    
    getGridPosition() {
        return {
            x: Math.floor(this.x / GAME_CONFIG.TILE_SIZE),
            y: Math.floor(this.y / GAME_CONFIG.TILE_SIZE)
        };
    }
    
    reset(x, y) {
        this.x = x;
        this.y = y;
        this.direction = DIRECTION.NONE;
        this.nextDirection = DIRECTION.NONE;
    }
    
    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        
        // Rotate based on direction
        let rotation = 0;
        if (this.direction === DIRECTION.RIGHT) rotation = 0;
        else if (this.direction === DIRECTION.DOWN) rotation = Math.PI / 2;
        else if (this.direction === DIRECTION.LEFT) rotation = Math.PI;
        else if (this.direction === DIRECTION.UP) rotation = -Math.PI / 2;
        
        ctx.rotate(rotation);
        
        // Draw player as Pac-Man style circle
        ctx.fillStyle = GAME_CONFIG.COLORS.PLAYER;
        ctx.beginPath();
        const mouthAngle = Math.PI / 4 * this.mouthAngle;
        ctx.arc(0, 0, this.radius, mouthAngle, Math.PI * 2 - mouthAngle);
        ctx.lineTo(0, 0);
        ctx.fill();
        
        // Draw eye
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(this.radius / 3, -this.radius / 2, 2, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
    }
}
