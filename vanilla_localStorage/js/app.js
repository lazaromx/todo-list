import { LocalBase } from "./ls.js";
// const { LocalBase } = require("./ls.js");
const $ = document.querySelector.bind(document);

class TodoApp {
  constructor() {
    this.lb = new LocalBase("todo-List");

    this.inputAdd = $("#add-input");
    this.addBtn = $("#add-button");
    this.cancelBtn = $("#cancel-btn");
    this.todoList = $("#todo-list");
    // this.todoEl = $("p");
    this.todoForm = $("#todo-form");
    this.saveBtn = $("#save-btn");

    this.editing = {
      todoItem: null,
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
    const newLabel = this.inputAdd.value;
    const findItemName = this.lb.findItemByName(newLabel);
    const findItemId = this.lb.findItemById(this.editing.todoItem.id);

    if(findItemId && newLabel === findItemId.label) {
      this.editing.todoItem.textContent = newLabel;
      findItemId.label = newLabel;
      this.lb.saveItem(findItemId);
      this.resetForm();
    }

    else if(findItemName){
      // alert(`A tarefa "${label}" já existe!!`);
      Swal.fire(`A tarefa "${newLabel}" já existe!!`);
      
      this.inputAdd.value = "";
      this.inputAdd.focus();
    }
    


    
  }

  makeHtmlButton(icon, className, event) {
    icon = `<i class="material-symbols-outlined">${icon}</i>`;
    const btn = document.createElement("button");
    btn.setAttribute("class", `btn-icon ${className}`);
    btn.setAttribute("onclick", `app.${event}`);
    btn.innerHTML = icon;

    return btn;
  }

  addTodo(label){
    const findItem = this.lb.findItemByName(label);
    if(findItem){
      // alert(`A tarefa "${label}" já existe!!`);
      Swal.fire(`A tarefa "${label}" já existe!!`);
      
      this.inputAdd.value = "";
      this.inputAdd.focus();
    }
    else if(this.inputAdd.value === ""){
      this.inputAdd.focus();
    }
    else{
      const newTodo = this.lb.addItem({
        label,
        done: false,
      });
  
      this.createItem(newTodo);
    }
    
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
    // pTodoItem.done ? todoItem.setAttribute("class", "todo-item animated fadeInUp done") 
    //                : todoItem.setAttribute("class", "todo-item animated fadeInUp");

    // todoItem.setAttribute("class", "todo-item animated fadeInUp")
    // if (pTodoItem.done) {
    //   todoItem.classList.add("done");
    // }
     todoItem.setAttribute("class", `todo-item animated fadeInUp ${pTodoItem.done ? " done" : ""}`);

    // todoItem.classList.add("todo-item");

    const description = document.createElement("div"); //.addClass("description");
    description.classList.add("description");

    const finishButton = this.makeHtmlButton(
    pTodoItem.done ? "check_circle" : "radio_button_unchecked",
    pTodoItem.done ? "done" : "", 
      "toggleCheck(this)"
    );

    description.innerHTML = `${finishButton.outerHTML}<p id="${pTodoItem.id}">${pTodoItem.label}</p>`;

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

    const findItem = this.lb.findItemById(todoItem.querySelector('p').id);

    todoItem.classList.toggle("done");
    button.classList.toggle("done");
    const isDone = button.classList.contains("done");
    icon.innerHTML = isDone ? "check_circle" : "radio_button_unchecked";

    findItem.done = isDone; 

    this.lb.saveItem(findItem);

    const filterSelect = $("#filter-select");
    if (filterSelect.value === "todo") {
      todoItem.classList.toggle("hide", isDone);
    }

    if (filterSelect.value === "done") {
      todoItem.classList.toggle("hide", !isDone);
    }
  }

  removeTodo(todoItem) {
    // const label = todoItem.querySelector("p").textContent;
    const itemId = todoItem.querySelector("p").id;
    
    const itemRemoved = this.lb.deleteItem(itemId);
    if(itemRemoved){
      todoItem.classList.add("slideOutLeft")
      setTimeout(() => {
        todoItem.remove();
      }, 400);
    } 
  }

  editTodo(todoItem) {
    this.resetForm();

    this.editing.todoItem = todoItem.querySelector("p");
    this.inputAdd.value = this.editing.todoItem.textContent;
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
}

const app = new TodoApp();
export default app;
