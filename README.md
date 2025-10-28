# Angular Exercises

A comprehensive collection of Angular exercises covering modern Angular features and best practices. This project demonstrates standalone components, signals, reactive forms, and deferrable views using Angular 20.

## Live Demo

Visit the live application: [https://gocode-angular-exercises-gss3lumzw-elad-cohens-projects.vercel.app](https://gocode-angular-exercises-gss3lumzw-elad-cohens-projects.vercel.app)

## Exercise Topics

### 1. Angular Signals (01-signals)
Learn Angular's reactive primitives with a comprehensive TODO application exercise.

- **Location:** `src/app/01-signals/`
- **Instructions:** [EXERCISE.md](src/app/01-signals/EXERCISE.md)
- **Topics Covered:**
  - Signal basics and reactivity
  - Computed signals
  - Effects and side effects
  - Derived state
  - Performance optimization
  - Debouncing with signals

**Routes:**
- `/signals-instructions` - Exercise instructions
- `/signals-solution` - Working demo
- `/signals-bonus` - Advanced bonus features

---

### 2. Reactive Forms (02-reactive-forms)
Build complex forms using Angular's Reactive Forms API with FormBuilder and validation.

- **Location:** `src/app/02-reactive-forms/`
- **Instructions:** [EXERCISE.md](src/app/02-reactive-forms/EXERCISE.md)
- **Topics Covered:**
  - FormBuilder and FormGroup
  - FormArray for dynamic forms
  - Built-in and custom validators
  - Cross-field validation
  - Form state management
  - Form submission and handling

**Routes:**
- `/instructions` - Exercise instructions
- `/` - Working demo (book form)
- `/bonus-solution` - Advanced bonus features

---

### 3. Deferrable Views (@defer) (03-defer)
Master Angular's @defer syntax for lazy loading and performance optimization.

- **Location:** `src/app/03-defer/`
- **Instructions:** [EXERCISE.md](src/app/03-defer/EXERCISE.md)
- **Topics Covered:**
  - @defer basic syntax
  - Viewport triggers
  - Interaction triggers
  - Hover and timer triggers
  - Loading and error states
  - @placeholder and @loading blocks
  - Performance optimization strategies

**Routes:**
- `/defer-instructions` - Exercise instructions
- `/products` - Product catalog demo
- `/bonus` - Advanced defer patterns

---

## Project Structure

```
src/app/
├── 01-signals/              # Angular Signals exercises
│   ├── demo/                # Working solution
│   ├── bonus/               # Advanced features
│   └── instructions/        # Exercise instructions
│
├── 02-reactive-forms/       # Reactive Forms exercises
│   ├── demo/                # Working solution
│   ├── bonus/               # Advanced features
│   └── instructions/        # Exercise instructions
│
├── 03-defer/                # @defer exercises
│   ├── demo/                # Working solution
│   ├── bonus/               # Advanced features
│   └── instructions/        # Exercise instructions
│
└── shared/                  # Shared resources
    ├── models/              # Data models
    └── utils/               # Utility functions
```

## Technology Stack

- **Angular** 20.0.5 (standalone components)
- **TypeScript** 5.7.2
- **Angular CDK** 20.0.2
- **RxJS** 7.8.1
- **Zone.js** 0.15.0

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/eladcandroid/angular-exercises.git
cd angular-exercises

# Install dependencies
npm install
```

### Development Server

```bash
npm start
```

Navigate to `http://localhost:4200/` to view the application.

### Build

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Run Tests

```bash
npm test
```

## Best Practices Demonstrated

- **Standalone Components** - All components use standalone architecture (no NgModules)
- **Signals** - Modern reactive state management
- **OnPush Change Detection** - Optimized performance
- **Typed Forms** - Type-safe reactive forms
- **Modern Control Flow** - Using @if, @for, @switch instead of structural directives
- **Signal-based Inputs/Outputs** - Using input() and output() functions
- **Lazy Loading** - Feature routes and @defer for code splitting

## Repository

[https://github.com/eladcandroid/angular-exercises](https://github.com/eladcandroid/angular-exercises)

## License

This project is for educational purposes.
