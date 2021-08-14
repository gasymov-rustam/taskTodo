// const todo = {
//     id: 1,
//     title: 'Todo title',
//     body: 'Todo text',
//     done: false,
//     createdAt: 160542151043,
//     updatedAt: null
// }
const todos = JSON.parse(window.localStorage.getItem('todos'));
const createFormEl = document.getElementById('createToDoList');
const resultPrintEl = document.getElementById('todosNew');
const todosProgress = document.getElementById('todosProgress');
const wrap = document.getElementById('wrap')

if (!window.localStorage.getItem('todos')) {
    window.localStorage.setItem('todos', JSON.stringify([]))

} else {
    renderTodos(resultPrintEl, JSON.parse(window.localStorage.getItem('todos')));
}

resultPrintEl.addEventListener('click', e => {
    const btn = e.target.closest('button');
    if (btn) {
        const action = btn.dataset.action;
        const todoClass = btn.closest('.todoTask');
        const todoID = parseInt(todoClass.dataset.id);
        const todoIDX = todos.findIndex(todo => todo.id === todoID);
        if (action === 'progress' || action === 'done') {
            todos[todoIDX].updateAT = Date.now();
            todos[todoIDX].status++;
        } else if (action === 'delete') {
            todos.splice(todoIDX, 1);
        }
        window.localStorage.setItem('todos', JSON.stringify(todos))
        renderTodos(resultPrintEl, JSON.parse(window.localStorage.getItem('todos')));
        todos.filter( field => {
            if (field.status === 1) return renderTodos(todosProgress, field);
        })
        // console.log(todos.filter(field => field.status === 1))
            /* console.log(field.status);
            if (field.status === 1) {
                return console.log(todos);
            }
        }) */
    }
})

createFormEl.addEventListener('submit', e => {
    e.preventDefault();
    const newTodo = {
        id: Date.now(),
        title: e.target.title.value,
        body: e.target.body.value,
        createdAT: Date.now(),
        updateAT: null,
        status: 0
    }
    todos.push(newTodo);
    renderTodos(resultPrintEl, todos);
    e.target.reset();
    window.localStorage.setItem('todos', JSON.stringify(todos));
})

function renderTodos(section, todos) {
    section.innerHTML = createTodosHTML(todos).join('');
}

function createTodosHTML(todos) {
    return todos.map(todo => createTodoHTML(todo));
}

function createTodoHTML(todo) {
    let actionBtn = ''
    switch (todo.status) {
        case 0:
            actionBtn = '<button data-action="progress">Set in progress!</button>'
            break;
        case 1:
            actionBtn = '<button data-action="done">Set it done!</button>'
            break;
        case 2:
            actionBtn = '<button data-action="delete">Delete!</button>'
            break;
    }

    return `<div class="todoTask ${todoStatus(todo.status)}" data-id="${todo.id}">
                ${todo.title ? `<h2>${todo.title}</h2>` : ''}
                <h3>status: ${todoStatus(todo.status)}</h3>
                ${todo.body ? `<p>${todo.body}</p>` : ''}
                <div>
                    <time>Created: ${new Date(todo.createdAT).toLocaleString()}</time>
                    ${todo.updatedAt ? `<time>Updated: ${new Date(todo.updatedAt).toLocaleString()}</time>` : ''}
                </div>
                ${actionBtn}
            </div>`
}

function todoStatus(status) {
    if (!isNaN(Number(status))) {
        switch (Number(status)) {
            case 0:
                return 'new'
            case 1:
                return 'progress'
            case 2:
                return 'done'
            default:
                throw 'Unknown command'
        }
    } else {
        switch (status) {
            case 'new':
                return 0
            case 'progress':
                return 1
            case 'done':
                return 2
            default:
                throw 'Unknown status!'
        }

    }
}

