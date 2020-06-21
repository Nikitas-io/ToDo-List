import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {
  // Emiting out to the parent component (using the addTodo method).
  @Output() addTodo: EventEmitter<any> = new EventEmitter();

  // The form's input field variable.
  title:string;

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    // Construct the Todo. We don't add an ID because the JSONPlaceholder API
    // creates one for us.
    const todo = {
      title: this.title,
      completed: false
    }

    // Emit this upwards to the Todos component.
    this.addTodo.emit(todo);
  }

}
