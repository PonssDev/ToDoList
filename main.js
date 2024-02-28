const form = document.querySelector("#todolist");
const input = document.querySelector("#input");
const addbtn = document.querySelector("#add-btn");
const itemsList = document.querySelector("#items");

document.addEventListener("DOMContentLoaded", function () {
  loadTaskFromLocalStorage();
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const value = input.value;

  //Crea una nueva tarea (li) y le añade la clase item
  const newTask = document.createElement("li");
  newTask.classList.add("item");

  //Crea el checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("checkbox");

  //Crea el span
  const span = document.createElement("span");
  span.classList.add("task-text");
  span.textContent = value;

  //Crea el deleteButton
  const deletebtn = document.createElement("button");
  deletebtn.classList.add("delete-btn");
  deletebtn.textContent = "Delete";

  //Añade los elementos en el elemento li
  newTask.appendChild(checkbox);
  newTask.appendChild(span);
  newTask.appendChild(deletebtn);

  itemsList.appendChild(newTask);

  //Guardamos la tarea en el localStorage
  saveTaskToLocalStorage(value);

  //Función para guardar la tarea en localStorage ???????????
  function saveTaskToLocalStorage(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

});

//Borrar una tarea
itemsList.addEventListener("click", function (event) {
  const target = event.target;

  if (target.classList.contains("delete-btn")) {
    const taskItem = target.parentNode;
    taskItem.remove();
  }
});

//Marcar tarea como finalizada
itemsList.addEventListener("change", function (event) {
  const target = event.target;

  if (target.classList.contains("checkbox")) {
    const taskItem = target.parentNode;
    const span = taskItem.querySelector(".task-text");

    if (target.checked) {
      span.style.textDecoration = "line-through";
    } else {
      span.style.textDecoration = "none";
    }
  }
});
