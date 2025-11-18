# Cat Man Game - Code Architecture

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         index.html                          │
│                    (Main HTML Structure)                    │
│  - Canvas element for game rendering                       │
│  - UI elements (score, lives, level)                       │
│  - Overlay screens (start, game over, level complete)      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                       styles.css                            │
│                   (Visual Presentation)                     │
│  - Responsive layout                                        │
│  - Button styling                                           │
│  - Overlay designs                                          │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      constants.js                           │
│                   (Configuration Layer)                     │
│  - Game settings (speed, scoring, colors)                  │
│  - Direction enums                                          │
│  - Key mappings                                             │
│  - Game state constants                                     │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                         game.js                             │
│                   (Main Game Controller)                    │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Game Loop (60 FPS)                                 │   │
│  │  - Update all entities                              │   │
│  │  - Check collisions                                 │   │
│  │  - Render frame                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  State Management                                   │   │
│  │  - START, PLAYING, PAUSED, GAME_OVER, LEVEL_COMPLETE│  │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Input Handling                                     │   │
│  │  - Keyboard events                                  │   │
│  │  - Button clicks                                    │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
         │              │              │              │
         ▼              ▼              ▼              ▼
┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐
│  maze.js   │  │ player.js  │  │   cat.js   │  │ powerup.js │
├────────────┤  ├────────────┤  ├────────────┤  ├────────────┤
│            │  │            │  │            │  │            │
│ Maze Class │  │   Player   │  │ Cat Class  │  │  PowerUp   │
│            │  │   Class    │  │            │  │   Class    │
└────────────┘  └────────────┘  └────────────┘  └────────────┘
```

---

## Class Hierarchy and Relationships

```
                    ┌──────────────┐
                    │  Game Class  │
                    │  (game.js)   │
                    └──────────────┘
                           │
                           │ creates & manages
                           │
         ┌─────────────────┼─────────────────┐
         │                 │                 │
         ▼                 ▼                 ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ Maze Class   │  │ Player Class │  │  PowerUp     │
│ (maze.js)    │  │ (player.js)  │  │  Class       │
└──────────────┘  └──────────────┘  │ (powerup.js) │
         │                 │         └──────────────┘
         │                 │                 │
         │ provides to     │ affects         │ controls
         │                 │                 │
         └────────┬────────┴─────────────────┘
                  │
                  ▼
         ┌──────────────┐
         │  Cat Class   │
         │  (cat.js)    │
         │              │
         │ - Cat 1      │
         │ - Cat 2      │
         │ - Cat 3      │
         │ - Cat 4      │
         └──────────────┘
```

---

## Data Flow

```
User Input (Keyboard)
         │
         ▼
    Game.handleInput()
         │
         ▼
    Player.setDirection()
         │
         ▼
    Player.update()
         │
         ├─────────────────────┐
         │                     │
         ▼                     ▼
    Maze.canMoveTo()      Maze.collectDot()
         │                     │
         ▼                     ▼
    Player.x, y          Score Update
         │                     │
         ▼                     │
    Cat.update()               │
         │                     │
         ├─────────────────────┘
         │
         ▼
    Collision Detection
         │
         ├─────────────────────┬─────────────────────┐
         │                     │                     │
         ▼                     ▼                     ▼
    Player vs Cat       Player vs Dot       Player vs PowerUp
         │                     │                     │
         ▼                     ▼                     ▼
    Life Lost/           Score += 10         PowerUp.activate()
    Cat Caught                                      │
                                                    ▼
                                            Cats.setFrightened()
```

---

## Module Dependencies

```
constants.js
    └── Used by all modules (no dependencies)

maze.js
    ├── Depends on: constants.js
    └── Used by: game.js, player.js, cat.js

player.js
    ├── Depends on: constants.js, maze.js
    └── Used by: game.js

cat.js
    ├── Depends on: constants.js, maze.js
    └── Used by: game.js

powerup.js
    ├── Depends on: constants.js
    └── Used by: game.js

game.js
    ├── Depends on: constants.js, maze.js, player.js, cat.js, powerup.js
    └── Main entry point (depends on all modules)
```

---

## Key Methods by Class

### Game Class (game.js)
```
Constructor:
- init()
- setupEventListeners()
- setupLevel()

Game Loop:
- gameLoop()
- update()
- render()

State Management:
- startGame()
- restartGame()
- nextLevel()
- gameOver()
- levelComplete()
- loseLife()

Helpers:
- handleInput()
- updateUI()
```

### Maze Class (maze.js)
```
Initialization:
- constructor(level)
- generateMazeLayout()
- initialize()

Collision:
- getTile(x, y)
- isWall(x, y)
- canMoveTo(x, y)

Spawning:
- getPlayerSpawn()
- getCatSpawns()

Collectibles:
- collectDot(x, y)
- collectPowerUp(x, y)
- getRemainingDots()

Rendering:
- draw(ctx)
```

### Player Class (player.js)
```
Movement:
- setDirection(direction)
- update()
- canMove(x, y)

Helpers:
- getGridPosition()
- reset(x, y)

Rendering:
- draw(ctx)
```

### Cat Class (cat.js)
```
AI:
- update(player)
- updateDirection(player)
- getDistanceToPlayer(player)

State:
- setFrightened(frightened)
- die()
- respawn()
- reset()

Collision:
- canMove(x, y)
- checkCollision(player)

Rendering:
- draw(ctx)
```

### PowerUp Class (powerup.js)
```
State Management:
- activate()
- deactivate()
- update()
- reset()

Helpers:
- isFlashing()
- getRemainingTime()
```

---

## Event Flow

```
Page Load
    │
    ▼
DOM Content Loaded
    │
    ▼
new Game()
    │
    ├─── Setup Canvas
    ├─── Setup Event Listeners
    ├─── Setup Level
    └─── Show Start Screen
         │
         ▼
    User Clicks "Start"
         │
         ▼
    startGame()
         │
         ▼
    Game Loop (requestAnimationFrame)
         │
         ├─── update()
         │     ├─── Player.update()
         │     ├─── Cat.update() × 4
         │     ├─── Check Collisions
         │     ├─── Check Win/Loss
         │     └─── Update UI
         │
         ├─── render()
         │     ├─── Clear Canvas
         │     ├─── Maze.draw()
         │     ├─── Player.draw()
         │     └─── Cat.draw() × 4
         │
         └─── Loop continues until game state changes
```

---

## Rendering Pipeline

```
Canvas (800x600)
    │
    ▼
Clear Frame (Black background)
    │
    ▼
Draw Maze
    ├─── Draw Walls (Blue rectangles)
    ├─── Draw Dots (Yellow circles)
    └─── Draw Power-ups (Pink circles)
    │
    ▼
Draw Player
    └─── Pac-Man style circle with animated mouth
    │
    ▼
Draw Cats (×4)
    ├─── Body (Rounded shape)
    ├─── Ears (Triangles)
    └─── Eyes & Face
    │
    ▼
Draw UI Overlays
    └─── Power-up timer (if active)
```

---

## Collision Detection Algorithm

```
Player Movement:
    1. Get next position based on direction
    2. Check 4 corners of player hitbox
    3. For each corner:
        - Convert to grid coordinates
        - Check if maze tile is wall
    4. If any corner hits wall, block movement
    5. Otherwise, allow movement

Cat Collision:
    1. Calculate distance between player and cat
    2. If distance < (player radius + cat radius)
        - Collision detected
        - Check cat state (normal or frightened)
        - Handle accordingly

Collectible Detection:
    1. For each dot/power-up:
        - Calculate distance to player
        - If distance < tile size / 2
            - Mark as collected
            - Update score
```

---

## AI Pathfinding (Cat Behavior)

```
Normal Mode (Chasing):
    1. Get all possible directions (up, down, left, right)
    2. Filter out directions that lead to walls
    3. Filter out reverse direction (to prevent oscillation)
    4. For each valid direction:
        - Calculate distance to player
    5. Choose direction that minimizes distance to player

Frightened Mode (Fleeing):
    1. Get all possible directions
    2. Filter out directions that lead to walls
    3. For each valid direction:
        - Calculate distance to player
    4. Choose direction that maximizes distance from player
    5. If no better direction, choose randomly
```

---

## Performance Optimizations

1. **AI Update Throttling**
   - Cats update AI every 10 frames instead of every frame
   - Reduces CPU usage while maintaining good gameplay

2. **Canvas Rendering**
   - Single canvas element
   - Efficient shape drawing (circles, rectangles)
   - No sprite loading/processing

3. **Collision Detection**
   - Simple distance calculations
   - Grid-based wall detection
   - No complex physics simulation

4. **Memory Management**
   - Reuse game objects between levels
   - No dynamic object creation during gameplay
   - Efficient array filtering

---

This architecture ensures:
- ✅ Maintainability
- ✅ Extensibility
- ✅ Performance
- ✅ Clean code
- ✅ Easy debugging
