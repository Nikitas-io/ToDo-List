import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

// Bring in the Todo Service.
import { TodoService } from '../../services/todo.service';
// Import the Todo datatype.
import { Todo } from 'src/app/models/Todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  // Taking in from the parent component (using the todo variable).
  @Input() todo: Todo;
  // Emiting out to the parent component (using the deleteTodo method).
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();

  // We can use the todoService object to call methods from the TodoService class.
  constructor(private todoService:TodoService) { }

  ngOnInit() {
  }

  // Set Dynamic Classes
  setClasses() {
    let classes = {
      todo: true,
      'is-complete': this.todo.completed
    }

    return classes;
  }

  onToggle(todo) {
    // Toggle in UI (the strikethrough line)
    todo.completed = !todo.completed;
    // Toggle on server. This will return an observable, which we console log
    // just to see that it is getting updated.
    this.todoService.toggleCompleted(todo).subscribe(todo => console.log(todo));
  }

  // To delete we need to acccess the todos in the UI, located in the TodosComponent,
  // where we have embeded the todo HTML element, meaning we have to emit upwards.
  onDelete(todo) {
    // Emit upwards
    this.deleteTodo.emit(todo);
  }

}
