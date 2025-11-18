# Cat Man Game 🐱

A Pac-Man style browser game where you play as a person escaping from orange cats. Collect power-ups to turn the cats white and catch them!

## Features

- Classic Pac-Man style gameplay
- Player character escaping from orange cats
- Power-ups that allow you to catch the cats
- Maze-based level design
- Score tracking
- Lives system

## Project Structure

```
cat_man_game/
├── public/
│   ├── index.html          # Main HTML file
│   ├── css/
│   │   └── styles.css      # Game styling
│   └── js/
│       ├── game.js         # Main game logic
│       ├── player.js       # Player class
│       ├── cat.js          # Cat enemy class
│       ├── powerup.js      # Power-up class
│       ├── maze.js         # Maze/level class
│       └── constants.js    # Game constants and config
├── server.js               # Express server for local testing
├── package.json            # Project dependencies
└── README.md              # This file
```

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the local server:
   ```bash
   npm start
   ```

3. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## How to Play

- **Arrow Keys**: Move the player (up, down, left, right)
- **Objective**: Collect all the dots while avoiding the orange cats
- **Power-Ups**: Collect power-ups to turn cats white and catch them for bonus points
- **Lives**: You have 3 lives. Lose a life when caught by an orange cat
- **Win**: Collect all dots to advance to the next level

## Deployment

### Option 1: Static Hosting (Recommended)

Deploy to platforms like:
- **Netlify**: Drag and drop the `public/` folder
- **Vercel**: Connect your Git repository
- **GitHub Pages**: Push to GitHub and enable Pages
- **Azure Static Web Apps**: Deploy using Azure CLI

### Option 2: Node.js Hosting

Deploy to platforms that support Node.js:
- **Heroku**
- **Railway**
- **Render**
- **Azure App Service**

Make sure to set the correct port in your deployment settings.

## Technologies Used

- HTML5 Canvas for rendering
- Vanilla JavaScript (ES6+)
- CSS3 for styling
- Express.js for local development server

## Future Enhancements

- Multiple levels with increasing difficulty
- Sound effects and background music
- High score leaderboard
- Mobile touch controls
- Different cat types with unique behaviors
- Animated sprites
