import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('./todo/todo.module').then(m => m.TodoMvcPlusServiceModule),
    data: { title: 'MVC+S Architecture' }
  }
];
