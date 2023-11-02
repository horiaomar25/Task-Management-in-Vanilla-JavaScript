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

  const taskExpand = document.querySelector(".task-expand");
  const taskInformation = document.getElementById('task-info')

  taskElement.addEventListener("click", function (event) {
    taskExpand.style.display = "block";
    
    // Clone the task element to create a copy
    const taskCopy = taskElement.cloneNode(true);
    
    // Clear the taskInformation element before appending the copy
    taskInformation.innerHTML = "";
    
    // Append the cloned task element to the taskInformation element
    taskInformation.appendChild(taskCopy);
  });

  return taskElement;
}

function createTaskCard2(task) {
  const t = createTaskCard(task);
  
// trying to append the task to task expand.
  const taskExpand = document.querySelector(".task-expand");
  c

  taskExpand.addEventListener("click", function () {
    taskExpand.style.display = "block";
    if(t === task.task_name){
    taskExpand.appendChild(task.task_name);
    }
  });

  console.log(taskElement)
  return taskExpand;
}

// Adding the tasks to the Task page in the right columns. 'task' is the data Object holding
function appendTaskToDOM(task) {
  // get the task type
  const taskType = task.task_type;

  // Create new task card element
  const taskElement = createTaskCard(task);

  // Matches the correct column and will append the task card to the right column
  if (taskType === "Daily") {
    const dailyTask = document.querySelector(".Daily-task");
    dailyTask.appendChild(taskElement);
  } else if (taskType === "Weekly") {
    const weeklyTask = document.querySelector(".Weekly-task");
    weeklyTask.appendChild(taskElement);
  }

  
}

//Plan
// Need to append task to task expand 
// 

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
     
    });
  })
  .catch((error) => {
    console.error(error);
  });

// close the task information pop up.
const closeTaskInformation = document.querySelector(".close-task");
const taskInformation = document.querySelector(".task-expand");

// close the task information pop up.
closeTaskInformation.addEventListener("click", function () {
  taskInformation.style.display = "none";
});

// Create an Edit and make symbol
// Function to create an editing form with API integration
function createEditTaskPopup(taskId) {
  // Make an API request to fetch task details by task ID
  fetch(`/api/tasks/${taskId}`)
    .then((response) => response.json())
    .then((task) => {
      const popup = document.createElement("div");
      popup.className = "task-popup";

      // Create an editing form
      const form = document.createElement("form");

      // Populate the form with task details fetched from the API
      const taskNameInput = document.createElement("input");
      taskNameInput.type = "text";
      taskNameInput.value = task.name;
      form.appendChild(taskNameInput);

      // Add more input fields for other task details (e.g., description, due date, priority)

      // Save button
      const saveButton = document.createElement("button");
      saveButton.textContent = "Save";
      saveButton.addEventListener("click", () => {
        // Update the task details with user changes
        task.name = taskNameInput.value;
        // Update other properties here

        // Send an API request to update the task
        fetch(`/api/tasks/${taskId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(task),
        }).then((response) => {
          if (response.ok) {
            // Close the pop-up/modal
            popup.remove();
            // Update the task card with the new information on the main task list/board
            // (You'll need to implement this part)
          } else {
            // Handle API request error and display an error message to the user
          }
        });
      });
      form.appendChild(saveButton);

      // Cancel button
      const cancelButton = document.createElement("button");
      cancelButton.textContent = "Cancel";
      cancelButton.addEventListener("click", () => {
        // Close the pop-up/modal without saving changes
        popup.remove();
      });
      form.appendChild(cancelButton);

      popup.appendChild(form);

      // Display the editing form
      document.body.appendChild(popup);
    })
    .catch((error) => {
      // Handle API request error and display an error message to the user
    });
}
