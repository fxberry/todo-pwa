import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { cloneArray, TodoItem } from '../../shared';

@Injectable()
export class TodoService {
    public todos: TodoItem[];
    private orig: TodoItem[];

    constructor(private http: HttpClient) {

    }

    public load(): Observable<TodoItem[]> {
        const obs = this.http.get<TodoItem[]>('assets/mock-data/todos.json');
        obs.subscribe((result) => {
            this.orig = result;
            this.todos = cloneArray(result);
        });

        return obs;
    }

    public add(newItem: TodoItem): void {
        newItem.lastModified = new Date();
        this.todos.push(newItem);
    }

    public reset(): void {
        this.todos = cloneArray(this.orig);
    }
}
