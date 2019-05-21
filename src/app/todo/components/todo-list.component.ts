import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { TodoItem } from '../../shared';
import { PushService } from '../services/push.service';

@Component({
    selector: 'todo-list',
    templateUrl: './todo-list.component.html'
})
export class TodoListComponent {
    @Input()
    public items: TodoItem[];
    @Input()
    public hasReset: boolean;
    @Input()
    public title: string;
    @Output()
    public reset = new EventEmitter<void>();

    constructor(private snackBar: MatSnackBar, private pushService: PushService) {

    }

    public onChecked(checked: boolean, item: TodoItem) {
        item.checked = checked;
        item.lastModified = new Date();
        this.pushService.notifyMe(item.id, checked);
        this.snackBar.open('checked / unchecked item', null, { duration: 1500 });
    }
}
