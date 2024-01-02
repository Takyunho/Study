import Todo from './Todo';

class TodoService {
  constructor(todos = []) {
    this._todos = [];
    todos.forEach((todo) => this.addTodo(todo.contents, todo.done));
  }
  getTodoList() {
    return this._todos;
  }
  addTodo(contents, done = false) {
    const newTodo = new Todo(contents, done);
    this._todos.push(newTodo);
    return newTodo;
  }

  get leftTodoCount() {
    return this._todos.reduce((prev, curr) => (curr.done === false ? prev + 1 : prev), 0);
  }
}

class Aservice extends TodoService {}

export default Aservice;
