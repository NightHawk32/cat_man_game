// Main Game class - Controls game loop and state

class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Set canvas size
        this.canvas.width = GAME_CONFIG.CANVAS_WIDTH;
        this.canvas.height = GAME_CONFIG.CANVAS_HEIGHT;
        
        // Game state
        this.state = GAME_STATE.START;
        this.score = 0;
        this.level = 1;
        this.lives = GAME_CONFIG.STARTING_LIVES;
        
        // Game objects
        this.maze = null;
        this.player = null;
        this.cats = [];
        this.powerUp = new PowerUp();
        
        // UI elements
        this.scoreElement = document.getElementById('score');
        this.levelElement = document.getElementById('level');
        this.livesElement = document.getElementById('lives');
        this.startScreen = document.getElementById('startScreen');
        this.gameOverScreen = document.getElementById('gameOverScreen');
        this.levelCompleteScreen = document.getElementById('levelCompleteScreen');
        
        // Buttons
        this.startButton = document.getElementById('startButton');
        this.restartButton = document.getElementById('restartButton');
        this.nextLevelButton = document.getElementById('nextLevelButton');
        
        // Input handling
        this.keys = {};
        
        // Animation frame
        this.lastTime = 0;
        this.animationId = null;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setupLevel();
    }
    
    setupEventListeners() {
        // Keyboard input
        window.addEventListener('keydown', (e) => {
            if ([KEYS.UP, KEYS.DOWN, KEYS.LEFT, KEYS.RIGHT].includes(e.code)) {
                e.preventDefault();
            }
            this.keys[e.code] = true;
            this.handleInput(e.code);
        });
        
        window.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
        });
        
        // Button clicks
        this.startButton.addEventListener('click', () => this.startGame());
        this.restartButton.addEventListener('click', () => this.restartGame());
        this.nextLevelButton.addEventListener('click', () => this.nextLevel());
    }
    
    handleInput(keyCode) {
        if (this.state !== GAME_STATE.PLAYING) return;
        
        switch (keyCode) {
            case KEYS.UP:
            case 'KeyW':
                this.player.setDirection(DIRECTION.UP);
                break;
            case KEYS.DOWN:
            case 'KeyS':
                this.player.setDirection(DIRECTION.DOWN);
                break;
            case KEYS.LEFT:
            case 'KeyA':
                this.player.setDirection(DIRECTION.LEFT);
                break;
            case KEYS.RIGHT:
            case 'KeyD':
                this.player.setDirection(DIRECTION.RIGHT);
                break;
        }
    }
    
    setupLevel() {
        // Create maze
        this.maze = new Maze(this.level);
        
        // Create player
        const playerSpawn = this.maze.getPlayerSpawn();
        this.player = new Player(playerSpawn.x, playerSpawn.y, this.maze);
        
        // Create cats
        this.cats = [];
        const catSpawns = this.maze.getCatSpawns();
        const catColors = [
            GAME_CONFIG.COLORS.CAT_NORMAL,
            '#ff8800',
            '#ff4400',
            '#ffaa00'
        ];
        
        for (let i = 0; i < GAME_CONFIG.NUMBER_OF_CATS && i < catSpawns.length; i++) {
            const spawn = catSpawns[i];
            const color = catColors[i % catColors.length];
            this.cats.push(new Cat(spawn.x, spawn.y, this.maze, color));
        }
        
        // Reset power-up
        this.powerUp.reset();
    }
    
    startGame() {
        this.state = GAME_STATE.PLAYING;
        this.startScreen.classList.add('hidden');
        this.gameLoop();
    }
    
    restartGame() {
        this.score = 0;
        this.level = 1;
        this.lives = GAME_CONFIG.STARTING_LIVES;
        this.gameOverScreen.classList.add('hidden');
        this.setupLevel();
        this.updateUI();
        this.startGame();
    }
    
    nextLevel() {
        this.level++;
        this.levelCompleteScreen.classList.add('hidden');
        this.setupLevel();
        this.updateUI();
        this.startGame();
    }
    
    gameLoop(timestamp = 0) {
        if (this.state !== GAME_STATE.PLAYING) return;
        
        const deltaTime = timestamp - this.lastTime;
        this.lastTime = timestamp;
        
        this.update();
        this.render();
        
        this.animationId = requestAnimationFrame((t) => this.gameLoop(t));
    }
    
    update() {
        // Update player
        this.player.update();
        
        // Check dot collection
        if (this.maze.collectDot(this.player.x, this.player.y)) {
            this.score += GAME_CONFIG.SCORE_DOT;
            this.updateUI();
        }
        
        // Check power-up collection
        if (this.maze.collectPowerUp(this.player.x, this.player.y)) {
            this.score += GAME_CONFIG.SCORE_POWER_UP;
            this.powerUp.activate();
            this.cats.forEach(cat => cat.setFrightened(true));
            this.updateUI();
        }
        
        // Update power-up
        if (this.powerUp.update() === false) {
            // Power-up expired
            this.cats.forEach(cat => cat.setFrightened(false));
        }
        
        // Update cats
        this.cats.forEach(cat => {
            cat.update(this.player);
            
            // Check collision with player
            if (cat.checkCollision(this.player)) {
                if (cat.isFrightened) {
                    // Player catches cat
                    this.score += GAME_CONFIG.SCORE_CAT;
                    cat.die();
                    this.updateUI();
                    
                    // Respawn cat after delay
                    setTimeout(() => {
                        cat.respawn();
                        cat.setFrightened(this.powerUp.active);
                    }, GAME_CONFIG.CAT_RESPAWN_DELAY);
                } else {
                    // Player gets caught
                    this.loseLife();
                }
            }
        });
        
        // Check win condition
        if (this.maze.getRemainingDots() === 0) {
            this.levelComplete();
        }
    }
    
    render() {
        // Clear canvas
        this.ctx.fillStyle = GAME_CONFIG.COLORS.BACKGROUND;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw game objects
        this.maze.draw(this.ctx);
        this.player.draw(this.ctx);
        this.cats.forEach(cat => cat.draw(this.ctx));
        
        // Draw power-up indicator
        if (this.powerUp.active) {
            const remaining = Math.ceil(this.powerUp.getRemainingTime() / 1000);
            this.ctx.fillStyle = '#fff';
            this.ctx.font = 'bold 16px Arial';
            this.ctx.fillText(`Power-up: ${remaining}s`, 10, 20);
        }
    }
    
    loseLife() {
        this.lives--;
        this.updateUI();
        
        if (this.lives <= 0) {
            this.gameOver();
        } else {
            // Reset positions
            const playerSpawn = this.maze.getPlayerSpawn();
            this.player.reset(playerSpawn.x, playerSpawn.y);
            this.cats.forEach(cat => cat.reset());
            this.powerUp.reset();
        }
    }
    
    levelComplete() {
        this.state = GAME_STATE.LEVEL_COMPLETE;
        this.levelCompleteScreen.classList.remove('hidden');
        document.getElementById('levelScore').textContent = this.score;
        cancelAnimationFrame(this.animationId);
    }
    
    gameOver() {
        this.state = GAME_STATE.GAME_OVER;
        this.gameOverScreen.classList.remove('hidden');
        document.getElementById('finalScore').textContent = this.score;
        cancelAnimationFrame(this.animationId);
    }
    
    updateUI() {
        this.scoreElement.textContent = this.score;
        this.levelElement.textContent = this.level;
        
        // Update lives display
        const hearts = '❤️'.repeat(this.lives);
        this.livesElement.textContent = hearts || '💀';
    }
}

// Initialize game when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const game = new Game();
});
