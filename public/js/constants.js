// Game Constants and Configuration

const GAME_CONFIG = {
    // Canvas dimensions
    CANVAS_WIDTH: 800,
    CANVAS_HEIGHT: 600,
    
    // Grid configuration
    TILE_SIZE: 20,
    GRID_WIDTH: 40,  // 800 / 20
    GRID_HEIGHT: 30, // 600 / 20
    
    // Game speed
    FPS: 60,
    PLAYER_SPEED: 2,
    CAT_SPEED: 1.5,
    CAT_FRIGHTENED_SPEED: 1,
    
    // Power-up configuration
    POWER_UP_DURATION: 8000, // milliseconds
    POWER_UP_FLASH_TIME: 2000, // start flashing in last 2 seconds
    
    // Scoring
    SCORE_DOT: 10,
    SCORE_POWER_UP: 50,
    SCORE_CAT: 200,
    
    // Lives
    STARTING_LIVES: 3,
    
    // Cat behavior
    NUMBER_OF_CATS: 4,
    CAT_RESPAWN_DELAY: 3000,
    
    // Colors
    COLORS: {
        WALL: '#2222ff',
        DOT: '#ffff00',
        POWER_UP: '#ff1493',
        PLAYER: '#ffff00',
        CAT_NORMAL: '#ff6600',
        CAT_FRIGHTENED: '#ffffff',
        CAT_EYE: '#000000',
        BACKGROUND: '#000000',
        PATH: '#000033'
    }
};

// Direction constants
const DIRECTION = {
    UP: { x: 0, y: -1, name: 'UP' },
    DOWN: { x: 0, y: 1, name: 'DOWN' },
    LEFT: { x: -1, y: 0, name: 'LEFT' },
    RIGHT: { x: 1, y: 0, name: 'RIGHT' },
    NONE: { x: 0, y: 0, name: 'NONE' }
};

// Key codes
const KEYS = {
    UP: 'ArrowUp',
    DOWN: 'ArrowDown',
    LEFT: 'ArrowLeft',
    RIGHT: 'ArrowRight',
    W: 'KeyW',
    A: 'KeyA',
    S: 'KeyS',
    D: 'KeyD'
};

// Game states
const GAME_STATE = {
    START: 'START',
    PLAYING: 'PLAYING',
    PAUSED: 'PAUSED',
    GAME_OVER: 'GAME_OVER',
    LEVEL_COMPLETE: 'LEVEL_COMPLETE'
};
