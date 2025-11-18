// Cat class - Enemy that chases the player

class Cat {
    constructor(x, y, maze, color = GAME_CONFIG.COLORS.CAT_NORMAL) {
        this.x = x;
        this.y = y;
        this.startX = x;
        this.startY = y;
        this.maze = maze;
        this.radius = GAME_CONFIG.TILE_SIZE / 2 - 2; // Keep collision radius same for movement
        this.drawRadius = GAME_CONFIG.TILE_SIZE / 2 + 3; // Larger visual size
        this.speed = GAME_CONFIG.CAT_SPEED;
        this.normalSpeed = GAME_CONFIG.CAT_SPEED;
        this.frightenedSpeed = GAME_CONFIG.CAT_FRIGHTENED_SPEED;
        this.direction = DIRECTION.LEFT;
        this.color = color;
        this.normalColor = color;
        this.frightenedColor = GAME_CONFIG.COLORS.CAT_FRIGHTENED;
        this.isFrightened = false;
        this.isDead = false;
        this.moveCounter = 0;
        this.aiUpdate = 10; // Update AI every N frames
        this.targetDirection = null; // Store the target direction from pathfinding
    }
    
    setFrightened(frightened) {
        if (this.isDead) return;
        
        this.isFrightened = frightened;
        this.color = frightened ? this.frightenedColor : this.normalColor;
        this.speed = frightened ? this.frightenedSpeed : this.normalSpeed;
    }
    
    // Convert world coordinates to grid coordinates
    getGridPos(x, y) {
        return {
            x: Math.floor(x / GAME_CONFIG.TILE_SIZE),
            y: Math.floor(y / GAME_CONFIG.TILE_SIZE)
        };
    }
    
    // BFS pathfinding to find shortest path to player
    findPathToPlayer(player) {
        const startGrid = this.getGridPos(this.x, this.y);
        const targetGrid = this.getGridPos(player.x, player.y);
        
        // If same tile, no path needed
        if (startGrid.x === targetGrid.x && startGrid.y === targetGrid.y) {
            return null;
        }
        
        // BFS setup
        const queue = [{x: startGrid.x, y: startGrid.y, path: []}];
        const visited = new Set();
        visited.add(`${startGrid.x},${startGrid.y}`);
        
        const directions = [
            {dx: 0, dy: -1, dir: DIRECTION.UP},
            {dx: 0, dy: 1, dir: DIRECTION.DOWN},
            {dx: -1, dy: 0, dir: DIRECTION.LEFT},
            {dx: 1, dy: 0, dir: DIRECTION.RIGHT}
        ];
        
        // BFS to find shortest path
        while (queue.length > 0) {
            const current = queue.shift();
            
            // Check if we reached the target
            if (current.x === targetGrid.x && current.y === targetGrid.y) {
                // Return the first direction in the path
                return current.path.length > 0 ? current.path[0] : null;
            }
            
            // Try all four directions
            for (const {dx, dy, dir} of directions) {
                const newX = current.x + dx;
                const newY = current.y + dy;
                const key = `${newX},${newY}`;
                
                // Check if already visited
                if (visited.has(key)) continue;
                
                // Check if tile is walkable (not a wall)
                const worldX = newX * GAME_CONFIG.TILE_SIZE + GAME_CONFIG.TILE_SIZE / 2;
                const worldY = newY * GAME_CONFIG.TILE_SIZE + GAME_CONFIG.TILE_SIZE / 2;
                
                if (!this.maze.canMoveTo(worldX, worldY)) continue;
                
                // Add to queue
                visited.add(key);
                queue.push({
                    x: newX,
                    y: newY,
                    path: [...current.path, dir]
                });
            }
            
            // Limit search depth to prevent lag
            if (visited.size > 200) break;
        }
        
        // No path found, return null
        return null;
    }
    
    update(player) {
        if (this.isDead) return;
        
        this.moveCounter++;
        
        // Update AI decision less frequently for performance
        if (this.moveCounter % this.aiUpdate === 0) {
            this.updateDirection(player);
        }
        
        // Move in current direction
        const newX = this.x + this.direction.x * this.speed;
        const newY = this.y + this.direction.y * this.speed;
        
        if (this.canMove(newX, newY)) {
            this.x = newX;
            this.y = newY;
        } else {
            // If can't move, change direction immediately
            this.updateDirection(player);
        }
        
        // Wrap around screen edges
        if (this.x < 0) {
            this.x = GAME_CONFIG.CANVAS_WIDTH;
        } else if (this.x > GAME_CONFIG.CANVAS_WIDTH) {
            this.x = 0;
        }
    }
    
    updateDirection(player) {
        // Get all possible directions
        const possibleDirections = [
            DIRECTION.UP,
            DIRECTION.DOWN,
            DIRECTION.LEFT,
            DIRECTION.RIGHT
        ];
        
        // First, check all valid directions (no reverse restriction)
        let validDirections = possibleDirections.filter(dir => {
            const newX = this.x + dir.x * this.speed * 5;
            const newY = this.y + dir.y * this.speed * 5;
            return this.canMove(newX, newY);
        });
        
        if (validDirections.length === 0) return;
        
        if (this.isFrightened) {
            // When frightened, move randomly away from player
            const awayDirections = validDirections.filter(dir => {
                const newX = this.x + dir.x * 20;
                const newY = this.y + dir.y * 20;
                const currentDist = this.getDistanceToPlayer(player);
                const newDist = Math.sqrt(
                    Math.pow(newX - player.x, 2) + Math.pow(newY - player.y, 2)
                );
                return newDist > currentDist;
            });
            
            if (awayDirections.length > 0) {
                this.direction = awayDirections[Math.floor(Math.random() * awayDirections.length)];
            } else {
                this.direction = validDirections[Math.floor(Math.random() * validDirections.length)];
            }
        } else {
            // SMART PATHFINDING: Use BFS to find actual shortest path through maze
            const pathDirection = this.findPathToPlayer(player);
            
            if (pathDirection && validDirections.includes(pathDirection)) {
                // Follow the optimal path found by BFS
                this.direction = pathDirection;
            } else {
                // Fallback: Use simple distance-based approach if pathfinding fails
                const directionScores = validDirections.map(dir => {
                    const newX = this.x + dir.x * 20;
                    const newY = this.y + dir.y * 20;
                    const distance = Math.sqrt(
                        Math.pow(newX - player.x, 2) + Math.pow(newY - player.y, 2)
                    );
                    return { dir, distance };
                });
                
                // Sort by distance (closest first)
                directionScores.sort((a, b) => a.distance - b.distance);
                this.direction = directionScores[0].dir;
            }
        }
    }
    
    canMove(x, y) {
        // Check collision with walls
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
    
    getDistanceToPlayer(player) {
        return Math.sqrt(
            Math.pow(this.x - player.x, 2) + Math.pow(this.y - player.y, 2)
        );
    }
    
    checkCollision(player) {
        const distance = this.getDistanceToPlayer(player);
        return distance < this.radius + player.radius;
    }
    
    die() {
        this.isDead = true;
    }
    
    respawn() {
        this.x = this.startX;
        this.y = this.startY;
        this.isDead = false;
        this.isFrightened = false;
        this.color = this.normalColor;
        this.speed = this.normalSpeed;
        this.direction = DIRECTION.LEFT;
    }
    
    reset() {
        this.respawn();
    }
    
    draw(ctx) {
        if (this.isDead) return;
        
        ctx.save();
        
        // Use drawRadius for visual size
        const r = this.drawRadius;
        
        // Draw cat body (larger, more rounded)
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.ellipse(this.x, this.y + 3, r * 0.9, r * 0.85, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw cat head (distinct from body)
        ctx.beginPath();
        ctx.ellipse(this.x, this.y - r / 5, r * 0.7, r * 0.65, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw cat ears (larger, more prominent triangles)
        ctx.fillStyle = this.color;
        ctx.beginPath();
        // Left ear (outer)
        ctx.moveTo(this.x - r / 2, this.y - r / 3);
        ctx.lineTo(this.x - r / 2.5, this.y - r * 1.1);
        ctx.lineTo(this.x - r / 6, this.y - r / 2);
        ctx.fill();
        
        // Right ear (outer)
        ctx.beginPath();
        ctx.moveTo(this.x + r / 2, this.y - r / 3);
        ctx.lineTo(this.x + r / 2.5, this.y - r * 1.1);
        ctx.lineTo(this.x + r / 6, this.y - r / 2);
        ctx.fill();
        
        // Draw inner ears (pink/lighter color)
        if (!this.isFrightened) {
            ctx.fillStyle = 'rgba(255, 170, 170, 0.8)';
            ctx.beginPath();
            ctx.moveTo(this.x - r / 2.3, this.y - r / 2.5);
            ctx.lineTo(this.x - r / 2.5, this.y - r * 0.9);
            ctx.lineTo(this.x - r / 4, this.y - r / 2);
            ctx.fill();
            
            ctx.beginPath();
            ctx.moveTo(this.x + r / 2.3, this.y - r / 2.5);
            ctx.lineTo(this.x + r / 2.5, this.y - r * 0.9);
            ctx.lineTo(this.x + r / 4, this.y - r / 2);
            ctx.fill();
        }
        
        // Draw eyes with white background
        if (this.isFrightened) {
            // Scared eyes (smaller, worried look)
            ctx.fillStyle = '#fff';
            ctx.beginPath();
            ctx.arc(this.x - r / 3.5, this.y - r / 4, 4, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(this.x + r / 3.5, this.y - r / 4, 4, 0, Math.PI * 2);
            ctx.fill();
            
            // Small pupils
            ctx.fillStyle = GAME_CONFIG.COLORS.CAT_EYE;
            ctx.beginPath();
            ctx.arc(this.x - r / 3.5, this.y - r / 4, 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(this.x + r / 3.5, this.y - r / 4, 2, 0, Math.PI * 2);
            ctx.fill();
            
            // Draw scared mouth (frown)
            ctx.strokeStyle = GAME_CONFIG.COLORS.CAT_EYE;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(this.x, this.y + r / 5, r / 3, 0, Math.PI);
            ctx.stroke();
        } else {
            // Normal eyes (larger, with white and pupils)
            ctx.fillStyle = '#fff';
            ctx.beginPath();
            ctx.arc(this.x - r / 3.5, this.y - r / 4, 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(this.x + r / 3.5, this.y - r / 4, 5, 0, Math.PI * 2);
            ctx.fill();
            
            // Pupils (slightly offset for character)
            ctx.fillStyle = GAME_CONFIG.COLORS.CAT_EYE;
            ctx.beginPath();
            ctx.arc(this.x - r / 3.5 + 1, this.y - r / 4, 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(this.x + r / 3.5 + 1, this.y - r / 4, 3, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Draw nose (small triangle)
        ctx.fillStyle = this.isFrightened ? '#aaa' : '#000';
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - 2, this.y - 2);
        ctx.lineTo(this.x + 2, this.y - 2);
        ctx.closePath();
        ctx.fill();
        
        // Draw mouth (small curved lines)
        if (!this.isFrightened) {
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x - r / 5, this.y + r / 6);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x + r / 5, this.y + r / 6);
            ctx.stroke();
        }
        
        // Draw whiskers (3 on each side)
        ctx.strokeStyle = this.isFrightened ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.6)';
        ctx.lineWidth = 1;
        
        // Left whiskers
        ctx.beginPath();
        ctx.moveTo(this.x - r / 6, this.y - r / 8);
        ctx.lineTo(this.x - r * 1.1, this.y - r / 4);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(this.x - r / 6, this.y);
        ctx.lineTo(this.x - r * 1.1, this.y);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(this.x - r / 6, this.y + r / 8);
        ctx.lineTo(this.x - r * 1.1, this.y + r / 4);
        ctx.stroke();
        
        // Right whiskers
        ctx.beginPath();
        ctx.moveTo(this.x + r / 6, this.y - r / 8);
        ctx.lineTo(this.x + r * 1.1, this.y - r / 4);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(this.x + r / 6, this.y);
        ctx.lineTo(this.x + r * 1.1, this.y);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(this.x + r / 6, this.y + r / 8);
        ctx.lineTo(this.x + r * 1.1, this.y + r / 4);
        ctx.stroke();
        
        ctx.restore();
    }
}
