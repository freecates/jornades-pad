# Technology Stack & Environment

## Core Frameworks
- **Framework:** Next.js 15.3.2 (App Router)
- **UI Library:** React 19.1.0
- **Language:** TypeScript 5.0.2

## Styling
- **Processor:** Sass (SCSS)
- **Methodology:** CSS Modules (`*.module.scss`)
- **Global Styles:** `src/app/globals.css`
- **Mixins:** `src/app/_mixins.scss`

## Key Libraries
- **Images:** `next/image` (Mandatory for all images)
- **Links:** `next/link`
- **Fonts:** `next/font` (Google Fonts via Next.js)
- **Social:** `react-share`
- **Calendar:** `add-to-calendar-button-react`

## Environment
- **Node:** >= 18.x
- **Package Manager:** `npm` (implied by `package.json` scripts) or `bun` (presence of `bun.lockb`)
    - *Note: Check with the user if they prefer `npm`, `yarn`, or `bun` before installing packages.*
