import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    loadChildren: './todo/todo.module#TodoMvcPlusServiceModule',
    data: { title: 'MVC+S Architecture' }
  }
];
