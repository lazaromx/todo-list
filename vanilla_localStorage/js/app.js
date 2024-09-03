import { LocalBase } from "./ls.js";
// const { LocalBase } = require("./ls.js");
class TodoApp {
  constructor() {
    this.lb = new LocalBase("todo-List");
    this.$ = document.querySelector.bind(document);

    this.inputAdd = this.$("#add-input");
    this.addBtn = this.$("#add-button");
    this.cancelBtn = this.$("#cancel-btn");
    this.todoList = this.$("#todo-list");
    // this.todoEl = $("p");
    this.todoForm = this.$("#todo-form");
    this.saveBtn = this.$("#save-btn");

    this.editing = {
      label: null,
      editBtn: null,
      removeBtn: null,
      cancelBtn: null,
    };

    this.init();
  }

  init() {
    this.todoForm.addEventListener("submit", this.submitTodo.bind(this));
    this.saveBtn.addEventListener("click", this.saveEdit.bind(this));
    this.lb.getItems().forEach((item) => this.createItem(item));
  }

  submitTodo(e) {
    e.preventDefault();
    this.addTodo(this.inputAdd.value);
    if (this.inputAdd.value === "") {
      this.inputAdd.focus();
    }
  }

  saveEdit() {
    this.editing.label.textContent = this.inputAdd.value;
    this.resetForm();
  }

  makeHtmlButton(icon, className, event) {
    icon = `<i class="material-symbols-outlined">${icon}</i>`;
    const btn = document.createElement("button");
    btn.setAttribute("class", `btn-icon ${className}`);
    btn.setAttribute("onclick", `app.${event}`);
    btn.innerHTML = icon;

    return btn;
  }

  addTodo(label) {
    const newTodo = this.lb.addItem({
      label,
      done: false,
    });
    this.createItem(newTodo);
  }

  /**
   * Creates a new todo item and appends it to the todo list.
   *
   * @param {Object} pTodoItem - The todo item to be created.
   * @param {boolean} pTodoItem.done - Indicates if the todo item is completed.
   * @param {string} pTodoItem.label - The label of the todo item.
   * @return {void} This function does not return anything.
   */
  createItem(pTodoItem) {
    const todoItem = document.createElement("div");
    todoItem.setAttribute("class", "todo-item animated fadeInUp");
    // todoItem.classList.add("todo-item");

    const description = document.createElement("div"); //.addClass("description");
    description.classList.add("description");

    const finishButton = this.makeHtmlButton(
      pTodoItem.done ? "radio_button_checked" : "radio_button_unchecked",
      "check",
      "toggleCheck(this)"
    );

    description.innerHTML = `${finishButton.outerHTML}<p>${pTodoItem.label}</p>`;

    const actions = document.createElement("div");
    actions.classList.add("actions");

    const editButton = this.makeHtmlButton(
      "edit",
      "edit",
      "editTodo(this.parentElement.parentElement)"
    );

    const removeButton = this.makeHtmlButton(
      "delete",
      "delete",
      "removeTodo(this.parentElement.parentElement)"
    );

    const cancelButton = this.makeHtmlButton(
      "cancel",
      "cancel hide",
      "resetForm()"
    );

    actions.appendChild(editButton);
    actions.appendChild(removeButton);
    actions.appendChild(cancelButton);

    todoItem.appendChild(description);
    todoItem.appendChild(actions);
    this.todoList.appendChild(todoItem);

    this.inputAdd.value = "";
    this.inputAdd.focus();
  }

  toggleCheck(button) {
    const icon = button.children[0];

    const todoItem = button.parentElement.parentElement;

    todoItem.classList.toggle("done");
    button.classList.toggle("done");
    const isDone = button.classList.contains("done");
    icon.innerHTML = isDone ? "check_circle" : "radio_button_unchecked";

    const filterSelect = this.$("#filter-select");
    if (filterSelect.value === "todo") {
      todoItem.classList.toggle("hide", isDone);
    }

    if (filterSelect.value === "done") {
      todoItem.classList.toggle("hide", !isDone);
    }
  }

  removeTodo(todoItem) {
    const label = todoItem.querySelector("p").textContent;
    
    const itemRemoved = this.lb.deleteItem(label);
    if(itemRemoved){
      todoItem.classList.add("slideOutLeft")
      setTimeout(() => {
        todoItem.remove();
      }, 400);
    } 
  }

  editTodo(todoItem) {
    this.resetForm();

    this.editing.label = todoItem.querySelector("p");
    this.inputAdd.value = this.editing.label.textContent;
    this.inputAdd.focus();
    this.addBtn.classList.add("hide");
    this.cancelBtn.classList.remove("hide");

    this.editing.editBtn = todoItem.querySelector(".btn-icon.edit");
    this.editing.removeBtn = todoItem.querySelector(".btn-icon.delete");
    this.editing.cancelBtn = todoItem.querySelector(".btn-icon.cancel");

    this.editing.editBtn.classList.add("hide");
    this.editing.removeBtn.classList.add("hide");
    this.editing.cancelBtn.classList.remove("hide");

    this.saveBtn.classList.remove("hide");
  }

  resetForm() {
    this.inputAdd.value = "";
    this.cancelBtn.classList.add("hide");
    this.saveBtn.classList.add("hide");
    this.addBtn.classList.remove("hide");

    if (this.editing.editBtn) {
      this.editing.editBtn.classList.remove("hide");
      this.editing.removeBtn.classList.remove("hide");
      this.editing.cancelBtn.classList.add("hide");
    }
  }

  filterTodos() {
    const todos = this.todoList.querySelectorAll(".todo-item");
    const filterSelect = this.$("#filter-select");
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
}

const app = new TodoApp();
export default app;
