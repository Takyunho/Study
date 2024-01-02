import TodoService from './TodoService';

class TodoApp {
  constructor(todos) {
    this.todoService = new TodoService(todos);
    this.todoContainerEl = document.querySelector('.todo-container');
    this.addTodoBtnEl = document.querySelector('.add-todo button');
    this.titleEl = document.querySelector('.title');
    this.renderTodos();
    this.renderTitle();
    this.bindEvents();
  }

  renderTitle() {
    const dateText = this.titleEl.querySelector('h2');
    const now = new Date();
    dateText.innerHTML = `${now.getMonth() + 1}월 ${now.getDate()}일 
      <span class='left-count'>(${this.todoService.leftTodoCount}개의 할일이 남았습니다.)</span>`;
  }

  renderTodos() {
    this.todoContainerEl.innerHTML = '';
    const todoList = this.todoService.getTodoList();
    todoList.forEach((todo, idx) => {
      const todoEl = this.createTodoEl(todo, idx);
      this.todoContainerEl.appendChild(todoEl);
    });
  }

  render() {
    this.renderTitle();
    this.renderTodos();
  }

  createTodoEl(todo, id) {
    const todoEl = document.createElement('div');
    todoEl.id = 'todo-' + id;
    todoEl.innerHTML = `<input type="checkbox" ${todo.done ? 'checked' : ''} /> <label>${todo.contents}</label>`;
    todoEl.className = 'todo';
    return todoEl;
  }

  bindEvents() {
    if (this.addTodoBtnEl) {
      this.addTodoBtnEl.addEventListener('click', (e) => {
        const textEl = document.querySelector('.add-todo input.new-todo-text');
        this.todoService.addTodo(textEl.value);
        this.render();
        textEl.value = '';
      });
    }
    this.todoContainerEl.addEventListener('click', (e) => {
      if (
        e.target.nodeName === 'INPUT' &&
        e.target.type === 'checkbox' &&
        e.target.parentElement.className === 'todo'
      ) {
        const todoEl = e.target.parentElement;
        const idx = todoEl.id.replace('todo-', '');
        this.todoService.getTodoList()[idx].toggle();
        this.renderTitle();
      }
    });
  }
}

export default TodoApp;
