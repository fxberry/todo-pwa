import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { TodoItem } from '../../shared';
import { TodoService } from '../services/todo.service';
import { UpdateService } from '../services/update.service';
import { PushService } from '../services/push.service';
import { CheckForUpdateService } from '../services/check-for-update.service';

@Component({
    selector: 'todo-page',
    templateUrl: './todo.component.html',
})
export class TodoComponent implements OnInit {
    constructor(private todoService: TodoService,
                private snackBar: MatSnackBar,
                pushService: PushService,
                updateService: UpdateService,
                checkForUpdateService: CheckForUpdateService) {

    }

    public get todos(): TodoItem[] {
        return this.todoService.todos;
    }

    public ngOnInit() {
        this.todoService.load();
    }

    public onAdd(newItem: TodoItem): void {
        this.todoService.add(newItem);
        this.snackBar.open('add item', null, { duration: 1500 });
    }

    public onReset(): void {
        this.todoService.reset();
        this.snackBar.open('reset todos', null, { duration: 1500 });
    }
}
