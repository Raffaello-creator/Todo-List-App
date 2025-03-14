document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
  let taskInput = document.getElementById("taskInput");
  let taskText = taskInput.value.trim();

  if (taskText === "") return;

  let li = document.createElement("li");
  li.textContent = taskText;

  li.addEventListener("click", function () {
    this.classList.toggle("completed");
    saveTasks();
  });

  let deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";
  deleteBtn.onclick = function () {
    this.parentElement.remove();
    saveTasks();
  };

  li.appendChild(deleteBtn);
  document.getElementById("taskList").appendChild(li);
  taskInput.value = "";
  saveTasks();
}

function saveTasks() {
  let tasks = [];
  document.querySelectorAll("#taskList li").forEach((li) => {
    tasks.push({
      text: li.textContent.replace("X", "").trim(),
      completed: li.classList.contains("completed"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach((task) => {
    let li = document.createElement("li");
    li.textContent = task.text;
    if (task.completed) li.classList.add("completed");

    li.addEventListener("click", function () {
      this.classList.toggle("completed");
      saveTasks();
    });

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.onclick = function () {
      this.parentElement.remove();
      saveTasks();
    };

    li.appendChild(deleteBtn);
    document.getElementById("taskList").appendChild(li);
  });
}

function clearAll() {
  document.getElementById("taskList").innerHTML = "";
  localStorage.removeItem("tasks");
}

function filterTasks(filter) {
  document.querySelectorAll("#taskList li").forEach((li) => {
    switch (filter) {
      case "all":
        li.style.display = "flex";
        break;
      case "active":
        li.style.display = li.classList.contains("completed") ? "none" : "flex";
        break;
      case "completed":
        li.style.display = li.classList.contains("completed") ? "flex" : "none";
        break;
    }
  });
}
