const addButton = document.querySelector("#create_task"); // Use '#' to select by ID
const taskForm = document.getElementById("pop-up");
const closeButton = document.getElementById("close-button");

// Click on create task and open the form.
addButton.addEventListener("click", function () {
  taskForm.style.display = "block"; // Set the display style to 'block' to make it visible
});

//Close the task form by click X.
closeButton.addEventListener("click", function () {
  taskForm.style.display = "none";
});

//fetch data/ send data
document.getElementById('add-button').addEventListener('click', function(e){
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
    console.log(reponse);
  })
  .catch(error => {
    console.error(error);
    // Handle and display the error
  });
}

})

// Fetch Data from the database/server

fetch('http://localhost:3001/tasks/7a9b841b-116a-4300-82ff-01d890de6191')  
.then((response) => {
  if (response.ok) {
      return response.json(); // Parse the JSON response
  } else {
      throw new Error('Failed to fetch data from the server');
  }
})
.then((data) => {
  displayTasks(data);

})
.catch((error) => {
  console.error(error);
});

function displayTasks(data) {
  //Element to display tasks
  const weeklyTask = document.querySelector('.Weekly-task');
  const dailyTask = document.querySelector('.Daily-task')
  data.forEach((task) =>{
     const taskElement = document.createElement('div');
     taskElement.className = "task-card"
     taskElement.innerHTML = `
     <h3>${task.task_name}</h3>
     <p>${task.task_description}</p>
     
     `;

     if(task.type === 'Daily'){
      dailyTask.appendChild(taskElement);
     } else if (task.type === 'Weekly') {
      weeklyTask.appendChild(taskElement);
     }

     
  })
}




//Plan
//Need to create my backend 
//Add Task button to send form data to the server.
//Return that data to the front end as a task card
