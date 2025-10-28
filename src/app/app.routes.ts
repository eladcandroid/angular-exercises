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

export const routes: Routes = [
  {
    path: '',
    component: SignalsInstructionsComponent
  },
  {
    path: 'reactive-forms-demo',
    component: BookFormComponent
  },
  {
    path: 'instructions',
    component: InstructionsComponent
  },
  {
    path: 'defer-instructions',
    component: DeferInstructionsComponent
  },
  {
    path: 'signals-instructions',
    component: SignalsInstructionsComponent
  },
  {
    path: 'signals-solution',
    component: TodoAppComponent
  },
  {
    path: 'signals-bonus',
    component: TodoAppBonusComponent
  },
  {
    path: 'bonus-solution',
    component: BookFormBonusComponent
  },
  {
    path: 'products',
    component: ProductListComponent
  },
  {
    path: 'bonus',
    component: BonusDemosComponent
  }
];
