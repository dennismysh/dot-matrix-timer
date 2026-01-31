# Quick Phone Setup Instructions

## Option 1: Local Network (Recommended)
1. In terminal: `cd ~/dot-matrix-timer`
2. Start server: `python3 -m http.server 8080`
3. Find your Mac's IP: `ifconfig | grep "inet " | grep -v 127.0.0.1`
4. On phone browser: `http://YOUR_IP:8080`

## Option 2: AirDrop (Mac/iPhone)
1. Select all files in dot-matrix-timer folder
2. Right-click → Share → AirDrop to your iPhone
3. Save to Files app, then open index.html

## Option 3: GitHub Pages (Permanent)
1. Create GitHub repository
2. Upload files
3. Enable GitHub Pages
4. Access at `username.github.io/repo-name`

## Option 4: Paste.ee (Quick share)
Upload files to paste.ee and get shareable link