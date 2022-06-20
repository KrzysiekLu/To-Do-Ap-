class App {
  htmlElements = {
    input: document.querySelector(".app__add-task__input"),
    taskList: document.querySelector(".app__task-list"),
    addTaskBtn: document.querySelector(".app__add-task__btn"),
  };
  tasksArr = [];

  constructor() {
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

  renderTasks() {
    this.htmlElements.taskList.textContent = "";
    this.tasksArr.forEach((task, index) => {
      const taskContainer = document.createElement("div");
      taskContainer.classList.add("task-list__task-container");
      taskContainer.insertAdjacentText("afterbegin", `${index + 1}-- ${task}`);

      const btnD = taskContainer.insertAdjacentElement(
        "beforeend",
        this.createDeleteBtn(index)
      );
      const checbtn = taskContainer.insertAdjacentElement(
        "beforeend",
        this.createCheckBtn()
      );

      checbtn.addEventListener("click", (e) => {
        e.target.parentNode.style.background = "grey";
        e.target.parentNode.dataset.check = true;
      });

      btnD.addEventListener("click", (e) => {
        this.tasksArr.splice(+e.target.dataset.index, 1);
        console.log(this.tasksArr);
        this.renderTasks();
      });
      this.htmlElements.taskList.append(taskContainer);
    });
  }
  createDeleteBtn = (index) => {
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.dataset.index = index;
    return deleteBtn;
  };
  createCheckBtn = (index) => {
    const checkBtn = document.createElement("button");
    checkBtn.textContent = "J";
    checkBtn.classList.add("check-btn");
    checkBtn.dataset.index = index;
    return checkBtn;
  };
}

const newApp = new App();
