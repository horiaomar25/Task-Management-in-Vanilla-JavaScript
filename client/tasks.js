const addButton = document.querySelector("#create_task"); // Use '#' to select by ID
const taskForm = document.getElementById("pop-up");
const closeButton = document.getElementById("close-button");
const submitButton = document.getElementById('add-button');

// Click on create task and open the form.
addButton.addEventListener("click", function () {
  taskForm.style.display = "block"; // Set the display style to 'block' to make it visible
});

//Close the task form by click X.
closeButton.addEventListener("click", function () {
  taskForm.style.display = "none";
});

submitButton.addEventListener('click', function () {
  taskForm.style.display = "none";
})

//fetch data/ send data
const formToServer = document.getElementById('add-button').addEventListener('click', function(e){
  e.preventDefault();
  const formData= new FormData(document.getElementById('taskForm'));
  const task_name = formData.get('task_name');
const task_description = formData.get('task_description');
const task_type = formData.get('task_type');

  // sendDataToServer({ task_name, task_description, task_type})
  const data = {
    task_name,
    task_description,
    task_type,
    completed: false,
  };

  sendDataToServer(data)
  
  function sendDataToServer (data){
  fetch('http://localhost:3001/tasks/',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  
  })
  .then(response => {
    if (response.ok) {
      // Data sent successfully, handle the response if needed
      return response.json();
    } else {
      // Handle errors
      throw new Error('Failed to send data to the server');
    }
  })
  .then(data => {
    // Handle the response from the server, e.g., show a success message or update the UI
    console.log(data.message); // Data saved successfully
    
  })
  .catch(error => {
    console.error(error);
    // Handle and display the error
  });
}

})

// Fetch Data from the database/server
function createTaskCard(task) {
  const taskElement= document.createElement('div');
  taskElement.className ="card";
  taskElement.innerHTML = `
  <h5>${task.task_name}</h5>
  <p>${task.task_description}</p>
  
  `;
  
   return taskElement;
}

function appendTaskToDOM(task) {
  // get the task type
   const taskType = task.task_type;
   // Create new task card element
  const taskElement = createTaskCard(task);

if(taskType === 'Daily'){
  const dailyTask = document.querySelector('.Daily-task');
    dailyTask.appendChild(taskElement);
   } else if (taskType === 'Weekly') {
    const weeklyTask = document.querySelector('.Weekly-task');
    weeklyTask.appendChild(taskElement);
   }

 
}

const taskData = fetch('http://localhost:3001/tasks/')  
.then((response) => {
  if (response.ok) {
      return response.json(); // Parse the JSON response
  } else {
      throw new Error('Failed to fetch data from the server');
  }
  
})
.then((data) => {
  data.data.forEach((task) => {
    appendTaskToDOM(task);
  })
  
})
.catch((error) => {
  console.error(error);
});

// close the task information pop up.
const closeTaskInformation = document.querySelector('.close-task');
const taskInformation = document.querySelector('.task-expand');

closeTaskInformation.addEventListener('click', function (){
  taskInformation.style.display='none';
})








//Plan
//Need to create my backend 
//Add Task button to send form data to the server.
//Return that data to the front end as a task card
