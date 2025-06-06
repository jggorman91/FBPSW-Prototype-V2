# Function Based Problem Solving Worksheet Prototype

This project contains a single page application (`index.html`) and a sample API handler (`api/ask.js`) used to generate behavior intervention plans.

## Prerequisites

- **Node.js 18+** recommended
- Set an environment variable `GEMINI_API_KEY` with your Gemini API key if you want to enable real AI responses.

## Running

1. Serve the project directory with any static server (for example `npx serve .` or `python3 -m http.server`).
2. Ensure a backend route is available at `/api/ask` and uses `api/ask.js` to forward prompts to the Gemini API. Without this backend the front‑end will generate mock responses.
3. Open `http://localhost:PORT/index.html` in your browser.

## Notes

The large `bipData` object used for dropdown options is stored in `js/bipData.js` and imported by `index.html`.
