

// const addButton = document.querySelector('create_task').addEventListener('click', function(){
//     const taskForm = document.getElementById('modal')
//      return document.body.getElementById.display(taskForm)
// })

const addButton = document.querySelector('#create_task'); // Use '#' to select by ID
const taskForm = document.getElementById('modal');
const closeButton = document.getElementById('close-button')

// Click on create task and open the form. 
addButton.addEventListener('click', function() {
  taskForm.style.display = 'block'; // Set the display style to 'block' to make it visible
});

//Close the task form by click X.
closeButton.addEventListener('click', function(){
    taskForm.style.display = 'none';
})

//Plan
//Add Task button to send form data to the server.
//Return that data to the front end as a task card.


