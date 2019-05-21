import { RouterModule } from '@angular/router';
import { TodoComponent } from './containers/todo.component';

const todoRoutes = [
    {
        path: '', children: [
            { path: '', component: TodoComponent },
        ]
    },
];

export const todoRoutesModule = RouterModule.forChild(todoRoutes);
