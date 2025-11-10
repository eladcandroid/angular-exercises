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
- `/signals-demo` - Working demo
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
- `/reactive-forms-instructions` - Exercise instructions
- `/reactive-forms-demo` - Working demo (book form)
- `/reactive-forms-bonus` - Advanced bonus features

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
- `/defer-demo` - Product catalog demo
- `/defer-bonus` - Advanced defer patterns

---

### 4. Unit Testing (04-testing)
Learn modern Angular testing with Jest, covering standalone components, signals, HTTP services, and more.

- **Location:** `src/app/04-testing/`
- **Instructions:** [EXERCISE.md](src/app/04-testing/EXERCISE.md)
- **Topics Covered:**
  - Jest setup and configuration
  - Testing standalone components with signals
  - Testing modern control flow (@if, @for, @switch)
  - HTTP testing with provideHttpClient/provideHttpClientTesting
  - Testing reactive forms and custom validators
  - Async testing with fakeAsync, tick, waitForAsync
  - Zoneless testing patterns
  - Integration tests
  - Test-Driven Development (TDD)

**Routes:**
- `/testing-instructions` - Exercise instructions
- `/testing-demo` - Component testing demo
- `/testing-bonus` - Advanced testing patterns

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
├── 04-testing/              # Unit Testing exercises
│   ├── demo/                # Testing examples
│   ├── bonus/               # Advanced testing patterns
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
- **Jest** 30.2.0 (testing framework)

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
