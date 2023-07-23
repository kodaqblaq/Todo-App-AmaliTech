// Todo List App

// Global variables to store references to HTML elements.
let source = document.querySelector('#taskArea'); // Input field to add new tasks
let todoListContainer = document.querySelector('#todoList'); // Container to display todo items

// Array to store the list of TodoItems and variable to generate unique IDs for new items.
let TodoItems = [];
let nextId = 1; // Initialize the nextId with 1

// Event listener for the 'keypress' event on the input field to add a new todo item.
source.addEventListener('keypress', addTodoItem);

// Function to display all todo items. If no 'todos' parameter is provided, it will use TodoItems array.
function allTodo(todos = TodoItems) {
    todoListContainer.innerHTML = todos.map(todo => createTodoTemplate(todo)).join('');
    updateItems(); // Update the count of total todo items
}

// Match media to check for screen width. (Not used in the code provided)
const match = window.matchMedia('max-width: 992px');

// Function to create the template for each todo item.
let createTodoTemplate = (data) => {
    const { id, todoData, active } = data; // Destructure the data object for easy access
    const isChecked = active ? 'images/checkbox.svg' : 'images/unckecked-circle.svg'; // Set the appropriate checkbox image based on the active status
    const textDecoration = active ? 'text-decoration: line-through; opacity: 0.5;' : ''; // Set text-decoration style for completed items
    // Return the HTML template for the todo item using the provided data
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

// Initialize the draggedTodoId as null to track the dragged todo item.
let draggedTodoId = null;

// Function to show the delete button on hover.
function showCrossButton(container) {
    const crossButton = container.querySelector('.crossButton');
    crossButton.style.display = 'inline-block';
}

// Function to hide the delete button on mouseout.
function hideCrossButton(container) {
    const crossButton = container.querySelector('.crossButton');
    crossButton.style.display = 'none';
}

// Function to toggle the active class (completed status) of a todo item.
function toggleActiveClass(id) {
    const todo = TodoItems.find(item => item.id === id);
    todo.active = !todo.active; // Toggle the active status
    allTodo(); // Redraw all todo items to update the UI
}

// Function to update the count of total todo items.
function updateItems() {
    document.querySelector('#No').innerHTML = TodoItems.length;
}

// Function to generate a unique ID for new todo items.
function generateUniqueId() {
    return nextId++; // Return the current nextId and increment it for the next use
}

// Function to add a new todo item when the Enter key is pressed.
function addTodoItem(e) {
    if (e.keyCode === 13 || e.which === 13) { // Check if Enter key is pressed
        e.preventDefault(); // Prevent the default behavior of the Enter key
        const newTodo = {
            id: generateUniqueId(), // Assign a unique ID to the new todo item
            todoData: source.value.trim(), // Get the todo data from the input field and remove leading/trailing spaces
            active: false // Set the initial active status to false (not completed)
        };
        if (newTodo.todoData) { // Check if the todo data is not empty
            TodoItems.push(newTodo); // Add the new todo item to the TodoItems array
            source.value = ''; // Clear the input field
            allTodo(); // Redraw all todo items to update the UI
        }
    }
}

// Function to delete a todo item when the delete button is clicked.
function deleteTodoItem(element) {
    const id = Number(element.id); // Convert the ID to a number
    TodoItems = TodoItems.filter(todo => todo.id !== id); // Filter out the todo item with the given ID from the TodoItems array
    allTodo(TodoItems); // Redraw all todo items to update the UI
}

// Event listeners for filter buttons (Not described in the provided code).
// Functions delComplete, selectAll, completed, and active are executed when the buttons are clicked.
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
