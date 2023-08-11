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
    updateItems(TodoItems); // Update the count of total todo items
}



// Function to create the template for each todo item.
let createTodoTemplate = (data) => {
    const { id, todoData, active } = data; // Destructure the data object for easy access
    const isChecked = active ? 'images/checkbox.svg' : 'images/unckecked-circle.svg'; // Set the appropriate checkbox image based on the active status
    const textDecoration = active ? 'text-decoration: line-through; opacity: 0.5;' : ''; // Set text-decoration style for completed items
    const containerClass = isOn ? 'newContainer-light' : 'newContainer-dark'; // Choose the appropriate class based on the theme
    // Return the HTML template for the todo item using the provided data
    return `
        <div id="todo-${id}" class="${containerClass} wrap items" draggable="true"
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
function updateItems(updates) {
    document.querySelector('.No').innerHTML = updates.length;
    document.querySelector('.Num').innerHTML = updates.length;
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
            active: false, // Set the initial active status to false (not completed)
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
    updateItems(TodoItems);
}

// Event listeners for filter buttons (Not described in the provided code).
// Functions delComplete, selectAll, completed, and active are executed when the buttons are clicked.


//delete completed items
const deleteCompletedItems=()=>{
    TodoItems = TodoItems.filter(todo => !todo.active); // Filter out completed items
    allTodo(TodoItems); // Redraw all todo items to update the UI
}
const delComplete = document.querySelector('.delComplete');
const dellComplete = document.querySelector('.dellComplete');
delComplete.addEventListener('click', deleteCompletedItems);
dellComplete.addEventListener('click', deleteCompletedItems);



//show all todo items
const selectAll = document.querySelector('#first');
selectAll.addEventListener('click', () => {
    allTodo(TodoItems);
    updateItems(TodoItems);

    // Toggle the color of the button
    selectAll.style.color = selectAll.style.color === "blue" ? "#78787877" : "blue";

    // Reset color of other buttons
    completed.style.color = "#78787877";
    active.style.color = "#78787877";
});

//show only completed items
const completed = document.querySelector('#third');
completed.addEventListener('click', () => {
    const completedItems = TodoItems.filter(todo => todo.active);
    allTodo(completedItems);
    updateItems(completedItems);

    // Toggle the color of the button
    completed.style.color = completed.style.color === "blue" ? "#78787877" : "blue";

    // Reset color of other buttons
    selectAll.style.color = "#78787877";
    active.style.color = "#78787877";
});

//show only uncompleted items
const active = document.querySelector('#second');
active.addEventListener('click', () => {
    const activeItems = TodoItems.filter(todo => !todo.active);
    allTodo(activeItems);
    updateItems(activeItems);

    // Toggle the color of the button
    active.style.color = active.style.color === "blue" ? "#78787877" : "blue";

    // Reset color of other buttons
    selectAll.style.color = "#78787877";
    completed.style.color = "#78787877";
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




//light and dark mode
// Todo List App

// Initialize global variables
let container = document.querySelector('.wrap'); // Get the main container element
let bar = document.querySelector('.bar'); // Get the top bar element
let mini = document.querySelector('.mini'); // Get the top bar element


// Change mode: Update this function for proper toggle and apply the styles to the entire document body.
let mode = document.querySelector('.mode'); // Get the mode (theme) button element
let isOn = false; // Variable to track the current theme (true for dark mode, false for light mode)


const toggle = (e) => { // Function to toggle the theme
    e.preventDefault(); // Prevent the default behavior of the button click
    isOn = !isOn; // Toggle the theme variable

    // Update theme-specific elements and styles
    document.querySelector('.light').src = isOn ? 'images/icon-sun.svg' : 'images/icon-moon.svg'; // Change the icon of the mode button
    document.querySelector('#desktop-light-img').src = isOn ? 'images/bg-desktop-dark.jpg' : 'images/bg-desktop-light.jpg'; // Change the background image
    document.body.style.backgroundColor = isOn ? '#171823' : '#FAFAFA'; // Set the background color of the entire document body
    document.querySelector('.content').style.backgroundColor = isOn ? '#25273D' : 'white'; // Set the background color of the main content area
    document.querySelector('.content').style.boxShadow = isOn ? '0px 35px 50px -15px rgba(15, 15, 15, 0.5)' : '0px 35px 50px -15px rgba(194, 195, 214, 0.50)'; // Apply a box shadow for the main content area
    document.querySelector('#taskArea').style.backgroundColor = isOn ? '#25273D' : 'white'; // Set the background color of the task area
    document.querySelector('#taskArea').style.color = isOn ? '#ffffff' : '#000000'; // Set the text color of the task area
    container.style.backgroundColor = isOn ? '#25273D' : 'white'; // Set the background color of the main container
    container.style.color = isOn ? '#ffffff' : '#000000'; // Set the text color of the main container
    bar.style.backgroundColor = isOn ? '#25273D' : 'white'; // Set the background color of the top bar
    bar.style.color = isOn ? '#ffffff' : '#000000'; // Set the text color of the top bar
    bar.style.boxShadow = isOn ? '0px 35px 50px -15px rgba(15, 15, 15, 0.5)' : '0px 35px 50px -15px rgba(194, 195, 214, 0.50)'; // Apply a box shadow for the top bar
    mini.style.backgroundColor = isOn ? '#25273D' : 'white'; // Set the background color of the top bar
    mini.style.color = isOn ? '#ffffff' : '#000000'; // Set the text color of the top bar
    mini.style.boxShadow = isOn ? '0px 35px 50px -15px rgba(15, 15, 15, 0.5)' : '0px 35px 50px -15px rgba(194, 195, 214, 0.50)'; // Apply a box shadow for the top bar

    // Apply dark mode styles to newContainer elements
    const newContainers = document.querySelectorAll('.newContainer-dark'); // Get all elements with the class "newContainer"
    newContainers.forEach(newContainer => {
        newContainer.style.backgroundColor = isOn ? '#25273D' : 'white'; // Set the background color of each "newContainer" element
        newContainer.style.boxShadow = isOn ? '0px 35px 50px -15px rgba(15, 15, 15, 0.5)' : '0px 35px 50px -15px rgba(194, 195, 214, 0.50)'; // Apply a box shadow for each "newContainer" element
        newContainer.style.color = isOn ? '#ffffff' : '#000000'; // Set the text color of each "newContainer" element
    });
    const newContainersLight = document.querySelectorAll('.newContainer-light'); // Get all elements with the class "newContainer"
    newContainersLight.forEach(newContainer => {
        newContainer.style.backgroundColor = isOn ? '#25273D' : 'white'; // Set the background color of each "newContainer" element
        newContainer.style.boxShadow = isOn ? '0px 35px 50px -15px rgba(15, 15, 15, 0.5)' : '0px 35px 50px -15px rgba(194, 195, 214, 0.50)'; // Apply a box shadow for each "newContainer" element
        newContainer.style.color = isOn ? '#ffffff' : '#000000'; // Set the text color of each "newContainer" element
    });
}

// Add a click event listener to the mode button to toggle the theme
mode.addEventListener('click', (e) => {
    console.log("clicked on mode"); // Print a message to the console to indicate that the mode button was clicked
    toggle(e); // Call the toggle function to switch the theme
});