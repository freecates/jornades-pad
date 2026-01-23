# Coding Standards & Best Practices

## TypeScript & Types
- **Strictness:** `tsconfig.json` is set to `strict: false`.
    - **New Code:** Aim for strict typing where possible.
    - **Existing Code:** Do not refactor solely to fix strictness errors unless requested.
- **Interfaces:** Prefer `interface` over `type` for object definitions.
- **Location:** Shared interfaces go in `src/interfaces/index.tsx`. Local interfaces can remain in the component file.

## React Components
- **Paradigm:** Functional Components.
- **Export Style:** Named exports preferred (e.g., `export const Header = ...`) or `export default` as seen in existing files (check `Header.tsx`).
- **Server vs. Client:**
    - Next.js 15 uses **Server Components** by default.
    - Add `'use client';` at the top of the file *only* if you use hooks (`useState`, `useEffect`) or event listeners.

## Styling (SCSS Modules)
- **Import:** `import styles from './ComponentName.module.scss';`
- **Usage:** `className={styles.className}` or `className={styles['class-name']}`.
- **Nesting:** Avoid deep nesting in SCSS. Keep selector specificity low.
- **Mixins:** Import mixins relatively or via alias if configured (check `tsconfig.json` paths).

## Linting & Formatting
- **ESLint:** The project uses a relaxed config (`.eslintrc.json`).
    - `indent` is off.
    - `no-shadow` is off.
    - `react-hooks/exhaustive-deps` is a warning.
- **Respect Prettier:** If the user has a formatter running, try to output code that won't immediately be reformatted.

## Images
- Always use the `Image` component from `next/image`.
- **Must** provide `width` and `height` OR `fill`.
- **Must** provide an `alt` tag.
