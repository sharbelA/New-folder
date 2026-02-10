# Basic Frontend Page

Simple starter page with HTML, CSS, and JS. Open `index.html` in your browser or run a static server.

Quick commands (Windows PowerShell / CMD):

```sh
# Open in default browser (Windows CMD)
start index.html

# Or using PowerShell
Start-Process index.html

# Or run a local server (cross-platform, requires Python)
python -m http.server 8000
# then open http://localhost:8000
```

Run the sample Node API server (serves the site and `/api/products`):

```sh
npm install
npm start
# then open http://localhost:3000
```

Notes:
- The frontend fetches `/api/products`. If you open `index.html` directly (file:///) the API fetch will fail; run the server or a static server instead.
