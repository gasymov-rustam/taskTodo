const createFormEl = document.getElementById("createToDoList");
const todosNew = document.getElementById("todosNew");
const todosProgress = document.getElementById("todosProgress");
const todosDelete = document.getElementById("todosDelete");
const wrapTodoList = document.getElementById("wrapTodoList");

if (!window.localStorage.getItem("todos")) window.localStorage.setItem("todos", JSON.stringify([]));
let todos = JSON.parse(window.localStorage.getItem("todos"));

renderByTodos(todos, todosNew, todosProgress, todosDelete);

wrapTodoList.addEventListener("click", (e) => {
    const currentBtn = e.target.closest("button");
    if (currentBtn) {
        const action = currentBtn.dataset.action;
        const todoID = +currentBtn.closest(".todoTask").dataset.id;
        const todoIDX = todos.findIndex((todo) => todo.id === todoID);
        if (action === "new" || action === "progress") {
            todos[todoIDX].updatedAt = Date.now();
            todos[todoIDX].status++;
        } else todos.splice(todoIDX, 1);
        todos.sort((a, b) => a["title"].localeCompare(b["title"]) || a["createdAt"] - b["createdAt"] || a["updatedAt"] - b["updatedAt"]);
        renderByTodos(todos, todosNew, todosProgress, todosDelete);
        window.localStorage.setItem("todos", JSON.stringify(todos));
    }
});

createFormEl.addEventListener("submit", (e) => {
    e.preventDefault();
    const newTodo = new Todo(e.target.title.value, e.target.body.value);
    todos.push(newTodo);
    todos.sort((a, b) => a["title"].localeCompare(b["title"]) || a["createdAt"] - b["createdAt"] || a["updatedAt"] - b["updatedAt"]);
    // todos.sort((a, b) => a.title.localeCompare(b.title) || a.createdAt - b.createdAt || a.updatedAt - b.udatedAt);
    const colFirst = todos.filter((todo) => todo.status === 0);
    renderTodos(todosNew, colFirst);
    window.localStorage.setItem("todos", JSON.stringify(todos));
    e.target.reset();
});

function renderTodos(elem, array) {
    elem.innerHTML = createTodosHTML(array).join("");
}

function createTodosHTML(array) {
    return array.map((todo) => createTodoHTML(todo));
}

function createTodoHTML(todo) {
    let actionBtn = "";
    switch (todo.status) {
        case 0:
            actionBtn = `<button data-action="new">Set in Progress!</button>`;
            break;
        case 1:
            actionBtn = `<button data-action="progress">Set in Done!</button>`;
            break;
        case 2:
            actionBtn = `<button data-action="done">Set in Delete!</button>`;
            break;
    }

    return `<div class="todoTask ${createTodoStatus(todo.status)}" data-id="${todo.id}">
                <h2>${todo.title}</h2>
                ${todo.body ? `<p>${todo.body}</p>` : ""}
                <p>Status: ${todo.status}</p>
                <time>CreatedAt: ${Date.now(todo.createdAt).toLocaleString()}</time>
                ${todo.updatedAt ? `<time>updatedAt: ${Date.now(todo.updateddAt).toLocaleString()}</time>` : ""}
                ${actionBtn}
            </div>`;
}

function Todo(title, body) {
    this.id = Date.now();
    this.title = title;
    this.body = body;
    this.status = 0;
    this.createdAt = this.id;
    this.updatedAt = null;
}

function createTodoStatus(status) {
    if (!isNaN(Number(status))) {
        switch (Number(status)) {
            case 0:
                return "new";
            case 1:
                return "progress";
            case 2:
                return "done";
            default:
                throw "Unknown command!";
        }
    } else {
        switch (status) {
            case "new":
                return 0;
            case "progress":
                return 1;
            case "done":
                return 2;
            default:
                throw "Unknown command!";
        }
    }
}

function renderByTodos(array, sectionFirst, sectionSecond, sectionThird) {
    const columnFirst = array.filter((todo) => todo.status === 0);
    const columnSecond = array.filter((todo) => todo.status === 1);
    const columnThird = array.filter((todo) => todo.status === 2);
    renderTodos(sectionFirst, columnFirst);
    renderTodos(sectionSecond, columnSecond);
    renderTodos(sectionThird, columnThird);
}