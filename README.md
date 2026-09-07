# Portfolio

Personal portfolio web -> fizreyarmesto.com

## Quickstart (fresh clone / new Orca worktree)

Requirements: Node 18+ (`cat .nvmrc`, or run `nvm use`).

```bash
npm run setup     # checks Node, creates .env from .env.example if missing, runs npm install if needed
npm run build     # one-off build into dist/
npm start         # build + live-reload server at http://localhost:3000
```

Windows: double-click `start-portfolio.bat` (does setup + build + start).

No real API keys needed to run: without Spotify/Last.fm credentials the site builds
and serves fine; only the music widgets stay empty. Copy `.env.example` to `.env`
(`npm run setup` does this) and fill in values when you need them.

## Parallel worktrees

Each worktree needs its own port:

```bash
PORT=3001 npm start   # worktree A
PORT=3002 npm start   # worktree B (also powers the Unity/proxy debug server convention)
```

`HOST` is optional and unset by default (binds localhost). The old hardcoded LAN IP
is gone; set `HOST` explicitly only if you need LAN access.

## Scripts

| Command            | What it does                                  |
| ------------------ | --------------------------------------------- |
| `npm run setup`    | Node check, `.env` bootstrap, `npm install`   |
| `npm run build`    | webpack + pug + scss + scripts + assets       |
| `npm start`        | build + BrowserSync live server (`PORT`)      |
| `npm run serve`    | serve existing `dist/` without rebuilding     |
| `npm run start:debug` | Unity WebGL debug server + proxy setup     |

## Troubleshooting

- `Cannot find module 'lodash'` (or similar): run `npm install`. `lodash` is a direct
  dependency (used by `scripts/sb-watch.js`); if you see this, dependencies are stale.
- Port already in use: another worktree/server owns it — rerun with a free port,
  e.g. `PORT=3001 npm start`.
- Blank music sections: expected without `.env` keys; see `SPOTIFY_SETUP.md` /
  `LASTFM_SETUP.md` / `GITHUB_PAGES_MUSIC.md`.
- Sass contrast warnings during build: upstream Bootstrap warnings, safe to ignore.
