const $ = document.querySelector.bind(document);

const inputAdd = $("#add-input");
const buttonAdd = $(".add-button");
const todoList = $("#todo-list");
const todoEl = $("p");
const todoForm = $("#todo-form");
const saveBtn = $("#save-btn");

let editing = {
  label: null,
  editBtn: null,
  removeBtn: null,
  cancelBtn: null,
};

saveBtn.addEventListener("click", () => {
  editing.label.textContent = inputAdd.value;
  resetForm();
});

function makeHtmlButton(icon, className, event) {
  // const button = `<button class="btn-icon ${className}" onclick="${event}">
  //   <i class="material-symbols-outlined">${icon}</i>
  // </button>`;
  icon = `<i class="material-symbols-outlined">${icon}</i>`;
  const btn = document.createElement("button");
  btn.setAttribute("class", `btn-icon ${className}`);
  btn.setAttribute("onclick", event);
  btn.innerHTML = icon;

  return btn;
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

  description.innerHTML = `${finishButton.outerHTML}<p>${text}</p>`;

  const actions = document.createElement("div");
  actions.classList.add("actions");

  const editButton = makeHtmlButton(
    "edit",
    "edit",
    "editTodo(this.parentElement.parentElement)"
  );

  const removeButton = makeHtmlButton(
    "delete",
    "delete",
    "removeTodo(this.parentElement.parentElement)"
  );

  const cancelButton = makeHtmlButton("cancel", "cancel hide", "resetForm()");

  actions.appendChild(editButton);
  actions.appendChild(removeButton);
  actions.appendChild(cancelButton);

  todoItem.appendChild(description);
  todoItem.appendChild(actions);
  todoList.appendChild(todoItem);

  inputAdd.value = "";
  inputAdd.focus();
}

function toggleCheck(button) {
  const icon = button.children[0];

  const todoItem = button.parentElement.parentElement;

  todoItem.classList.toggle("done");
  button.classList.toggle("done");
  const isDone = button.classList.contains("done");
  icon.innerHTML = isDone ? "check_circle" : "radio_button_unchecked";

  const filterSelect = $("#filter-select");
  if (filterSelect.value === "todo") {
    if (isDone) {
      todoItem.classList.add("hide");
    } else {
      todoItem.classList.remove("hide");
    }
  }

  if (filterSelect.value === "done") {
    if (!isDone) {
      todoItem.classList.add("hide");
    } else {
      todoItem.classList.remove("hide");
    }
  }
}

function removeTodo(todoItem) {
  todoItem.remove();
}

function editTodo(todoItem) {
  resetForm();

  editing.label = todoItem.querySelector("p");
  inputAdd.value = editing.label.textContent;
  inputAdd.focus();
  $("#add-button").classList.add("hide");
  $("#cancel-btn").classList.remove("hide");

  editing.editBtn = todoItem.querySelector(".btn-icon.edit");
  editing.removeBtn = todoItem.querySelector(".btn-icon.delete");
  editing.cancelBtn = todoItem.querySelector(".btn-icon.cancel");

  editing.editBtn.classList.add("hide");
  editing.removeBtn.classList.add("hide");
  editing.cancelBtn.classList.remove("hide");

  saveBtn.classList.remove("hide");
}

function resetForm() {
  inputAdd.value = "";
  $("#cancel-btn").classList.add("hide");
  $("#save-btn").classList.add("hide");
  $("#add-button").classList.remove("hide");

  if (editing.editBtn) {
    editing.editBtn.classList.remove("hide");
    editing.removeBtn.classList.remove("hide");
    editing.cancelBtn.classList.add("hide");
  }
}

function filterTodos() {
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
        } else todo.classList.remove("hide");
        break;
      case "todo":
        if (todo.classList.contains("done")) {
          todo.classList.add("hide");
        } else todo.classList.remove("hide");
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
