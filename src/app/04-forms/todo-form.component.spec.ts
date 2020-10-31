import { FormBuilder } from '@angular/forms';
import { TodoFormComponent } from './todo-form.component';

describe('TodoFormComponent', () => {
  var component: TodoFormComponent;

  beforeEach(() => {
    component = new TodoFormComponent(new FormBuilder());
  });

  it('should a form with two controls', () => {
    expect(component.form.contains('name')).toBeTruthy();
    expect(component.form.contains('email')).toBeTruthy();
  });

  it('should make the name control required', () => {
    const control = component.form.get('name');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });
});
