'use strict';

class Todo {
  constructor(form, input, toDoList, todoCompleted) {
    this.form = document.querySelector(form);
    this.input = document.querySelector(input);
    this.toDoList = document.querySelector(toDoList);
    this.todoCompleted = document.querySelector(todoCompleted);
    this.todoData = new Map(JSON.parse(localStorage.getItem('toDoList')));
  }

  addToStorage() {
    localStorage.setItem('toDoList', JSON.stringify([...this.todoData]));
  }

  render() {
    this.toDoList.textContent = '';
    this.todoCompleted.textContent = '';
    this.todoData.forEach(this.createItem, this);
    this.addToStorage();
  }

  createItem(todo) {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.key = todo.key;
    
    li.insertAdjacentHTML('beforeend', `
      <span class="text-todo">${todo.value}</span>
      <div class="todo-buttons">
        <button class="todo-remove"></button>
        <button class="todo-complete"></button>
      </div>
    `);

    if (todo.completed) {
      this.todoCompleted.append(li);
    } else {
      this.toDoList.append(li);
    }
  }

  addTodo(e) {
    e.preventDefault();
    if (this.input.value.trim()) {
      const newTodo = {
        value: this.input.value,
        completed: false,
        key: this.generateKey(),
      };
      this.todoData.set(newTodo.key, newTodo);

      this.render();
    }
  }

  generateKey() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  deleteItem(target) {
    this.todoData.delete(target.closest('.todo-item').key);
    this.render();
    // const deletedItem = this.todoData.get(target.closest('.todo-item').key);
    // console.log(deletedItem);
    // deletedItem.remove();
  }

  completedItem(target) {
    this.todoData.get(target.closest('.todo-item').key).completed = !target.closest('.todo-completed');
    this.render();
  }

  handler() {
    //делегирование

    this.toDoList.addEventListener('click', (e) => {
      const target = e.target;
      if (target.classList.contains('todo-complete')) {
        this.completedItem(target);
      }
      if (target.classList.contains('todo-remove')) {
        this.deleteItem(target);
      }
    });

    this.todoCompleted.addEventListener('click', (e) => {
      const target = e.target;
      if (target.classList.contains('todo-complete')) {
        this.completedItem(target);
      }
      if (target.classList.contains('todo-remove')) {
        this.deleteItem(target);
      }
    });
  }

  init() {
    this.form.addEventListener('submit', this.addTodo.bind(this));
    this.render();
  }
}

const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed');

todo.init();
todo.handler();

