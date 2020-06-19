import { Component, OnInit } from '@angular/core';

import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/Todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos:Todo[];

  // We can use the private todoService object anywhere within the class with 'this.todoService'
  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    // This HTTP request is asynchronous (think of it as a JS promise). We use the subscribe
    // method (think of it as the .then() of the promise) to subscribe to the Observable
    // which is an asynchronous datastream.
    this.todoService.getTodos().subscribe(todos => {
      // Save the todos that are returned to our local todos array of 'Todo' datatype.
      this.todos = todos;
    });
  }

  deleteTodo(todo:Todo) {
    // Delete a todo by looping through all the todos and returning all of them
    // except from the one that we want to deleted.
    this.todos = this.todos.filter(t => t.id !== todo.id);
    // Remove from server by calling the deleteTodo() method of the TodoService.
    this.todoService.deleteTodo(todo).subscribe();
  }

  addTodo(todo:Todo) {
    this.todoService.addTodo(todo).subscribe(todo => {
      this.todos.push(todo);
    });
  }

}
