# Customizing Player and Cat Shapes

This guide shows you how to edit the visual appearance of the player and cats in Cat Man.

---

## 📍 Where to Edit

- **Player Shape**: `public/js/player.js` - Line 89-119 (the `draw()` method)
- **Cat Shape**: `public/js/cat.js` - Line 180-242 (the `draw()` method)

---

## 🎨 Player Shape Customization

### Current Player Design
The player is drawn as a Pac-Man style circle with:
- Animated mouth that opens/closes
- A single eye
- Rotates based on movement direction

### Example 1: Change to a Square Player

Replace the `draw()` method in `player.js` with:

```javascript
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
    
    // Draw player as a square
    ctx.fillStyle = GAME_CONFIG.COLORS.PLAYER;
    ctx.fillRect(-this.radius, -this.radius, this.radius * 2, this.radius * 2);
    
    // Draw eyes
    ctx.fillStyle = '#000';
    ctx.fillRect(this.radius / 3, -this.radius / 2, 3, 3);
    ctx.fillRect(this.radius / 3, this.radius / 2 - 3, 3, 3);
    
    ctx.restore();
}
```

### Example 2: Person/Smiley Face

```javascript
draw(ctx) {
    ctx.save();
    
    // Draw head (circle)
    ctx.fillStyle = GAME_CONFIG.COLORS.PLAYER;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw eyes
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(this.x - this.radius / 3, this.y - this.radius / 4, 2, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(this.x + this.radius / 3, this.y - this.radius / 4, 2, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw smile
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(this.x, this.y + this.radius / 4, this.radius / 2, 0, Math.PI);
    ctx.stroke();
    
    ctx.restore();
}
```

### Example 3: Triangle/Arrow Shape

```javascript
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
    
    // Draw triangle pointing right
    ctx.fillStyle = GAME_CONFIG.COLORS.PLAYER;
    ctx.beginPath();
    ctx.moveTo(this.radius, 0);  // Point
    ctx.lineTo(-this.radius, -this.radius);  // Top left
    ctx.lineTo(-this.radius, this.radius);   // Bottom left
    ctx.closePath();
    ctx.fill();
    
    // Draw eye
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(0, -this.radius / 3, 2, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
}
```

### Example 4: Diamond Shape

```javascript
draw(ctx) {
    ctx.save();
    
    // Draw diamond
    ctx.fillStyle = GAME_CONFIG.COLORS.PLAYER;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y - this.radius);      // Top
    ctx.lineTo(this.x + this.radius, this.y);      // Right
    ctx.lineTo(this.x, this.y + this.radius);      // Bottom
    ctx.lineTo(this.x - this.radius, this.y);      // Left
    ctx.closePath();
    ctx.fill();
    
    // Draw eyes
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(this.x - this.radius / 4, this.y - this.radius / 4, 2, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(this.x + this.radius / 4, this.y - this.radius / 4, 2, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
}
```

---

## 🐱 Cat Shape Customization

### Current Cat Design
Cats are drawn with:
- Oval body
- Triangle ears
- Eyes (normal or scared)
- Mouth (when frightened)

### Example 1: Ghost Style (Like Pac-Man Ghosts)

Replace the `draw()` method in `cat.js` with:

```javascript
draw(ctx) {
    if (this.isDead) return;
    
    ctx.save();
    
    // Draw ghost body (half circle + wavy bottom)
    ctx.fillStyle = this.color;
    ctx.beginPath();
    
    // Top half circle
    ctx.arc(this.x, this.y, this.radius, Math.PI, 0);
    
    // Wavy bottom
    const waveHeight = this.radius / 3;
    const waveWidth = this.radius / 2;
    ctx.lineTo(this.x + this.radius, this.y);
    ctx.lineTo(this.x + this.radius / 2, this.y + waveHeight);
    ctx.lineTo(this.x, this.y);
    ctx.lineTo(this.x - this.radius / 2, this.y + waveHeight);
    ctx.lineTo(this.x - this.radius, this.y);
    
    ctx.closePath();
    ctx.fill();
    
    // Draw eyes
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(this.x - this.radius / 3, this.y - this.radius / 4, 4, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(this.x + this.radius / 3, this.y - this.radius / 4, 4, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw pupils
    ctx.fillStyle = GAME_CONFIG.COLORS.CAT_EYE;
    ctx.beginPath();
    ctx.arc(this.x - this.radius / 3, this.y - this.radius / 4, 2, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(this.x + this.radius / 3, this.y - this.radius / 4, 2, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
}
```

### Example 2: Simple Square Cats

```javascript
draw(ctx) {
    if (this.isDead) return;
    
    ctx.save();
    
    // Draw square body
    ctx.fillStyle = this.color;
    ctx.fillRect(
        this.x - this.radius,
        this.y - this.radius,
        this.radius * 2,
        this.radius * 2
    );
    
    // Draw ears (small squares on top)
    ctx.fillRect(
        this.x - this.radius + 2,
        this.y - this.radius - 4,
        4, 4
    );
    ctx.fillRect(
        this.x + this.radius - 6,
        this.y - this.radius - 4,
        4, 4
    );
    
    // Draw eyes
    ctx.fillStyle = GAME_CONFIG.COLORS.CAT_EYE;
    ctx.fillRect(this.x - this.radius / 2, this.y - this.radius / 3, 3, 3);
    ctx.fillRect(this.x + this.radius / 2 - 3, this.y - this.radius / 3, 3, 3);
    
    ctx.restore();
}
```

### Example 3: More Detailed Cat

```javascript
draw(ctx) {
    if (this.isDead) return;
    
    ctx.save();
    
    // Draw cat body (larger oval)
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.ellipse(this.x, this.y + 2, this.radius, this.radius - 2, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw cat ears (pointed triangles)
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(this.x - this.radius / 2, this.y - this.radius / 2);
    ctx.lineTo(this.x - this.radius / 3, this.y - this.radius);
    ctx.lineTo(this.x - this.radius / 6, this.y - this.radius / 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.moveTo(this.x + this.radius / 2, this.y - this.radius / 2);
    ctx.lineTo(this.x + this.radius / 3, this.y - this.radius);
    ctx.lineTo(this.x + this.radius / 6, this.y - this.radius / 2);
    ctx.fill();
    
    // Draw inner ears (pink)
    ctx.fillStyle = '#ffaaaa';
    ctx.beginPath();
    ctx.moveTo(this.x - this.radius / 2.5, this.y - this.radius / 2);
    ctx.lineTo(this.x - this.radius / 3, this.y - this.radius * 0.8);
    ctx.lineTo(this.x - this.radius / 5, this.y - this.radius / 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.moveTo(this.x + this.radius / 2.5, this.y - this.radius / 2);
    ctx.lineTo(this.x + this.radius / 3, this.y - this.radius * 0.8);
    ctx.lineTo(this.x + this.radius / 5, this.y - this.radius / 2);
    ctx.fill();
    
    // Draw eyes
    ctx.fillStyle = GAME_CONFIG.COLORS.CAT_EYE;
    if (this.isFrightened) {
        // Scared eyes
        ctx.beginPath();
        ctx.arc(this.x - this.radius / 3, this.y - this.radius / 4, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(this.x + this.radius / 3, this.y - this.radius / 4, 2, 0, Math.PI * 2);
        ctx.fill();
    } else {
        // Normal eyes (with white background)
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(this.x - this.radius / 3, this.y - this.radius / 4, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(this.x + this.radius / 3, this.y - this.radius / 4, 4, 0, Math.PI * 2);
        ctx.fill();
        
        // Pupils
        ctx.fillStyle = GAME_CONFIG.COLORS.CAT_EYE;
        ctx.beginPath();
        ctx.arc(this.x - this.radius / 3, this.y - this.radius / 4, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(this.x + this.radius / 3, this.y - this.radius / 4, 2, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Draw nose
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw whiskers
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;
    // Left whiskers
    ctx.beginPath();
    ctx.moveTo(this.x - this.radius / 4, this.y);
    ctx.lineTo(this.x - this.radius, this.y - 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(this.x - this.radius / 4, this.y + 2);
    ctx.lineTo(this.x - this.radius, this.y + 4);
    ctx.stroke();
    // Right whiskers
    ctx.beginPath();
    ctx.moveTo(this.x + this.radius / 4, this.y);
    ctx.lineTo(this.x + this.radius, this.y - 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(this.x + this.radius / 4, this.y + 2);
    ctx.lineTo(this.x + this.radius, this.y + 4);
    ctx.stroke();
    
    ctx.restore();
}
```

---

## 🎨 Canvas Drawing Basics

### Common Shapes

**Circle:**
```javascript
ctx.beginPath();
ctx.arc(x, y, radius, 0, Math.PI * 2);
ctx.fill(); // or ctx.stroke();
```

**Rectangle:**
```javascript
ctx.fillRect(x, y, width, height);
```

**Triangle:**
```javascript
ctx.beginPath();
ctx.moveTo(x1, y1);
ctx.lineTo(x2, y2);
ctx.lineTo(x3, y3);
ctx.closePath();
ctx.fill();
```

**Ellipse:**
```javascript
ctx.beginPath();
ctx.ellipse(x, y, radiusX, radiusY, rotation, 0, Math.PI * 2);
ctx.fill();
```

**Line:**
```javascript
ctx.beginPath();
ctx.moveTo(x1, y1);
ctx.lineTo(x2, y2);
ctx.stroke();
```

### Styling

**Fill Color:**
```javascript
ctx.fillStyle = '#ff6600';  // Hex color
ctx.fillStyle = 'rgb(255, 102, 0)';  // RGB
ctx.fillStyle = 'rgba(255, 102, 0, 0.5)';  // RGBA (with transparency)
```

**Stroke (Outline):**
```javascript
ctx.strokeStyle = '#000';
ctx.lineWidth = 2;
ctx.stroke();
```

**Gradient:**
```javascript
const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
gradient.addColorStop(0, '#ff0000');
gradient.addColorStop(1, '#0000ff');
ctx.fillStyle = gradient;
```

---

## 💡 Pro Tips

1. **Use `this.radius`** - This is the size of the entity, already calculated
2. **Center is `(this.x, this.y)`** - Draw relative to this point
3. **Use `ctx.save()` and `ctx.restore()`** - This preserves your drawing state
4. **Test incrementally** - Change one thing at a time and refresh to see results
5. **Keep it simple** - Complex shapes can impact performance with many entities

---

## 🧪 Testing Your Changes

1. Edit the `draw()` method in `player.js` or `cat.js`
2. Save the file
3. Refresh your browser (or open `public/index.html` again)
4. See your changes immediately!

---

## 🎨 Color Customization

Don't forget you can also change colors in `public/js/constants.js`:

```javascript
COLORS: {
    PLAYER: '#ffff00',          // Player color
    CAT_NORMAL: '#ff6600',      // Normal cat color
    CAT_FRIGHTENED: '#ffffff',  // Frightened cat color
    CAT_EYE: '#000000'         // Cat eye color
}
```

---

## 📚 Resources

- [MDN Canvas Tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial)
- [Canvas Drawing Shapes](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes)
- [Canvas Styling](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Applying_styles_and_colors)

---

Happy customizing! 🎮✨
