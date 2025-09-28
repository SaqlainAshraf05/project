// Load tasks from localStorage
document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();
  
  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  const taskList = document.getElementById("taskList");

  // Create new list item
  const li = document.createElement("li");
  li.className = "list-group-item d-flex justify-content-between align-items-center";
  li.innerHTML = `
    <span onclick="toggleComplete(this)" class="cursor-pointer">${taskText}</span>
    <button class="btn btn-danger btn-sm" onclick="removeTask(this)">X</button>
  `;

  taskList.appendChild(li);
  saveTasks();
  taskInput.value = "";
}

// Mark task as complete
function toggleComplete(span) {
  span.classList.toggle("completed");
  saveTasks();
}

// Remove task
function removeTask(button) {
  button.parentElement.remove();
  saveTasks();
}

// Save tasks in localStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    tasks.push({
      text: li.querySelector("span").innerText,
      completed: li.querySelector("span").classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => {
    const taskList = document.getElementById("taskList");
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `
      <span onclick="toggleComplete(this)" class="cursor-pointer ${task.completed ? 'completed' : ''}">${task.text}</span>
      <button class="btn btn-danger btn-sm" onclick="removeTask(this)">X</button>
    `;
    taskList.appendChild(li);
  });
}
