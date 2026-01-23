# Project Structure & Organization

## Directory Map

The source code is located entirely within the `src/` directory.

### `src/app/` (App Router)
- Contains the route structure.
- **`page.tsx`**: Route entry points.
- **`layout.tsx`**: Wrappers for route segments.
- **`globals.css`**: Global stylesheet.
- **`_mixins.scss`**: Global SCSS mixins and variables.

### `src/componnents/` (Components)
- **⚠️ IMPORTANT:** This folder is named **`componnents`** (double 'n').
- **DO NOT** create a `components` folder. Use the existing one.
- Contains all reusable UI components.
- **Structure:**
    - `ComponentName.tsx`
    - `ComponentName.module.scss` (Co-located styles)

### `src/utils/`
- Helper functions and shared logic.
- Naming convention: camelCase (e.g., `dateToLocale.ts`).

### `src/interfaces/`
- Shared TypeScript interfaces and type definitions.
- Entry point: `index.tsx`.

### `src/libs/`
- External library configurations or API wrappers (e.g., `api.js`).

## File Naming Conventions

- **React Components:** PascalCase (e.g., `Header.tsx`).
- **SCSS Modules:** PascalCase + module suffix (e.g., `Header.module.scss`).
- **Utilities:** camelCase (e.g., `htmlToString.ts`).
- **Directories:**
    - Routes: kebab-case (next.js convention) or `[slug]` for dynamic routes.
    - Other folders: kebab-case or single word.
