# Dot Matrix Timer

A visual countdown timer that displays the remaining time in 2026 using an interactive dot matrix display.

## Features

- **Real-time Updates**: Shows elapsed time and year progress percentages
- **Visual Matrix Display**: Four different time scales represented by dot grids
- **Dual Progress Counters**: Displays both percentage completed and remaining of 2026
- **Elapsed Timer**: Shows total time elapsed since January 1, 2026
- **Remaining Timer**: Shows time remaining in current time periods
- **Interactive Elements**: Click dots for animations, double-click for fullscreen
- **Responsive Design**: Works on desktop and mobile devices
- **Dark Theme**: Easy on the eyes with green and orange accent colors

## How to Use

1. Open `index.html` in a modern web browser
2. Watch the dots update in real-time as time passes
3. **Top Timer (Orange)**: Shows elapsed time since January 1, 2026
4. **Bottom Timer (Green)**: Shows remaining time in current time periods
5. **Spacebar**: Toggle minimal mode
6. **Double-click**: Enter/exit fullscreen
7. **R key**: Reset animations
8. **Click dots**: Trigger individual animations

## Matrix Layouts

- **Days**: 365 dots in a 23×16 grid (days passed in 2026, lit dots = completed days)
- **Hours**: 24 dots in a 6×4 grid (hours passed today, lit dots = completed hours)
- **Minutes**: 60 dots in a 10×6 grid (minutes passed this hour, lit dots = completed minutes)
- **Seconds**: 60 dots in a 10×6 grid (seconds passed this minute, lit dots = completed seconds)

## Color Scheme

- **Background**: Near-black (#0a0a0a)
- **Active Dots**: Bright green (#00ff41) with glow effect
- **Inactive Dots**: Dark gray (#2a2a2a) with reduced opacity
- **Text**: White (#ffffff)

## Browser Compatibility

Works in all modern browsers that support:
- CSS Grid
- CSS animations
- ES6 JavaScript
- Fullscreen API

## File Structure

```
dot-matrix-timer/
├── index.html      # Main HTML structure
├── style.css       # Styling and animations
├── script.js       # Timer logic and interactions
└── vision.md       # Project vision and goals
```