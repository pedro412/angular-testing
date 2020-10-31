import { Observable, of } from 'rxjs';

export class TodoService {
  todos: any[] = [];

  getTodos(): Observable<any[]> {
    return of(this.todos);
  }

  add(todo): Observable<any[]> {
    this.todos.push(todo);
    return of(this.todos);
  }

  delete(id): Observable<any[]> {
    this.todos.slice(id, 0);
    return of(this.todos);
  }
}
