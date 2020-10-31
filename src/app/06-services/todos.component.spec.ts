import { TodoService } from './todo.service';
import { TodosComponent } from './todos.component';
import { empty, from, Observable, of, throwError } from 'rxjs';

describe('TodosComponent', () => {
  let component: TodosComponent;
  let service: TodoService;

  beforeEach(() => {
    service = new TodoService();
    component = new TodosComponent(service);
  });

  it('should set todos property with the items return from the server', () => {
    let todos = [1, 2, 3];

    spyOn(service, 'getTodos').and.callFake(() => {
      return from([todos]);
    });

    component.ngOnInit();

    expect(component.todos).toBe(todos);
  });

  it('should call the server to save the changes when a new todo item is added', () => {
    let spy = spyOn(service, 'add').and.callFake((t) => {
      return empty();
    });

    component.add();

    expect(spy).toHaveBeenCalled();
  });

  it('should add the new todo returned from the server', () => {
    let todo = { id: 1 };

    let spy = spyOn(service, 'add').and.returnValue(from(of([todo])));

    component.add();

    expect(component.todos.length).toBeGreaterThan(0);
  });

  it('should set the message property if server returns an error when adding a new todo', () => {
    const error = 'error from the server';
    spyOn(service, 'add').and.returnValue(throwError(error));

    component.add();

    expect(component.message).toBe(error);
  });

  it('should call the server to delete a todo item if the user confirms', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    let spy = spyOn(service, 'delete').and.returnValue(empty());

    component.delete(1);

    expect(spy).toHaveBeenCalledWith(1);
  });

  it('should NOT call the server to delete a todo item if the user cancels', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    let spy = spyOn(service, 'delete').and.returnValue(empty());

    component.delete(1);

    expect(spy).not.toHaveBeenCalled();
  });
});
