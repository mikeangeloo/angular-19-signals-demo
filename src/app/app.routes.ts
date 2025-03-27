import { Routes } from '@angular/router';
import { ShoppingCartComponent } from './feature/shopping-cart/shopping-cart.component';
import { IntroComponent } from './intro/intro.component';

export const routes: Routes = [
  {
    path: 'intro',
    component: IntroComponent,
  },
  {
    path: 'shopping-cart',
    component: ShoppingCartComponent,
  },
  {
    path: '**',
    redirectTo: 'intro',
  },
];
