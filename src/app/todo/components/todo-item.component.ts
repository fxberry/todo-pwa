import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoItem } from '../../shared';

@Component({
    selector: 'todo-item',
    templateUrl: './todo-item.component.html'
})
export class TodoItemComponent {
    @Input()
    public item: TodoItem;
    @Output()
    public checked: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor() {

    }

    public onChecked(value: boolean) {
        this.checked.emit(value);
    }
}
