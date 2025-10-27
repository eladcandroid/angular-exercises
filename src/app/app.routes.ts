import { Routes } from '@angular/router';
import { BookFormComponent } from './book-form.component';
import { BookFormBonusComponent } from './book-form-bonus.component';
import { ProductListComponent } from './product-catalog/product-list.component';
import { BonusDemosComponent } from './bonus-demos/bonus-demos.component';
import { InstructionsComponent } from './instructions/instructions';
import { DeferInstructionsComponent } from './defer-instructions/defer-instructions';

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
