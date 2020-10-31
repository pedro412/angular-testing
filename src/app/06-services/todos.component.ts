import { TodoService } from './todo.service';

export class TodosComponent {
  todos: any[] = [];
  message;

  constructor(private service: TodoService) {}

  ngOnInit() {
    this.service.getTodos().subscribe((t) => (this.todos = t));
  }

  add(): void {
    const newTodo = { title: '...' };
    this.service.add(newTodo).subscribe(
      (t) => this.todos.push(t),
      (err) => (this.message = err)
    );
  }

  delete(id: number): void {
    if (confirm('are you sure?')) {
      this.service.delete(id).subscribe();
    }
  }
}
