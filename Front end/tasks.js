
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





const submittingTask = document.getElementById('add-button').addEventListener("click", function (event) {
 

  //This stops the form from default submission behavior and will stop error from being thrown click add task. 
  event.preventDefault()

  //These  variables will store the input values from the form that will used for the task card. 
  const taskTitle = document.getElementById('task-name').value;
  const taskDescription = document.getElementById('task-description').value;
  const taskType = document.getElementById('select-type').value;

  // const completed = document.getElementById("completed").checked;
  
  //This will take the task type selected stored in taskType variable above 
  //and search through the HTML file to find a class name by either 'Weekly-task'/'Daily-task'.
  //NOTE: Always make sure that the option in the form is the same name as it is case sensitive. 
  const taskContainer = document.querySelector(`.${taskType}-task`);

  //The if statement will check the column it needs be added. 
  if (taskContainer) {
    //It will create a div element in that column.
    const taskCard = document.createElement('div');
    //This will give the newly created div a class name which can be used for CSS styling.
    taskCard.className = "task-card";
    //Using the information stored from the form, it will print this into the div. I also added format so it presents clearer.
    taskCard.innerHTML = `
        <h3>${taskTitle}</h3>
        <p>${taskDescription}</p>
        
    `;
     //This will add the newly created task card to the task Container
    taskContainer.appendChild(taskCard);

    document.getElementById("task-name").value = "";
    document.getElementById("task-description").value = "";
    // document.getElementById("completed").checked = false;
  }
});


//Plan
//Need to create my backend 
//Add Task button to send form data to the server.
//Return that data to the front end as a task card.
