import { Routes } from '@angular/router';
import { BookFormComponent } from './book-form.component';
import { ProductListComponent } from './product-catalog/product-list.component';
import { BonusDemosComponent } from './bonus-demos/bonus-demos.component';

export const routes: Routes = [
  {
    path: '',
    component: BookFormComponent
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
