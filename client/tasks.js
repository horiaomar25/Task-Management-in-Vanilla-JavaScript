const addButton = document.querySelector("#create_task"); // Use '#' to select by ID
const taskForm = document.getElementById("pop-up");
const closeButton = document.getElementById("close-button");
const submitButton = document.getElementById("add-button");

// Click on create task and open the form.
addButton.addEventListener("click", function () {
  taskForm.style.display = "block"; // Set the display style to 'block' to make it visible
});

//Close the task form by click X.
closeButton.addEventListener("click", function () {
  taskForm.style.display = "none";
});

// Closes the form once the Add Task has been clicked. It will send the form data to the server.
submitButton.addEventListener("click", function () {
  taskForm.style.display = "none";
});

// This allows the form information to be sent to the server.
const formToServer = document
  .getElementById("add-button")
  .addEventListener("click", function (e) {
    e.preventDefault();
    const formData = new FormData(document.getElementById("taskForm"));
    const task_name = formData.get("task_name");
    const task_description = formData.get("task_description");
    const task_type = formData.get("task_type");

    // Create a object using the value/data from the different input fields in the form. 
    const data = {
      task_name,
      task_description,
      task_type,
      completed: false,
    };
 // Calls the function written below and give it the data object containing the inputs sent to the form.
    sendDataToServer(data);

    function sendDataToServer(data) {
      fetch("http://localhost:3001/tasks/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.ok) {
            // Data sent successfully, handle the response if needed
            return response.json();
          } else {
            // Handle errors
            throw new Error("Failed to send data to the server");
          }
        })
        .then((data) => {
          // Handle the response from the server, e.g., show a success message or update the UI
          console.log(data.message); // Data saved successfully
        })
        .catch((error) => {
          console.error(error);
          // Handle and display the error
        });
    }
  });

// Fetch Data from the database/server
function createTaskCard(task) {
  const taskElement = document.createElement("div");
  taskElement.className = "card";
  taskElement.innerHTML = `
  <h4>${task.task_name}</h4>
  <p>${task.task_description}</p>
  
  `;


  return taskElement;
}

// Adding the tasks to the Task page in the right columns. 'task' is the data Object holding
function appendTaskToDOM(task) {
  // get the task type
  const taskType = task.task_type;
  // Create new task card element
  const taskElement = createTaskCard(task);

  if (taskType === "Daily") {
    const dailyTask = document.querySelector(".Daily-task");
    dailyTask.appendChild(taskElement);
  } else if (taskType === "Weekly") {
    const weeklyTask = document.querySelector(".Weekly-task");
    weeklyTask.appendChild(taskElement);
  }
}



// This fetch request takes the data send to the database.
// forEach loops through the data object and appends each task(array) to a task card with
// the function appendTaskToDOM up above. 
const taskData = fetch("http://localhost:3001/tasks/")
  .then((response) => {
    if (response.ok) {
      return response.json(); // Parse the JSON response
    } else {
      throw new Error("Failed to fetch data from the server");
    }
  })
  .then((data) => {
    data.data.forEach((task) => {
      appendTaskToDOM(task);
      console.log(task)
    });
  })
  .catch((error) =>{
    console.error(error);
  });




// close the task information pop up.
const closeTaskInformation = document.querySelector(".close-task");
const taskInformation = document.querySelector(".task-expand");

// close the task information pop up.
closeTaskInformation.addEventListener("click", function () {
  taskInformation.style.display = "none";
});


