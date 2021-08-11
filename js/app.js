// const todo = {
//     id: 1,
//     title: 'Todo title',
//     body: 'Todo text',
//     done: false,
//     createdAt: 160542151043,
//     updatedAt: null
// }

const createFormEl = document.getElementById('createToDoList');
const resultPrintEl = document.getElementById('todos');
const todos = [];

resultPrintEl.addEventListener('click', e=> {
    const btn = e.target.closest('button');
    if (btn) {
        const action = btn.dataset.action;
        const todoClass = btn.closest('.todo');
        const todoId = +todoClass.dataset.id;
        const todoIdx = todos.findIndex(todo => todoId === todo.id);
        if (action === 'done') {
            todos[todoIdx].updateAT = Date.now();
            todos[todoIdx].done = true;
        } else if (action === 'delete') {
            todos.splice(todoIdx, 1)
        }
        renderTodos(resultPrintEl, todos);
    }
})

createFormEl.addEventListener('submit', e => {
    e.preventDefault();
    const newTodo = {
        id: Date.now(),
        title: e.target.title.value,
        body: e.target.body.value,
        createdAt: Date.now(),
        updateAT: null,
        done: false,
    }
    todos.push(newTodo);
    renderTodos(resultPrintEl, todos);
    e.target.reset();
    console.log(todos);
})

function renderTodos(section, arr) {
    section.innerHTML = createTodosHtml(arr).join('');
}

function createTodosHtml(todos) {
    return todos.map(todo => createTodoHtml(todo));
}

function createTodoHtml(todo) {
    return `<div class="todo" data-id="${todo.id}">
                <h2>${todo.title}</h2>
                ${todo.body ? `<p>${todo.body}</p>`: ''}
                ${todo.done ? `<button data-action="delete">Delete</button>`:`<button data-action="done">Done</button>`}
                <div>
                    <time>${new Date(todo.createdAt).toLocaleString()}</time>
                    ${todo.updateAT ? `<time>${new Date(todo.updateAT).toLocaleString()}</time>`: ''}
                </div>
            </div>`
}
