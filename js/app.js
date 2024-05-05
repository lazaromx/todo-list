const $ = document.querySelector.bind(document);

const inputAdd = $("#add-input");
const buttonAdd = $(".add-button");
const todoList = $("#todo-list");
const todoEl = $("p");
const todoForm = $("#todo-form");
const saveBtn = $("#save-btn");
let editLabel;

  saveBtn.addEventListener("click", () => {
    editLabel.textContent = inputAdd.value;
    console.log("qualquer coisa")
    resetForm();
  });

function makeHtmlButton(icon, className, event) {
  const button = `<button class="btn-icon ${className}" onclick="${event}">
    <i class="material-symbols-outlined">${icon}</i>
  </button>`;

  return button;
}

function addTodo(text) {
  const todoItem = document.createElement("div");
  todoItem.setAttribute("class", "todo-item animated fadeInUp");
  // todoItem.classList.add("todo-item");

  const description = document.createElement("div"); //.addClass("description");
  description.classList.add("description");

  const finishButton = makeHtmlButton(
    "radio_button_unchecked",
    "check",
    "toggleCheck(this)"
  );

  description.innerHTML = `${finishButton}<p>${text}</p>`;

  // const finishButton = document.createElement("button");
  // finishButton.classList.add("finish-todo");
  // finishButton.innerHTML = '<i class="material-symbols-outlined">check</i>';

  // const todoTitle = document.createElement("p");
  // todoTitle.classList.add("todo-item");
  // todoTitle.innerText = text;

  const actions = document.createElement("div"); //.addClass("description");
  actions.classList.add("actions");

  const editButton = makeHtmlButton("edit", "edit", "editTodo(this.parentElement.parentElement)"); 

  const removeButton = makeHtmlButton(
    "delete",
    "delete",
    "removeTodo(this.parentElement.parentElement)"
  );

  actions.innerHTML = `${editButton}${removeButton}`;

  todoItem.appendChild(description);
  todoItem.appendChild(actions);
  todoList.appendChild(todoItem);

  inputAdd.value = "";
  inputAdd.focus();
}

function toggleCheck(button) {
  console.log(button);
  const icon = button.children[0];

  const todoItem = button.parentElement.parentElement;

  // const pendent = button.classList.contains("pendent-todo");
  // button.classList.remove(pendent ? "pendent-todo" : "finish-todo");
  // button.classList.add(pendent ? "finish-todo" : "pendent-todo");

  todoItem.classList.toggle("done");
  button.classList.toggle("done");
  icon.innerHTML = button.classList.contains("done") ? "check_circle" : "radio_button_unchecked";

}

function removeTodo(todoItem) {
  console.log(todoItem);
  todoItem.remove();
}

function editTodo(todoItem) {
  console.log("editTodo");
  editLabel = todoItem.querySelector("p");
  inputAdd.value = editLabel.textContent;
  inputAdd.focus();
  $("#add-button").classList.add("hide");
  $("#cancel-btn").classList.remove("hide");
  saveBtn.classList.remove("hide");
  
}

function resetForm() {
  inputAdd.value = "";
  $("#cancel-btn").classList.add("hide");
  $("#save-btn").classList.add("hide");
  $("#add-button").classList.remove("hide");
}

function filterTodos() {
  console.log("to aqui")
  const todos = todoList.querySelectorAll(".todo-item");
  const filterSelect = $("#filter-select");
  todos.forEach((todo) => {
    switch (filterSelect.value) {
      case "all":
        todo.classList.remove("hide");
        break;
      case "done":
        if (!todo.classList.contains("done")) {
          todo.classList.add("hide");
        }
        else(todo.classList.remove("hide"))
        break;
      case "todo":
        if (todo.classList.contains("done")) {
          todo.classList.add("hide");
        }
        else(todo.classList.remove("hide"))
        break;
    }
  });  
}

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (inputAdd.value === "") {
    inputAdd.focus();
  } else {
    addTodo(inputAdd.value);
  }
});

// todoList.addEventListener("click", (e) => {
//   console.log("clicou");
//   const target = e.target;
//   const parentEl = target.closest("button");
//   const parentDiv = parentEl.closest(".todo-item");
//   if(parentEl.classList.contains("pendent-todo") || parentEl.classList.contains("finish-todo")){
//     toggleCheck(target);
//   }
//   if(parentEl.classList.contains("remove-todo")){
//     parentDiv.remove();
//   }
// })
