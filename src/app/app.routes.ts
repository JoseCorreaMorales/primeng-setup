import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [

  {
    path: 'layout',
    loadComponent: () => import('./layout/layout.component').then(m => m.LayoutComponent),

  }
];
