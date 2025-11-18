// Maze class - Handles level layout, walls, dots, and power-ups

class Maze {
    constructor(level = 1) {
        this.level = level;
        this.tileSize = GAME_CONFIG.TILE_SIZE;
        this.gridWidth = GAME_CONFIG.GRID_WIDTH;
        this.gridHeight = GAME_CONFIG.GRID_HEIGHT;
        
        // Maze layout (0 = path/dot, 1 = wall, 2 = power-up, 3 = cat spawn, 4 = player spawn)
        this.layout = this.generateMazeLayout();
        this.dots = [];
        this.powerUps = [];
        this.totalDots = 0;
        
        this.initialize();
    }
    
    generateMazeLayout() {
        // Classic Pac-Man inspired maze layout
        const layout = [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,0,1,1,0,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,0,1],
            [1,2,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,0,1,1,0,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,2,1],
            [1,0,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,0,1,1,0,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,1,1,1,0,1,0,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,0,1,1,1,0,0,1],
            [1,0,1,1,1,0,1,0,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,0,1,1,1,0,0,1],
            [1,0,0,0,0,0,1,0,0,0,0,0,1,1,0,0,0,1,1,3,3,1,1,0,0,0,1,1,0,0,0,0,1,0,0,0,0,0,0,1],
            [1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,0,3,3,0,1,1,1,0,1,1,0,1,1,1,1,0,1,1,1,1,1,1],
            [1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,0,0,0,0,0,0,0,0,1,0,1,1,0,1,1,1,1,0,1,1,1,1,1,1],
            [1,1,1,1,1,0,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,1,1,1,1,0,1,1,1,1,1,1],
            [1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,0,0,0,0,0,0,0,1,0,1,1,1,0,1,1,1,1,0,1,1,1,1,1,1],
            [0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
            [1,1,1,1,1,0,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,0,1,1,1,1,1,1],
            [1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,0,1,1,1,1,1,1],
            [1,1,1,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,1,1,1,1,0,1,1,1,1,1,1],
            [1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,0,1,1,1,1,1,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1,1,1,1,1,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,1,1,1,0,1,1,1,1,1,0,1,1,0,1,0,1,1,1,1,1,1,0,1,0,1,1,0,1,1,1,1,1,0,1,1,1,0,1],
            [1,0,1,1,1,0,1,1,1,1,1,0,1,1,0,1,0,0,0,0,0,0,0,0,1,0,1,1,0,1,1,1,1,1,0,1,1,1,0,1],
            [1,2,0,0,1,0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,1,0,0,2,1],
            [1,1,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1],
            [1,1,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1],
            [1,0,0,0,0,0,1,0,0,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,1,0,0,0,0,0,0,0,1],
            [1,0,1,1,1,1,1,1,1,0,1,0,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,0,1,0,1,1,1,1,1,1,1,0,1],
            [1,0,1,1,1,1,1,1,1,0,1,0,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,0,1,0,1,1,1,1,1,1,1,0,1],
            [1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1],
            [1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
        ];
        
        return layout;
    }
    
    initialize() {
        this.dots = [];
        this.powerUps = [];
        
        // Place dots and power-ups based on layout
        for (let y = 0; y < this.gridHeight; y++) {
            for (let x = 0; x < this.gridWidth; x++) {
                const tile = this.layout[y][x];
                
                if (tile === 0) {
                    // Place dot
                    this.dots.push({
                        x: x * this.tileSize + this.tileSize / 2,
                        y: y * this.tileSize + this.tileSize / 2,
                        collected: false
                    });
                } else if (tile === 2) {
                    // Place power-up
                    this.powerUps.push({
                        x: x * this.tileSize + this.tileSize / 2,
                        y: y * this.tileSize + this.tileSize / 2,
                        collected: false
                    });
                }
            }
        }
        
        this.totalDots = this.dots.length;
    }
    
    getTile(x, y) {
        const gridX = Math.floor(x / this.tileSize);
        const gridY = Math.floor(y / this.tileSize);
        
        if (gridX < 0 || gridX >= this.gridWidth || gridY < 0 || gridY >= this.gridHeight) {
            return 1; // Treat out of bounds as wall
        }
        
        return this.layout[gridY][gridX];
    }
    
    isWall(x, y) {
        return this.getTile(x, y) === 1;
    }
    
    canMoveTo(x, y) {
        const tile = this.getTile(x, y);
        return tile !== 1; // Can move if not a wall
    }
    
    getPlayerSpawn() {
        for (let y = 0; y < this.gridHeight; y++) {
            for (let x = 0; x < this.gridWidth; x++) {
                if (this.layout[y][x] === 4) {
                    return {
                        x: x * this.tileSize + this.tileSize / 2,
                        y: y * this.tileSize + this.tileSize / 2
                    };
                }
            }
        }
        // Default spawn if not found
        return { x: 400, y: 350 };
    }
    
    getCatSpawns() {
        const spawns = [];
        for (let y = 0; y < this.gridHeight; y++) {
            for (let x = 0; x < this.gridWidth; x++) {
                if (this.layout[y][x] === 3) {
                    spawns.push({
                        x: x * this.tileSize + this.tileSize / 2,
                        y: y * this.tileSize + this.tileSize / 2
                    });
                }
            }
        }
        return spawns;
    }
    
    collectDot(x, y) {
        for (let i = 0; i < this.dots.length; i++) {
            const dot = this.dots[i];
            if (!dot.collected) {
                const distance = Math.sqrt(
                    Math.pow(dot.x - x, 2) + Math.pow(dot.y - y, 2)
                );
                if (distance < this.tileSize / 2) {
                    dot.collected = true;
                    return true;
                }
            }
        }
        return false;
    }
    
    collectPowerUp(x, y) {
        for (let i = 0; i < this.powerUps.length; i++) {
            const powerUp = this.powerUps[i];
            if (!powerUp.collected) {
                const distance = Math.sqrt(
                    Math.pow(powerUp.x - x, 2) + Math.pow(powerUp.y - y, 2)
                );
                if (distance < this.tileSize / 2) {
                    powerUp.collected = true;
                    return true;
                }
            }
        }
        return false;
    }
    
    getRemainingDots() {
        return this.dots.filter(dot => !dot.collected).length;
    }
    
    drawFish(ctx, x, y) {
        ctx.save();
        ctx.translate(x, y);
        
        // Fish body (ellipse)
        ctx.fillStyle = GAME_CONFIG.COLORS.POWER_UP;
        ctx.beginPath();
        ctx.ellipse(0, 0, 8, 5, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Fish tail (triangle)
        ctx.beginPath();
        ctx.moveTo(-8, 0);
        ctx.lineTo(-12, -4);
        ctx.lineTo(-12, 4);
        ctx.closePath();
        ctx.fill();
        
        // Fish eye
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(4, -1, 1.5, 0, Math.PI * 2);
        ctx.fill();
        
        // Eye pupil
        ctx.fillStyle = '#000000';
        ctx.beginPath();
        ctx.arc(4, -1, 0.7, 0, Math.PI * 2);
        ctx.fill();
        
        // Add subtle outline
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.ellipse(0, 0, 8, 5, 0, 0, Math.PI * 2);
        ctx.stroke();
        
        ctx.restore();
    }
    
    draw(ctx) {
        // Draw walls
        ctx.fillStyle = GAME_CONFIG.COLORS.WALL;
        for (let y = 0; y < this.gridHeight; y++) {
            for (let x = 0; x < this.gridWidth; x++) {
                if (this.layout[y][x] === 1) {
                    ctx.fillRect(
                        x * this.tileSize,
                        y * this.tileSize,
                        this.tileSize,
                        this.tileSize
                    );
                }
            }
        }
        
        // Draw dots
        ctx.fillStyle = GAME_CONFIG.COLORS.DOT;
        this.dots.forEach(dot => {
            if (!dot.collected) {
                ctx.beginPath();
                ctx.arc(dot.x, dot.y, 3, 0, Math.PI * 2);
                ctx.fill();
            }
        });
        
        // Draw power-ups (fish icons)
        this.powerUps.forEach(powerUp => {
            if (!powerUp.collected) {
                this.drawFish(ctx, powerUp.x, powerUp.y);
            }
        });
    }
}
