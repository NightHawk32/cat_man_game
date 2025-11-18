# Cat Man Game - Quick Start Guide 🐱

## What is Cat Man?

Cat Man is a browser-based game inspired by Pac-Man, where you play as a person trying to escape from orange cats. Collect power-ups to turn the tables and catch the cats!

## Quick Start (No Installation)

### Option 1: Open Directly in Browser
Simply navigate to:
```
c:\Users\bco7rt\Documents\cat_man_game\public\index.html
```
And double-click to open in your default browser!

---

## Game Controls

- **Arrow Keys**: Move Up, Down, Left, Right
- **Alternative**: W, A, S, D keys

---

## How to Play

### Objective
Collect all the yellow dots while avoiding the orange cats!

### Rules
1. **Avoid Orange Cats** 🧡 - They will chase you and cost you a life
2. **Collect Dots** 🟡 - Each dot = 10 points
3. **Grab Power-Ups** 💗 - Turn cats white for 8 seconds
4. **Chase White Cats** 🤍 - Catch them for 200 points each!
5. **3 Lives** ❤️❤️❤️ - Game over when you lose all lives
6. **Win** 🎉 - Collect all dots to advance to the next level

### Scoring
- Small Dot: 10 points
- Power-Up: 50 points
- Catching a Frightened Cat: 200 points

---

## Game Features

✅ **Classic Maze Gameplay** - Navigate through a Pac-Man inspired maze
✅ **AI Cat Enemies** - Cats chase you with intelligent pathfinding
✅ **Power-Up System** - Turn the tables on your pursuers
✅ **Progressive Levels** - Advance through levels as you clear the maze
✅ **Lives System** - Three chances to complete each level
✅ **Responsive Controls** - Smooth keyboard controls
✅ **Score Tracking** - Keep track of your high score

---

## Project Architecture

### Well-Structured Codebase

```
📁 public/
├── 📄 index.html          # Game UI and canvas
├── 📁 css/
│   └── 📄 styles.css      # Responsive styling
└── 📁 js/
    ├── 📄 constants.js    # Game configuration (easy to modify!)
    ├── 📄 game.js         # Main game loop & state management
    ├── 📄 player.js       # Player movement & rendering
    ├── 📄 cat.js          # AI enemy logic
    ├── 📄 powerup.js      # Power-up state management
    └── 📄 maze.js         # Level layout & collision detection
```

### Clean Code Principles

- **Object-Oriented Design**: Each game entity is its own class
- **Separation of Concerns**: Logic, rendering, and data are separated
- **Configurable**: All game settings in `constants.js`
- **Modular**: Easy to extend with new features
- **No Dependencies**: Pure vanilla JavaScript

---

## Customization

Want to modify the game? Edit `public/js/constants.js`:

```javascript
// Make the game easier or harder
PLAYER_SPEED: 2,        // Increase for faster movement
CAT_SPEED: 1.5,         // Decrease to slow down cats
NUMBER_OF_CATS: 4,      // Reduce for easier gameplay

// Adjust power-up duration
POWER_UP_DURATION: 8000, // Milliseconds (8 seconds)

// Change colors
COLORS: {
    PLAYER: '#ffff00',     // Yellow
    CAT_NORMAL: '#ff6600', // Orange
    CAT_FRIGHTENED: '#ffffff' // White
}
```

---

## Deployment Options

### For Testing (Local)
1. **Direct**: Open `public/index.html` in browser
2. **Python**: `python -m http.server 3000` in public folder
3. **Node.js**: `npm install && npm start` in root folder

### For Production (Cloud)
- **Netlify**: Drag & drop the `public` folder
- **Vercel**: Deploy via CLI or GitHub
- **GitHub Pages**: Push to GitHub and enable Pages
- **Azure Static Web Apps**: Deploy with Azure CLI

See `DEPLOYMENT.md` for detailed instructions!

---

## Technical Highlights

### Performance Optimized
- Canvas rendering for smooth 60 FPS gameplay
- Efficient collision detection
- Optimized AI pathfinding (updates every 10 frames)

### Browser Compatible
- Works on all modern browsers (Chrome, Firefox, Safari, Edge)
- No external dependencies required
- HTML5 Canvas API for graphics

### Mobile Ready
- Responsive design scales to different screen sizes
- Can be extended with touch controls for mobile devices

---

## File Size
Total project size: < 50 KB (extremely lightweight!)

---

## Future Enhancement Ideas

Want to extend the game? Consider adding:
- 🔊 Sound effects and background music
- 📱 Touch controls for mobile
- 🏆 High score leaderboard (with backend)
- 🎨 Different cat types with unique behaviors
- 🗺️ More level designs
- 💾 Save progress to localStorage
- 🎮 Game difficulty settings
- 🖼️ Sprite graphics instead of shapes

---

## Browser Developer Tools

Press **F12** to open developer console and:
- View any errors
- Inspect game state
- Modify game variables in real-time

---

## Support

If something doesn't work:
1. Check that all files are in the correct folders
2. Open browser console (F12) to see errors
3. Try a different browser
4. Make sure JavaScript is enabled

---

## Credits

Built with:
- HTML5 Canvas
- Vanilla JavaScript (ES6+)
- CSS3
- Express.js (optional, for local server)

Inspired by the classic Pac-Man arcade game 👾

---

Enjoy playing Cat Man! 🐱🎮
