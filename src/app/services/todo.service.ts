import { Injectable } from '@angular/core';
// Import the the 'Observable' datatype from rxjs(Reactive Extensions).
import { Observable } from 'rxjs';
// Import the HTTP modules.
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Import the Todo datatype from the models.
import { Todo } from '../models/Todo';

// Since we are sending data to a server, we have to send with
// the HTTP request, the header that contains the content-type.
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  // The URL we are making requests to.
  todosUrl: string = 'https://jsonplaceholder.typicode.com/todos';
  // Get only 5 todos by passing a variable to the URL.
  todosLimit = '?_limit=5';

  constructor(private http:HttpClient) { }

  // Get Todos. Returns an array of Todo Observables.
  getTodos(): Observable<Todo[]> {
    // Make a get request using the http object that will return an array of 'Todo' items.
    return this.http.get<Todo[]>(`${this.todosUrl}${this.todosLimit}`);
  }

  // Delete Todo. Send a put request to the server and update the value.
  // This is not going to stick, since JSONPlaceholder doesn't allow people to edit
  // actual data but it does mimic the response request.
  deleteTodo(todo:Todo):Observable<Todo> {
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.delete<Todo>(url, httpOptions);
  }

  // Add Todo
  addTodo(todo:Todo):Observable<Todo> {
    return this.http.post<Todo>(this.todosUrl, todo, httpOptions);
  }

  // Toggle Completed. Put-request that returns an Observable of datatype 'any'. This
  // is because the Observable isn't formated as an exact todo since it has the user-id.
  toggleCompleted(todo: Todo): Observable<any> {
    // Specify the ID of the todo that is passed in.
    const url = `${this.todosUrl}/${todo.id}`;
    // A put request is for when you are UPDATING something on the server.
    return this.http.put(url, todo, httpOptions);
  }
}
