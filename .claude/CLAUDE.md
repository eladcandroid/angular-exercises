# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

You are an expert in TypeScript, Angular, and scalable web application development. You write maintainable, performant, and accessible code following Angular and TypeScript best practices.

## Project Overview

This is an educational Angular project containing three distinct exercise modules:
1. **Angular Signals** (01-signals) - Reactive state management with signals
2. **Reactive Forms** (02-reactive-forms) - Complex forms with FormBuilder and validation
3. **Deferrable Views** (03-defer) - Lazy loading with @defer syntax

Each module contains:
- `demo/` - Working solution/demonstration
- `bonus/` - Advanced features and bonus exercises
- `instructions/` - Exercise instructions component
- `EXERCISE.md` - Detailed exercise documentation

**Live deployment:** https://gocode-angular-exercises-gss3lumzw-elad-cohens-projects.vercel.app
**Repository:** https://github.com/eladcandroid/angular-exercises

## Common Commands

```bash
# Development
npm start                    # Start dev server (http://localhost:4200)
ng serve                     # Alternative start command

# Build
npm run build                # Production build → dist/angular-exercises/browser
npm run watch                # Development build with watch mode

# Testing
npm test                     # Run Karma tests

# Deployment
vercel --prod --yes          # Deploy to Vercel (project: gocode-angular-exercises)
```

## Project Architecture

### Folder Structure
```
src/app/
├── 01-signals/              # Signals exercise module (route prefix: /signals-*)
├── 02-reactive-forms/       # Forms exercise module (routes: /instructions, /reactive-forms-demo, /bonus-solution)
├── 03-defer/                # @defer exercise module (routes: /defer-instructions, /products, /bonus)
├── shared/
│   ├── models/              # Shared data models (Task, Book, Product, PerformanceMetrics)
│   └── utils/               # Shared utilities (signal-utils.ts with debouncedSignal)
├── app.routes.ts            # Main routing configuration
├── app.html                 # Root template with navigation menu
└── app.scss                 # Root styles with RTL navigation
```

### Navigation Architecture
- **RTL (Right-to-Left) horizontal menu** with three grouped sections
- Each group has label + links (הוראות/הדגמה/בונוס)
- Default route (`/`) points to Signals instructions
- Menu defined in `src/app/app.html` with `routerLink` and `routerLinkActive`

### Routing Structure
Routes are organized by exercise topic with consistent naming:
- **Signals:** `/signals-instructions`, `/signals-solution`, `/signals-bonus`
- **Reactive Forms:** `/instructions`, `/reactive-forms-demo`, `/bonus-solution`
- **@defer:** `/defer-instructions`, `/products`, `/bonus`

Default route (`/`) renders `SignalsInstructionsComponent`.

### Shared Resources
`src/app/shared/` contains cross-module resources:
- **models/** - TypeScript interfaces/types used by multiple exercises
- **utils/** - Utility functions like `debouncedSignal()` for signal debouncing

All components import from `shared/` using relative paths: `'../../../shared/models/...'`

### Component Architecture
All components follow Angular 20 standalone patterns:
- No NgModules (standalone by default)
- Signal-based state with `signal()`, `computed()`, `effect()`
- OnPush change detection
- `input()` and `output()` functions (not decorators)
- Modern control flow: `@if`, `@for`, `@switch`
- Host bindings in decorator `host` object (not `@HostBinding`/`@HostListener`)

### Build Configuration
- **Project name:** `angular-exercises` (in angular.json and package.json)
- **Output:** `dist/angular-exercises/browser`
- **Styles:** SCSS (configured as default)
- **Bundle budgets:** 500kB warning, 1MB error (initial); 4kB/8kB (component styles)

## TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

## Angular Best Practices

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.

## Components

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `computed()` for derived state
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator
- Prefer inline templates for small components
- Prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead

## State Management

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead

## Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables

## Services

- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Use the `inject()` function instead of constructor injection
