'use strict';
const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed');

const todoData = [
    // {
    //     value: 'Сварить кофе',
    //     completed: false,
    // },
    // {
    //     value: 'Помыть посуду',
    //     completed: true,
    // },
];
for (let key in localStorage) {
  let item = JSON.parse(localStorage.getItem(key));
  if (item !== null) {
    todoData.push(item);
  }
}
const render = function() {
    todoList.textContent = '';
    todoCompleted.textContent = '';

    todoData.forEach(function(item) {
        const li = document.createElement('li');
        li.classList.add('todo-item');

        li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
        '<div class="todo-buttons">' +
            '<button class="todo-remove"></button>' +
            '<button class="todo-complete"></button>' +
        '</div>';

        if (item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }

        const btnTodoComplete = li.querySelector('.todo-complete');
        btnTodoComplete.addEventListener('click', function() {
            item.completed = !item.completed;
            render();
        });

        li.querySelector('.todo-remove').addEventListener('click', function(event) {
        let elem = event.target.closest('.todo-item');
        let index = todoData.map(function(item) {
            return item.value;
        }).indexOf(elem.textContent);

        elem.remove();
        todoData.splice(index, 1);
        localStorage.removeItem(index);
        });

    });
    localStorage.clear();
    for (let key in todoData) {
       localStorage.setItem(key, JSON.stringify(todoData[key]));
    }
};

todoControl.addEventListener('submit', function(event) {
    event.preventDefault();

    const newTodo = {
        value: headerInput.value,
        completed: false,
    };
    if (newTodo.value !== '') {
        todoData.push(newTodo);
        headerInput.value = '';
    }

    render();
});

render();


