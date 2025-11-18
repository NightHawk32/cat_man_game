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

This project is a static front-end (HTML/CSS/JS) contained in the `public/` folder, so GitHub Pages and other static hosts are a good fit.

Below are recommended ways to deploy the game and exact PowerShell commands you can run from the repository root on Windows.

### Option A — Quick: Publish using `docs/` on `main`

1. Copy `public/` into a `docs/` folder and push to `main` (simple, no CI needed):

```powershell
Remove-Item -Recurse -Force docs -ErrorAction SilentlyContinue
Copy-Item -Recurse -Force public docs
git add docs
git commit -m "Publish site via docs/ for GitHub Pages"
git push origin main
```

2. On GitHub: Settings → Pages → Source → select `main` branch and `/docs` folder.

This will serve the site at: https://<your-username>.github.io/<repo>/

Pros: extremely simple. No extra branches or Actions. Good for quick tests.

### Option B — Publish to `gh-pages` branch (manual, no npm)

Use this if you prefer a dedicated `gh-pages` branch.

```powershell
# Create a temporary folder, copy built files, and push as gh-pages
$tmp = Join-Path $env:TEMP "cat_man_game-ghpages"
Remove-Item -Recurse -Force $tmp -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Path $tmp | Out-Null
Copy-Item -Path (Join-Path (Get-Location) 'public\*') -Destination $tmp -Recurse -Force
Push-Location $tmp
git init
git checkout -b gh-pages
git remote add origin https://github.com/NightHawk32/cat_man_game.git
git add .
git commit -m "Publish site to gh-pages"
git push --force origin gh-pages
Pop-Location
Remove-Item -Recurse -Force $tmp
```

Then in GitHub Settings → Pages choose Branch: `gh-pages`, Folder: `/ (root)`.

Pros: keeps `main` clean; Pages serves from `gh-pages` root.

### Option C — Automated: GitHub Actions (recommended for CI)

Add a workflow that publishes `public/` to `gh-pages` when you push to `main`. Example workflow (place at `.github/workflows/deploy.yml`):

```yaml
name: Deploy to GitHub Pages

on:
   push:
      branches: [ main ]

jobs:
   deploy:
      runs-on: ubuntu-latest
      steps:
         - uses: actions/checkout@v4
         - name: Deploy
            uses: peaceiris/actions-gh-pages@v4
            with:
               github_token: ${{ secrets.GITHUB_TOKEN }}
               publish_dir: ./public
```

Commit that file to `main`. The Action will create/update the `gh-pages` branch automatically.

Pros: automatic on push, no local npm required.

### Option D — Use `gh-pages` npm package (if you have Node locally)

1. Install:
```powershell
npm install --save-dev gh-pages
```

2. Add script to `package.json`:

```json
"scripts": {
   "deploy": "gh-pages -d public"
}
```

3. Run:
```powershell
npm run deploy
```

This will publish `public/` to the `gh-pages` branch.

### Common troubleshooting

- You see the repository `README.md` instead of the game:
   - That means Pages is serving a branch/folder that contains only the README (e.g., `main` root). Make sure Pages is set to the branch/folder that actually contains `index.html` (either `main/docs` or `gh-pages` root).
   - Verify that `index.html` is at the root of the published branch (not nested inside a `public/` folder on that branch).

- 404 or missing assets:
   - Ensure asset paths in `index.html` and CSS are relative (e.g., `js/game.js`, `css/styles.css`) — do not start them with `/` which references the domain root.

- GitHub Actions didn't publish:
   - Check Actions → the workflow run logs for errors. Confirm `publish_dir` is correct (`./public`).

### Custom domain

If you want a custom domain, add a `CNAME` file to `public/` (or `docs/`) containing your domain name and configure DNS per GitHub Pages docs.

### Other static hosts

- Netlify: drag-and-drop `public/` or connect the Git repo and set the build/publish directory to `public`.
- Vercel: connect the Git repo and set output directory to `public` (or use their default static handling).
- Azure Static Web Apps: follow Azure docs and set the app artifact location to `public`.

If you need, I can add the GitHub Actions workflow file to this repository (I can already see a workflow was added) or I can copy the `public/` folder into `docs/` and commit so Pages can serve from `main/docs` immediately.


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
