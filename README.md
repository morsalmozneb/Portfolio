# React Version (Vite)

This folder is a Vite + React clone of the portfolio project with the same primary routes and UI behavior:

- `/`
- `/projects`
- `/about`
- `/contact`

## Run

```bash
cd "react version"
npm install
npm run dev
```

## Notes

- Existing components were reused and wired to React Router.
- `next/*` imports are handled via local compatibility shims in `src/shims/`.
- Static assets are copied into `public/`.
