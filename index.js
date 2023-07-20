 // Initialize global variables - No changes needed.
 let source = document.querySelector('#taskArea');
 let container = document.querySelector('.wrap');
 let data = document.querySelector('.items');
 let bar = document.querySelector('.bar');
 let arr = [];
 let activeArr = [];

 // Change mode: Update this function for proper toggle and apply the styles to the entire document body.
 let mode = document.querySelector('.mode');
 let isOn = false;
 
 const toggle = () => {
   // Toggle the theme
   isOn = !isOn;
   if (isOn) {
     // Set dark mode styles
     document.querySelector('.light').src = 'images/icon-sun.svg';
     document.querySelector('#desktop-light-img').src = 'images/bg-desktop-dark.jpg';
     document.body.style.backgroundColor = '#171823';
     document.querySelector('.content').style.backgroundColor = '#25273D';
     document.querySelector('.content').style.boxShadow= '0px 35px 50px -15px rgba(15, 15, 15, 0.5)';
     source.style.backgroundColor = '#25273D';
     source.style.color = '#ffffff';
     container.style.backgroundColor = '#25273D';
     container.style.color = '#ffffff';
     bar.style.backgroundColor = '#25273D';
     bar.style.color = '#ffffff';
     bar.style.boxShadow= '0px 35px 50px -15px rgba(15, 15, 15, 0.5)';
     // Apply dark mode styles to newContainer elements
     const newContainers = document.querySelectorAll('.newContainer');
     newContainers.forEach(newContainer => {
       newContainer.style.backgroundColor = '#25273D';
       newContainer.style.boxShadow= '0px 35px 50px -15px rgba(15, 15, 15, 0.5)';
        newContainer.style.color = '#ffffff';});
   } else {
     // Set light mode styles
     document.querySelector('.light').src = 'images/icon-moon.svg';
     document.querySelector('#desktop-light-img').src = 'images/bg-desktop-light.jpg';
     document.body.style.backgroundColor = '#FAFAFA';
     document.querySelector('.content').style.backgroundColor = 'white';
     document.querySelector('.content').style.boxShadow= '0px 35px 50px -15px rgba(194, 195, 214, 0.50)';
     source.style.backgroundColor = 'white';
     source.style.color = '#000000';
     container.style.backgroundColor = 'white';
     container.style.color = '#000000';
     bar.style.backgroundColor = 'white';
     bar.style.color = '#000000';
     bar.style.boxShadow= '0px 35px 50px -15px rgba(194, 195, 214, 0.50)';
    // Reset dark mode styles on newContainer elements
    const newContainers = document.querySelectorAll('.newContainer');
    newContainers.forEach(newContainer => {
      newContainer.style.backgroundColor = 'white';
      newContainer.style.boxShadow= '0px 35px 50px -15px rgba(194, 195, 214, 0.50)';
      newContainer.style.color = '#000000'});
   }
 }

 // Add a click event listener to the mode button to toggle the theme
 mode.addEventListener('click', toggle);

// creating elements and features when enter button is pushed
if(source && data) {
source.addEventListener('keypress', (event) => {
  let keyCode = event.keyCode || event.which;
  if (keyCode === 13) {
    event.preventDefault();
//adding a circle check button 
    let accessCircle = document.createElement('span');
    let circleImage = document.createElement('img');
    circleImage.className = 'circleImage';
    circleImage.src = 'images/unckecked-circle.svg';
    accessCircle.appendChild(circleImage);

//cross button
     let accessCross = document.createElement('span');
     let crossImage = document.createElement('img');
     accessCross.className = "crossButton";
     accessCross.appendChild(crossImage);
    
//creating element to append source to individual containers
    let accessData = document.createElement('p');
    accessData.innerHTML = source.value;
    data.appendChild(accessData);
    accessData.className = 'accessData';
    accessData.style='width: 100%;'

    
    //append all created elements to new container 
    let newContainer = document.createElement('div');
    newContainer.className = 'newContainer';
    newContainer.classList.add('wrap', 'items');
    newContainer.appendChild(accessCircle);
    newContainer.appendChild(accessData);
    newContainer.appendChild(accessCross);
    mode.addEventListener('click', toggle);

    //hover effect on cross image
    newContainer.addEventListener('mouseenter', (e)=>{
      e.preventDefault();
        crossImage.src = 'images/icon-cross.svg';
        accessCross.style.display="inline-block";
   });
   newContainer.addEventListener('mouseleave', (e)=>{
    e.preventDefault();
     accessCross.style.display="none"
    });
    
    //on click effects when task is completed
    newContainer.addEventListener('click', (e)=>{
      e.preventDefault();
      circleImage.src = 'images/checkbox.svg';
      accessData.style='text-decoration:line-through; width: 100%; opacity:0.5';
      newContainer.classList.add('active')
 });

 //on double click effect to uncomplete task
     newContainer.addEventListener('dblclick', (e)=>{
      e.preventDefault();
      circleImage.src = 'images/unckecked-circle.svg';
      accessData.style='text-decoration: none; width:100%';
      newContainer.classList.remove('active')

     });
 
 //control center for elements
bar.style.display = 'flex';

    //append new container to main container
    container.parentNode.appendChild(newContainer);

    source.value = '';
    
    arr.push(newContainer);
    let countItems = document.querySelector('#No');
    countItems.innerHTML = arr.length;
    
      //click to delete feature
      accessCross.addEventListener('click',(e)=>{
        container.parentNode.removeChild(newContainer);
        countItems.innerHTML = arr.length-1;
  })
    //delete all todo list with clear completed
    document.querySelector('.delComplete').addEventListener('click', (e) => {
      container.parentNode.removeChild(newContainer);
      countItems.innerHTML=arr.length = 0;
    })
  
    // class for all the items - items
    let items = document.querySelectorAll('.items');
    let selectAll = document.querySelector('#first');
    let active = document.querySelector('#second');
    let completed = document.querySelector('#third');
    let getContainer = document.querySelector('.wrap-container');
    let delComplete = document.querySelector('.delComplete')
    console.log("get container ", getContainer);
    
    // Create a copy of the original items NodeList
    const itemsCopy = Array.from(items);
    
    selectAll.addEventListener('click', (e) => {
      e.preventDefault();
      getContainer.innerHTML = '';
      // Append all items from the copy
      itemsCopy.forEach(item => {
        getContainer.appendChild(item);
      });
    });
    
    completed.addEventListener('click', (e) => {
      e.preventDefault();
      getContainer.innerHTML = '';
      // Filter the active items from the copy and append them
      const activeItems = itemsCopy.filter(item => item.classList.contains('active'));
      activeItems.forEach(item => {
        getContainer.appendChild(item);
      });
    });
    

    active.addEventListener('click', (e) =>  {
      e.preventDefault();
      getContainer.innerHTML = '';
      // Filter the active items from the copy and append them
      const activeItems = itemsCopy.filter(item => !item.classList.contains('active'));
      activeItems.forEach(item => {
        getContainer.appendChild(item);
      });
    })

    delComplete.addEventListener('click', (e) => {
      e.preventDefault()
      const nonActiveItems = itemsCopy.filter(item => !item.classList.contains('active'));
      getContainer.innerHTML = '';
      nonActiveItems.forEach(item => {
      getContainer.appendChild(item);
  });
    })

    // class for only items with active
    // class for only items without active

  }
});
}