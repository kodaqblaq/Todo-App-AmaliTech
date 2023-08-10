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
    const newContainers = document.querySelectorAll('.newContainer'); // Get all elements with the class "newContainer"
    newContainers.forEach(newContainer => {
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