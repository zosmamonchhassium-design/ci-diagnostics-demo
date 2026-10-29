# Northstar operations dashboard

A small React and TypeScript dashboard for reviewing weekly service traffic, availability, and response times. All metrics are synthetic and fixed for demonstration. The app does not connect to external services.

## Local development

Use a Node.js version supported by the `engines` entry in `package.json`. The development version is recorded in `.nvmrc`.

```sh
npm ci
npm run dev
```

Open the localhost URL printed by Vite. The development server uses a default report label when no label is supplied.

## Production build

Set a public report label in the build environment:

```sh
VITE_PUBLIC_REPORT_LABEL=Demo npm run build
npm run preview
```

This label is public display text, not a secret. The build checks its presence and runs TypeScript before producing the `dist/` directory.

## Checks

```sh
npm run typecheck
npm run verify:config
```

The configuration check reads the current process environment. It does not load `.env` files. GitHub Actions runs the install, configuration check, and production build for changes to `main` and for pull requests.
