class App {
  htmlElements = {
    taskList: document.querySelector(".app__tasks-list"),
    input: document.querySelector(".app__add-task__input"),
    tasksList: document.querySelector(".app__tasks-list"),
    addTaskBtn: document.querySelector(".app__add-task__btn"),
    catagoryButtons: document.querySelectorAll(".catagory__button"),
  };
  tasksArr = [];
  taskArrDone = [];

  constructor() {
    this.init();
  }

  init() {
    //
    this.htmlElements.taskList.addEventListener("click", (e) => {
      let index = e.target.dataset.index;
      if (e.target.parentNode.classList.contains("buttons__delete-button")) {
        this.deleteTask(index);
      }
      if (e.target.parentNode.classList.contains("buttons__check-button")) {
        this.ItIsDone(e);
      }
    });
    this.htmlElements.addTaskBtn.addEventListener("click", () => {
      this.addTask();
      this.renderTasks();
    });
    // define catagory Listener
    this.htmlElements.catagoryButtons.forEach((catagoryButton) => {
      catagoryButton.addEventListener("click", (e) => this.defineCategory(e));
    });
  }

  // Add task to taskArr
  addTask() {
    let taskText = this.htmlElements.input.value;
    this.tasksArr.push(this.upperCaseFirstLeater(taskText));
    this.htmlElements.input.value = "";
  }
  // Upercase First Leater of task
  upperCaseFirstLeater(task) {
    return task.charAt(0).toUpperCase() + task.slice(1);
  }

  createTaskElement(taskText, index) {
    const taskHtlm = `<div class="tasks-list__task .task">
          <span class="task__index"><img src="sources/img/icons/${this.categoryActive}-icon.svg" alt="" /></span
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
        this.createTaskElement(task, index)
      );
    });
  }

  deleteTask(indexOfTask) {
    this.tasksArr.splice(indexOfTask, 1);
    this.renderTasks();
  }

  ItIsDone(e) {
    let currentTask = e.target.parentNode.parentNode.parentNode.cloneNode(true);
    let taskIndex = e.target.parentNode;
    this.deleteTask(taskIndex);
    console.log(taskIndex);
    const doneList = document.querySelector(".tasks-list--done");
    doneList.insertAdjacentElement("beforeend", currentTask);
  }
  defineCategory(e) {
    console.log(e.target.src);

    this.categoryActive = e.target.parentNode.dataset.category;
    console.log(this.categoryActive);
  }
}

const newApp = new App();
