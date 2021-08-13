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
        const todoClass= btn.closest('.todo');
        const todoID = parseInt(todoClass.dataset.id);
        const todoIDX = todos.findIndex(todo => todo.id === todoID);
        if (action === 'done') {
            todos[todoIDX].updateAT = Date.now();
            todos[todoIDX].done = true;
        } else if (action === 'delete') {
            todos.splice(todoIDX, 1);
        }
        renderTodos(resultPrintEl, todos);
        if (todos.length !==0) resultPrintEl.insertAdjacentHTML('afterbegin', `<h2 class="todos-title">Todo List</h2>`)
    }
})

createFormEl.addEventListener('submit', e=> {
    e.preventDefault();
    const newTodo ={
        id: Date.now(),
        title: e.target.title.value,
        body: e.target.body.value,
        createdAT: Date.now(),
        updateAT: null,
        done: false
    }
    todos.push(newTodo);
    renderTodos(resultPrintEl, todos);
    resultPrintEl.insertAdjacentHTML('afterbegin', `<h2 class="todos-title">Todo List</h2>`)
    e.target.reset();
    
})

function renderTodos(section, todos){
    section.innerHTML = createTodosHTML(todos).join('');
}

function createTodosHTML(todos) {
    return todos.map(todo => createTodoHTML(todo));
}

function createTodoHTML(todo){
    return `<div class="todo" data-id="${todo.id}">
                <h2>${todo.title}</h2>
                ${todo.body ? `<p>${todo.body}</p>` : true}
                <div>
                    <time>Created: ${new Date(todo.createdAT).toLocaleString()}</time>
                    ${todo.updateAT? `<time>Update: : ${new Date(todo.updateAT).toLocaleString()}</time>` : ''}
                </div>
                ${todo.done ? `<button data-action="delete">Delete</button>` : `<button data-action="done">Done</button>`}
            </div>`
}
