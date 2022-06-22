class App {
  htmlElements = {
    taskList: document.querySelector(".app__tasks-list"),
    input: document.querySelector(".app__add-task__input"),
    tasksList: document.querySelector(".app__tasks-list"),
    addTaskBtn: document.querySelector(".app__add-task__btn"),
  };
  tasksArr = [];

  constructor() {
    this.init();
  }

  init() {
    //
    this.htmlElements.taskList.addEventListener("click", (e) => {
      let index = e.target.dataset.index;
      if (e.target.classList.contains("buttons__delete-button")) {
        this.deleteTask(index);
      }
    });
    this.htmlElements.addTaskBtn.addEventListener("click", () => {
      this.addTask();
      this.renderTasks();
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
          <span class="task__index">${index + 1}</span
          ><span class="task__text">${taskText}</span>
          <div class="task__buttons buttons">
            <button class="buttons__check-button button"data-index="${index}">L</button>
            <button class="buttons__delete-button button"data-index="${index}">X</button>
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
}

const newApp = new App();
