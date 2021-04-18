import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { TodoItem } from '../../shared';

@Component({
    selector: 'todo-add',
    templateUrl: './todo-add.component.html'
})
export class TodoAddComponent {
    @Output()
    public add: EventEmitter<TodoItem> = new EventEmitter<TodoItem>();

    @ViewChild('description', { static: true }) private descriptionInput: ElementRef;

    constructor(public snackBar: MatSnackBar) {

    }

    public onAdd(newItemDescription: string) {
        this.add.emit({ description: newItemDescription, checked: false, lastModified: new Date(), id: 0 });
        this.descriptionInput.nativeElement.value = '';
        this.snackBar.open(`Item with description "${newItemDescription} added`, null, { duration: 1500 });
    }
}
