import { Routes } from '@angular/router';
import { BookFormComponent } from './book-form.component';
import { BookFormBonusComponent } from './book-form-bonus.component';
import { ProductListComponent } from './product-catalog/product-list.component';
import { BonusDemosComponent } from './bonus-demos/bonus-demos.component';
import { InstructionsComponent } from './instructions/instructions';
import { DeferInstructionsComponent } from './defer-instructions/defer-instructions';
import { SignalsInstructionsComponent } from './signals-instructions/signals-instructions';
import { TodoAppComponent } from './todo-app/todo-app';
import { TodoAppBonusComponent } from './todo-app-bonus/todo-app-bonus';

export const routes: Routes = [
  {
    path: '',
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
