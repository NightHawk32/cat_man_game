# Deployment Guide for Cat Man Game

## Option 1: Quick Local Testing (No Installation Required)

Since the game is built with vanilla JavaScript, you can run it directly:

### Method 1: Open HTML File Directly
1. Navigate to: `c:\Users\bco7rt\Documents\cat_man_game\public\`
2. Double-click `index.html`
3. The game will open in your default browser

**Note:** Some browsers may have CORS restrictions when opening local files. If you experience issues, use one of the server methods below.

### Method 2: Python Simple Server (If Python is installed)
```bash
cd c:\Users\bco7rt\Documents\cat_man_game\public
python -m http.server 3000
```
Then open: http://localhost:3000

### Method 3: Node.js Express Server (After installing Node.js)
1. Install Node.js from: https://nodejs.org/
2. In the project root directory:
```bash
npm install
npm start
```
3. Open: http://localhost:3000

---

## Option 2: Deploy to Cloud (Free Hosting)

### A. Netlify (Recommended - Easiest)

1. **Via Drag & Drop:**
   - Go to https://app.netlify.com/drop
   - Drag the entire `public` folder onto the page
   - Your game is live! You'll get a URL like: `https://random-name.netlify.app`

2. **Via Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   cd c:\Users\bco7rt\Documents\cat_man_game
   netlify deploy --prod --dir=public
   ```

### B. Vercel

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   cd c:\Users\bco7rt\Documents\cat_man_game
   vercel --prod
   ```

### C. GitHub Pages

1. Create a new GitHub repository
2. Push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Cat Man game"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/cat-man-game.git
   git push -u origin main
   ```

3. Enable GitHub Pages:
   - Go to repository Settings → Pages
   - Source: Deploy from branch `main`
   - Folder: Select `/(root)` or `/public` (you may need to move files)
   - Save and wait a few minutes
   - Your game will be at: `https://YOUR_USERNAME.github.io/cat-man-game/`

### D. Azure Static Web Apps

1. Install Azure CLI: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli

2. Login to Azure:
   ```bash
   az login
   ```

3. Create a Static Web App:
   ```bash
   az staticwebapp create \
     --name cat-man-game \
     --resource-group YOUR_RESOURCE_GROUP \
     --source https://github.com/YOUR_USERNAME/cat-man-game \
     --location "eastus2" \
     --branch main \
     --app-location "public" \
     --login-with-github
   ```

---

## Option 3: Deploy with Node.js Server

For platforms that support Node.js (Heroku, Railway, Render, Azure App Service):

### Heroku
```bash
# Install Heroku CLI: https://devcenter.heroku.com/articles/heroku-cli
heroku login
heroku create cat-man-game
git push heroku main
```

### Railway
1. Go to https://railway.app/
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Railway will auto-detect and deploy

### Render
1. Go to https://render.com/
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Build Command: `npm install`
5. Start Command: `npm start`
6. Click "Create Web Service"

---

## Project Structure

```
cat_man_game/
├── public/               # Static files (deploy this folder)
│   ├── index.html       # Main HTML file
│   ├── css/
│   │   └── styles.css   # Game styling
│   └── js/
│       ├── constants.js # Configuration
│       ├── game.js      # Main game loop
│       ├── player.js    # Player class
│       ├── cat.js       # Cat enemy class
│       ├── powerup.js   # Power-up class
│       └── maze.js      # Maze/level class
├── server.js            # Express server (optional)
├── package.json         # Dependencies
└── README.md           # Documentation
```

---

## Configuration

To modify game settings, edit `public/js/constants.js`:

- **Speed:** Adjust `PLAYER_SPEED` and `CAT_SPEED`
- **Difficulty:** Change `NUMBER_OF_CATS`
- **Power-up duration:** Modify `POWER_UP_DURATION`
- **Colors:** Customize in `COLORS` object

---

## Troubleshooting

**Game doesn't load:**
- Check browser console for errors (F12)
- Ensure all JavaScript files are loaded
- Try a different browser

**Cats don't move:**
- Refresh the page
- Check that the maze layout is valid

**Performance issues:**
- Reduce `NUMBER_OF_CATS` in constants.js
- Increase `aiUpdate` value in cat.js

---

## Next Steps

1. ✅ Game is complete and ready to play
2. 🚀 Choose a deployment method above
3. 🎮 Test the game locally first
4. 🌐 Deploy to your preferred platform
5. 📱 Share your game URL!

Enjoy your Cat Man game! 🐱
