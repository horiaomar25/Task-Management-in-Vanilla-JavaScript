// Top 3 tasks to be added to the database.
function createDBCard(task) {
  const taskElementDB = document.createElement("div");
  taskElementDB.className = "task-title";
  taskElementDB.innerHTML = `
    <p>${task.task_name}</>
    
    
    `;

  return taskElementDB;
}

function appendToDashBoard(task) {
  // Get the task type
  const taskDB = task.task_type;
  // Create task card in weekly/daily grid
  const taskGrid = createDBCard(task);

  if (taskDB === "Daily") {
    const dailyTask = document.querySelector(".daily-container");
    dailyTask.appendChild(taskGrid);
  } else if (taskDB === "Weekly") {
    const weeklyTask = document.querySelector(".weekly-container");
    weeklyTask.appendChild(taskGrid);
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
    const weeklyTaskData = data.data.filter(task => task.type === 'weekly')
    const last3WeeklyTasks= 
   
    data.data.forEach((task) => {
      appendToDashBoard(task);
      console.log(task)
    });
  })
  .catch((error) => {
    console.error(error);
  });

  