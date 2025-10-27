// linear interpolation between red and black
function lerpColor(a, b, t) {
    return [
        Math.round(a[0] + (b[0] - a[0]) * t),
        Math.round(a[1] + (b[1] - a[1]) * t),
        Math.round(a[2] + (b[2] - a[2]) * t)
    ];
}

// slowly changes to darker 
const colorStops = [
  [250, 0, 0],     // Bright red
  [150, 0, 0],     // Dark red
  [130, 0, 0],      // Very dark red
  [120, 0, 0],      // Near black with red tint
  [110, 0, 0],         // Black
];



//  number of rectangles to draw
const numRects = 20; 
const canvas = document.getElementById('gradientCanvas');
const ctx = canvas.getContext('2d');
const rectWidth = canvas.width / numRects;
const rectHeight = canvas.height;


for (let i = 0; i < numRects; i++) {
    // find which two color stops to interpolate between
    const t = i / (numRects - 1);
    const stop = t * (colorStops.length - 1);
    const idx = Math.floor(stop);
    const localT = stop - idx;
    const colorA = colorStops[idx];
    const colorB = colorStops[Math.min(idx + 1, colorStops.length - 1)];
    const [r, g, b] = lerpColor(colorA, colorB, localT);



    // decreases opacity for the color 
    const opacity = 1 - (i / numRects) * 0.9;
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
    ctx.fillRect(i * rectWidth, 0, rectWidth, rectHeight);
}