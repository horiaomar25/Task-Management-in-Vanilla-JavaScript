const addButton = document.querySelector("#create_task"); // Use '#' to select by ID
// The popup when create task is clicked.
const taskForm = document.getElementById("pop-up");
// This will close the button.
const closeButton = document.getElementById("close-button");
// This is the add button to send it the backend
const submitButton = document.getElementById("add-button");
// This button will delete the task

// This is the daily column
const dailyTask = document.querySelector(".Daily-task");
// This is the weekly column
const weeklyTask = document.querySelector(".Weekly-task");

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
  // This creates a div with the class of .card to add styling. It adds the data to the card as they are created.
  const taskElement = document.createElement("div");
  taskElement.className = "card";
  taskElement.innerHTML = `
  <h4>${task.task_name}</h4>
  <p>${task.task_description}</p>
  
  `;
  //  Targets the expansion of the task card and allows you to display the task in a bigger card.
  const taskExpand = document.querySelector(".task-expand");
  const taskInformation = document.getElementById("task-info");

  taskElement.addEventListener("click", function (event) {
    taskExpand.style.display = "block";

    // Clone the task element to create a copy of the task card with the data.
    const taskCopy = taskElement.cloneNode(true);
    // Give the copy a class so I can style it in the expansion.
    taskCopy.className = "new-style";

    // Clear the taskInformation element before appending the copy
    taskInformation.innerHTML = "";

    // Append the cloned task element to the taskInformation element
    taskInformation.appendChild(taskCopy);
  });

  return taskElement;
}

async function deleteTask(taskId, taskElement) {
  try {
    const response = await fetch(`http://localhost:3001/tasks/${taskId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      // Remove the note from the list
      // This is the daily column
      const dailyTask = document.querySelector(".Daily-task");
      // This is the weekly column
      const weeklyTask = document.querySelector(".Weekly-task");
      weeklyTask.removeChild(taskElement);
      dailyTask.removeChild(taskElement);
    } else {
      console.error("Error deleting note:", await response.text());
    }
  } catch (error) {
    console.error("There was an error deleting the note:", error);
  }
}

const deleteButton = document.getElementById("delete");
deleteButton.addEventListener("click", deleteTask);

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

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => {
    deleteNote(note.id, listItem);
  });
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
