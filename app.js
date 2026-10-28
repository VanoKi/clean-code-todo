const taskInput = document.getElementById("new-task");
const addButton = document.getElementsByTagName("button")[0];
const incompleteTaskHolder = document.getElementById("incompleteTasks");
const completedTasksHolder = document.getElementById("completed-tasks");

const createTaskInput = function (type, className) {
  const input = document.createElement("input");
  input.type = type;
  if (className) input.className = className;
  return input;
};

const createDeleteButton = function () {
  const deleteButton = document.createElement("button");
  const deleteButtonImg = document.createElement("img");

  deleteButton.className = "delete";
  deleteButtonImg.src = "./remove.svg";
  deleteButton.appendChild(deleteButtonImg);
  return deleteButton;
};

const createNewTaskElement = function (taskString) {
  const listItem = document.createElement("li");
  const checkBox = createTaskInput("checkbox");
  const label = document.createElement("label");
  const editInput = createTaskInput("text", "task");
  const editButton = document.createElement("button");

  label.innerText = taskString;
  label.className = "task";
  editButton.innerText = "Edit";
  editButton.className = "edit";

  listItem.append(checkBox, label, editInput, editButton, createDeleteButton());
  return listItem;
};

const addTask = function () {
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);

  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = "";
};

const editTask = function () {
  const listItem = this.parentNode;

  const editInput = listItem.querySelector("input[type=text]");
  const label = listItem.querySelector("label");
  const editButton = listItem.querySelector(".edit");
  const isEditMode = listItem.classList.contains("editMode");
  if (isEditMode) {
    label.innerText = editInput.value;
    editButton.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editButton.innerText = "Save";
  }

  listItem.classList.toggle("editMode");
};

const deleteTask = function () {
  const listItem = this.parentNode;
  const taskList = listItem.parentNode;
  taskList.removeChild(listItem);
};

const moveTaskToList = function (
  checkbox,
  destinationList,
  nextCheckboxHandler,
) {
  const listItem = checkbox.parentNode;
  destinationList.appendChild(listItem);
  bindTaskEvents(listItem, nextCheckboxHandler);
};

const taskCompleted = function () {
  moveTaskToList(this, completedTasksHolder, taskIncomplete);
};

const taskIncomplete = function () {
  moveTaskToList(this, incompleteTaskHolder, taskCompleted);
};

addButton.addEventListener("click", addTask);

const bindTaskEvents = function (taskListItem, checkboxChangeHandler) {
  const checkBox = taskListItem.querySelector("input[type=checkbox]");
  const editButton = taskListItem.querySelector("button.edit");
  const deleteButton = taskListItem.querySelector("button.delete");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkboxChangeHandler;
};

for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (let i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
