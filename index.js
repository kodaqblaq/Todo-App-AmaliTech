// Initialize global variables - No changes needed.
let container = document.querySelector('.wrap');
let bar = document.querySelector('.bar');


// Change mode: Update this function for proper toggle and apply the styles to the entire document body.
let mode = document.querySelector('.mode');
let isOn = false;


const toggle = (e) => { // Toggle the theme
    e.preventDefault()
    isOn = ! isOn
    document.querySelector('.light').src = isOn ? 'images/icon-sun.svg' : 'images/icon-moon.svg';
    document.querySelector('#desktop-light-img').src = isOn ? 'images/bg-desktop-dark.jpg' : 'images/bg-desktop-light.jpg';
    document.body.style.backgroundColor = isOn ? '#171823' : '#FAFAFA'
    document.querySelector('.content').style.backgroundColor = isOn ? '#25273D' : 'white'
    document.querySelector('.content').style.boxShadow = isOn ? '0px 35px 50px -15px rgba(15, 15, 15, 0.5)' : '0px 35px 50px -15px rgba(194, 195, 214, 0.50)'
    document.querySelector('#taskArea').style.backgroundColor = isOn ? '#25273D' : 'white'
    document.querySelector('#taskArea').style.color = isOn ? '#ffffff' : '#000000'
    container.style.backgroundColor = isOn ? '#25273D' : 'white';
    container.style.color = isOn ? '#ffffff' : '#000000'
    bar.style.backgroundColor = isOn ? '#25273D' : 'white';
    bar.style.color = isOn ? '#ffffff' : '#000000'
    bar.style.boxShadow = isOn ? '0px 35px 50px -15px rgba(15, 15, 15, 0.5)' : '0px 35px 50px -15px rgba(194, 195, 214, 0.50)'
    // Apply dark mode styles to newContainer elements
    const newContainers = document.querySelectorAll('.newContainer');
    newContainers.forEach(newContainer => {
        newContainer.style.backgroundColor = isOn ? '#25273D' : 'white';
        newContainer.style.boxShadow = isOn ? '0px 35px 50px -15px rgba(15, 15, 15, 0.5)' : '0px 35px 50px -15px rgba(194, 195, 214, 0.50)'
        newContainer.style.color = isOn ? '#ffffff' : '#000000'
    });
}

// Add a click event listener to the mode button to toggle the theme
mode.addEventListener('click', (e) => {
    console.log("clicked on mode")
    toggle(e)
});
