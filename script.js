let source = document.querySelector('#taskArea');
let todoListContainer = document.querySelector('#todoList');

let TodoItems = [];
let nextId = 1; // Initialize the nextId with 1

source.addEventListener('keypress', addTodoItem);

function allTodo(todos = TodoItems) {
    todoListContainer.innerHTML = todos.map(todo => createTodoTemplate(todo)).join('');
    updateItems();
}
const match = window.matchMedia('max-width: 992px');
let createTodoTemplate = (data) => {
    // data - { id: 1 , tododata, active}
    const {id, todoData, active} = data;
    const isChecked = active ? 'images/checkbox.svg' : 'images/unckecked-circle.svg';
    const textDecoration = active ? 'text-decoration: line-through; opacity: 0.5;' : '';
    return `
        <div id="todo-${id}" class="newContainer wrap items" draggable="true"
            onmouseover="showCrossButton(this)" 
            onmouseout="hideCrossButton(this)" 
            onclick="toggleActiveClass(${id})"
            ondragstart="handleDragStart(event, ${id})"
            ondragover="handleDragOver(event)"
            ondrop="handleDrop(event, ${id})"  
        >
            <span>
                <img class="circleImage" src="${isChecked}" />
            </span>
            <p class="accessData" style="width: 100%; ${textDecoration}">
                ${todoData}
            </p>
            <span id="${id}" onclick="deleteTodoItem(this)" class="crossButton" style="display: none;">
                <img src="images/icon-cross.svg">
            </span>
        </div>`;
};


// let drag to id == null
let draggedTodoId = null;

function showCrossButton(container) {
    const crossButton = container.querySelector('.crossButton');
    crossButton.style.display = 'inline-block';
}

function hideCrossButton(container) {
    const crossButton = container.querySelector('.crossButton');
    crossButton.style.display = 'none';
}

function toggleActiveClass(id) {
    const todo = TodoItems.find(item => item.id === id);
    todo.active = ! todo.active;
    allTodo();
}

function updateItems() {
    document.querySelector('#No').innerHTML = TodoItems.length;
}

function generateUniqueId() {
    return nextId++; // Return the current nextId and increment it for the next use
}

function addTodoItem(e) {
    if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        const newTodo = {
            id: generateUniqueId(), // Assign a unique ID
            todoData: source.value.trim(),
            active: false
        };
        if (newTodo.todoData) {
            TodoItems.push(newTodo);
            source.value = '';
            allTodo(); // this -> 
        }
    }
}

function deleteTodoItem(element) {
    const id = Number(element.id); // Convert the ID to a number
    TodoItems = TodoItems.filter(todo => todo.id !== id);
    allTodo(TodoItems);
}

const delComplete = document.querySelector('.delComplete');
delComplete.addEventListener('click', () => {
    TodoItems = []
    allTodo(TodoItems);
});

const selectAll = document.querySelector('#first');
selectAll.addEventListener('click', () => {
    allTodo(TodoItems);
});

const completed = document.querySelector('#third');
completed.addEventListener('click', () => {
    const completedTodos = TodoItems.filter(todo => todo.active);
    allTodo(completedTodos);
});

const active = document.querySelector('#second');
active.addEventListener('click', () => {
    const activeTodos = TodoItems.filter(todo => !todo.active);
    allTodo(activeTodos);
});


// drag event functions
function handleDragStart(event, id) {
    event.dataTransfer.setData('text/plain', id);
    draggedTodoId = id;
}

// Function to handle drag over event
function handleDragOver(event) {
    event.preventDefault();
}

// Function to handle drop event
function handleDrop(event, id) {
    event.preventDefault();
    const sourceId = draggedTodoId;
    const targetId = id;

    // Swap the todos in TodoItems array based on their IDs
    const sourceIndex = TodoItems.findIndex(item => item.id === sourceId);
    const targetIndex = TodoItems.findIndex(item => item.id === targetId);

    if (sourceIndex !== -1 && targetIndex !== -1) {
        [
            TodoItems[sourceIndex], TodoItems[targetIndex]
        ] = [
            TodoItems[targetIndex], TodoItems[sourceIndex]
        ];
    }

    allTodo(); // Update the UI with the modified TodoItems array
}


