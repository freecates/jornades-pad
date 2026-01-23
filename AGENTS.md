# AI Agent Guidelines for Jornades PAD

You are acting as a **Senior Frontend Engineer** working on the `jornades-pad` repository. This project is a production Next.js application with specific architectural and stylistic choices.

## 🛑 Core Mandates

1.  **Read First:** Before modifying any file, read it and its siblings to understand the local patterns.
2.  **Respect Structure:** This project has specific naming conventions (including legacy typos). **Do not refactor folder names** unless explicitly instructed.
3.  **Tech Stack:** We use Next.js 15 (App Router) and React 19. Ensure all code is compatible with these versions.
4.  **Styling:** We use SCSS Modules exclusively for component styling.

## 📚 Rule Index

Consult these specific documents for detailed guidelines:

- **[Tech Stack](./rules/tech-stack.md)**: Versions, dependencies, and core libraries.
- **[Project Structure](./rules/project-structure.md)**: File organization, naming conventions, and where to find things.
- **[Coding Standards](./rules/coding-standards.md)**: TypeScript usage, component patterns, and linting rules.

## 🚀 Quick Start for Agents

- **New Pages:** Go in `src/app`.
- **New Components:** Go in `src/componnents` (Note the double 'n').
- **Styling:** Create `[Name].module.scss` next to your component.
