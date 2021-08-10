// const todo = {
//     id: 1,
//     title: 'Todo title',
//     body: 'Todo text',
//     done: false,
//     createdAt: 160542151043,
//     updatedAt: null
// }
/* const todos = []
const todosEl = document.getElementById('todos')
const addFormEl = document.getElementById('addForm')

renderTodos(todosEl, todos)


todosEl.addEventListener('click', e => {
    const btn = e.target.closest('button')
    if (btn) {
        const action = btn.dataset.action
        const todoEl = btn.closest('.todo')
        const todoId = +todoEl.dataset.id
        const todoIdx = todos.findIndex(todo => todo.id === todoId)
        if (action === 'done') {
            todos[todoIdx].updatedAt = Date.now()
            todos[todoIdx].done = true
        } else if (action === 'delete') {
            todos.splice(todoIdx, 1)
        }
        renderTodos(todosEl, todos)
    }
})

addFormEl.addEventListener('submit', e => {
    e.preventDefault()
    const newTodo = {
        title: e.target.title.value,
        body: e.target.body.value,
        createdAt: Date.now(),
        updatedAt: null,
        done: false,
        id: Date.now()
    }
    console.log(newTodo);
    todos.push(newTodo)
    console.log(todos);
    renderTodos(todosEl, todos)
    e.target.reset()
})

function renderTodos(todosEl, todos) {
    todosEl.innerHTML = createTodosHtml(todos).join('');
}

function createTodosHtml(todos) {
    return todos.map(todo => createTodoHtml(todo))
}

function createTodoHtml(todo) {
    return `<div class="todo" data-id="${todo.id}">
    <h2>${todo.title}</h2>
    ${todo.body ? `<p>${todo.body}</p>` : ''} 
    ${!todo.done ? `<button data-action="done">Done!</button>` : `<button data-action="delete">Delete!</button>`}
    <div>
        <time>Created: ${new Date(todo.createdAt).toLocaleString()}</time>
        ${todo.updatedAt ? `<time>Updated: ${new Date(todo.updatedAt).toLocaleString()}</time>` : ''}
    </div>
</div>`;
} */

const createFormEl = document.getElementById('createToDoList');
const resultPrintEl = document.getElementById('todos');
const todos =[];

createFormEl.addEventListener('submit', e=> {
    e.preventDefault();
    const newTodo ={
        title: e.target.title.value,
        body: e.target.body.value,
        createdAt: Date.now(),
        updateAT: null,
        done: false,
        id: Date.now(),
    }
    console.log(newTodo);
    todos.push(newTodo);
    console.log(todos);
    renderTodos(createFormEl, todos);
    e.target.reset();
})

function renderTodos(section, todos) {
    section.innerHTML = createTodosHtml(todos).join('');
}

function createTodosHtml(todos) {
    return todos.map(todo=>createTodoHtml(todo));
}

function createTodoHtml(todo) {
    return `<div class="todo" data-id="${todo.id}">
        <h2>${todo.title}</h2>
        ${todo.body ? `<p>${todo.body}</p>`: ''}
        ${!todo.done ? `<button data-action="done">Done!</button>`: `<button data-action="delete">Delete!</button>`}
        <div>
        <time>Created: ${new Date(todo.createdAT).toLocaleString()}</time>
        ${todo.updateAT ? `<time>Updated: ${new Date(todo.updateAT).toLocalString()}</time>` : ''}
        </div>
    </div>`
}