class App {
  htmlElements = {
    taskList: document.querySelector(".app__tasks-list"),
    doneTaskList: document.querySelector(".tasks-list--done"),
    input: document.querySelector(".app__add-task__input"),
    tasksList: document.querySelector(".app__tasks-list"),
    addTaskBtn: document.querySelector(".app__add-task__btn"),
    catagoryButtons: document.querySelectorAll(".catagory__button"),
  };
  tasksArr = [];
  taskArrDone = [];
  categoryActive;

  constructor() {
    this.init();
  }

  init() {
    // removing from task list
    this.htmlElements.taskList.addEventListener("click", (e) => {
      let index = e.target.parentNode.dataset.index;
      if (e.target.parentNode.classList.contains("buttons__delete-button")) {
        this.deleteTask(index);
      }
      if (e.target.parentNode.classList.contains("buttons__check-button")) {
        this.ItIsDone(e);
      }
    });
    this.htmlElements.addTaskBtn.addEventListener("click", () => {
      this.createTask();
      this.renderTasks();
    });
    // define catagory Listener
    this.htmlElements.catagoryButtons.forEach((catagoryButton) => {
      catagoryButton.addEventListener("click", (e) => this.defineCategory(e));
    });
    //removing from done List
    this.htmlElements.doneTaskList.addEventListener("click", (e) => {
      let index = e.target.parentNode.dataset.index;
      if (e.target.parentNode.classList.contains("buttons__delete-button")) {
        this.deleteDoneTask(index);
      }
      if (e.target.parentNode.classList.contains("buttons__check-button")) {
        this.ItIsDone(e);
      }
    });
  }

  // Upercase First Leater of task
  upperCaseFirstLeater(task) {
    return task.charAt(0).toUpperCase() + task.slice(1);
  }
  createTask() {
    let task = {
      taskText: this.upperCaseFirstLeater(this.htmlElements.input.value),
      category: this.categoryActive,
    };
    if (task.taskText == "") return;

    this.htmlElements.input.value = "";
    this.tasksArr.push(task);
    console.log(this.tasksArr);
  }

  createTaskElement(taskText, category = "work", index) {
    const taskHtlm = `<div class="tasks-list__task .task">
          <span class="task__index"><img src="sources/img/icons/${category}-icon.svg" alt="" /></span
          ><span class="task__text">${taskText}</span>
          <div class="task__buttons buttons">
            <button class="buttons__check-button button"data-index="${index}"><img class="button-img" src="sources/img/check-icon.svg" alt="" /></button>
            <button class="buttons__delete-button button"data-index="${index}"> <img
            class="button-img"
            src="sources/img/delete-icon.svg"
            alt=""
          /></button>
          </div>
        </div>`;
    return taskHtlm;
  }

  renderTasks() {
    this.htmlElements.tasksList.textContent = "";
    this.tasksArr.forEach((task, index) => {
      this.htmlElements.tasksList.insertAdjacentHTML(
        "beforeend",
        this.createTaskElement(task.taskText, task.category, index)
      );
    });
  }

  deleteTask(indexOfTask) {
    this.tasksArr.splice(indexOfTask, 1);
    this.renderTasks();
  }
  deleteDoneTask(indexOfTask) {
    console.log(this.taskArrDone);

    this.taskArrDone.splice(indexOfTask, 1);
    this.htmlElements.doneTaskList.textContent = "";
    this.taskArrDone.forEach((el) => this.htmlElements.doneTaskList.append(el));
  }

  ItIsDone(e) {
    let currentTask = e.target.parentNode.parentNode.parentNode.cloneNode(true);
    this.taskArrDone.push(currentTask);
    let taskIndex = e.target.parentNode;
    this.deleteTask(taskIndex);
    const doneList = document.querySelector(".tasks-list--done");
    doneList.insertAdjacentElement("beforeend", currentTask);
  }
  defineCategory(e) {
    this.categoryActive = e.target.parentNode.dataset.category;
  }
}

const newApp = new App();
