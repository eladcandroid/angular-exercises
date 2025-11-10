import { Routes } from '@angular/router';
import { BookFormComponent } from './02-reactive-forms/demo/demo.component';
import { BookFormBonusComponent } from './02-reactive-forms/bonus/bonus.component';
import { ProductListComponent } from './03-defer/demo/product-catalog/product-list.component';
import { BonusDemosComponent } from './03-defer/bonus/bonus-demos/bonus-demos.component';
import { InstructionsComponent } from './02-reactive-forms/instructions/instructions';
import { DeferInstructionsComponent } from './03-defer/instructions/defer-instructions';
import { SignalsInstructionsComponent } from './01-signals/instructions/signals-instructions';
import { TodoAppComponent } from './01-signals/demo/todo-app/todo-app';
import { TodoAppBonusComponent } from './01-signals/bonus/todo-app-bonus/todo-app-bonus';
import { TestingInstructionsComponent } from './04-testing/instructions/testing-instructions';
import { TestingDemoComponent } from './04-testing/demo/testing-demo.component';
import { BonusTestingComponent } from './04-testing/bonus/bonus-testing.component';

export const routes: Routes = [
  {
    path: '',
    component: SignalsInstructionsComponent
  },
  {
    path: 'signals-instructions',
    component: SignalsInstructionsComponent
  },
  {
    path: 'signals-demo',
    component: TodoAppComponent
  },
  {
    path: 'signals-bonus',
    component: TodoAppBonusComponent
  },
  {
    path: 'reactive-forms-instructions',
    component: InstructionsComponent
  },
  {
    path: 'reactive-forms-demo',
    component: BookFormComponent
  },
  {
    path: 'reactive-forms-bonus',
    component: BookFormBonusComponent
  },
  {
    path: 'defer-instructions',
    component: DeferInstructionsComponent
  },
  {
    path: 'defer-demo',
    component: ProductListComponent
  },
  {
    path: 'defer-bonus',
    component: BonusDemosComponent
  },
  {
    path: 'testing-instructions',
    component: TestingInstructionsComponent
  },
  {
    path: 'testing-demo',
    component: TestingDemoComponent
  },
  {
    path: 'testing-bonus',
    component: BonusTestingComponent
  }
];
