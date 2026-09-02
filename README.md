# Website Pulse

A little corner of the internet dedicated to space. Website Pulse pulls NASA's **Astronomy Picture of the Day (APOD)** and shows it to you — today's picture by default, or any day in NASA's archive if you're feeling curious.

No frameworks, no bloat. Just HTML, CSS, and JavaScript, bundled with Vite.

## What it does

- Fetches the current Astronomy Picture of the Day straight from NASA's API
- Lets you pick a date and browse the archive
- Handles both images *and* videos (NASA occasionally features a YouTube video instead of a photo)
- A clean, space-themed UI to match the subject matter

## Why it exists

This project started as a way to actually *build* something with an API instead of just reading about how APIs work — pick an endpoint, wire it up, make it look decent, ship it. NASA's APOD API was the perfect target: it's free, well-documented, and the payoff (a new space photo every day) is genuinely satisfying to look at.

## Tech stack

- Vanilla JavaScript — no React, no Vue, just the DOM
- [Vite](https://vitejs.dev/) for the dev server and build
- [NASA APOD API](https://api.nasa.gov/) for the data

## Deployment

There's a GitHub Actions workflow in `.github/workflows` set up to build and deploy the site automatically whenever changes land on `main`.

## Project structure

```
Website-Pulse/
├── .github/workflows/   # CI/CD — auto-deploy on push
├── public/              # static assets
├── src/                 # the actual app (JS + CSS)
├── index.html           # entry point
├── package.json
└── vite.config.js
```

## A note on API keys

Since this is a purely front-end project, your NASA API key does end up bundled into the built JavaScript — it's not truly hidden from anyone who goes looking. For a free, low-stakes public API like this one, that's a non-issue; worst case, someone bumps into your rate limit. It's just worth knowing this pattern isn't the move for anything sensitive (payments, private data, etc.) — that's what a backend proxy is for.

## Contributing

This is mostly a personal/learning project, but if you spot a bug or have an idea for a feature, feel free to open an issue or a PR.

## Credits

Photo and data courtesy of NASA's [Astronomy Picture of the Day](https://apod.nasa.gov/apod/astropix.html) — running since 1995 and still one of the best corners of the internet.
