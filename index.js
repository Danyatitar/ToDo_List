const input = document.querySelector(".task-input");
const form = document.querySelector(".form");
const error = document.querySelector(".error");
const task_list = document.querySelector(".task-list");
const completed_number = document.querySelector(".completed-tasks");
const tasks_left_number = document.querySelector(".tasks-left");
const delete_all = document.querySelector(".delete-all");
function add_element_actions(storage, i) {
  tasks_left_number.innerHTML = Number(tasks_left_number.innerHTML) + 1;
  error.classList.add("hidden");
  let task_content = document.createElement("div");
  task_content.classList.add("task-content");
  task_content.classList.add("animate__animated");
  task_content.classList.add("animate__fadeInLeft");

  let task_status = document.createElement("div");
  task_status.classList.add("task-status");

  let status = document.createElement("span");
  status.classList.add("status");

  let task = document.createElement("input");
  task.type = "text";
  task.setAttribute("readonly", "readonly");
  task.classList.add("task");
  if (storage) {
    task.value = localStorage.key(i);
    if (localStorage.getItem(localStorage.key(i)) == "true") {
      tasks_left_number.innerHTML = Number(tasks_left_number.innerHTML) - 1;
      completed_number.innerHTML = Number(completed_number.innerHTML) + 1;
      status.classList.add("checked");
      task.classList.add("completed");
      task_content.classList.add("done");
    }
  } else {
    task.value = input.value;
  }

  task_status.appendChild(status);
  task_status.appendChild(task);

  let buttons = document.createElement("div");
  let edit = document.createElement("button");
  edit.classList.add("edit");
  edit.innerHTML = "edit";
  let delete_task = document.createElement("button");
  delete_task.classList.add("delete");
  delete_task.innerHTML = "delete";

  buttons.appendChild(edit);
  buttons.appendChild(delete_task);

  task_content.appendChild(task_status);
  task_content.appendChild(buttons);

  task_list.appendChild(task_content);

  if (!storage) {
    localStorage.setItem(input.value, false);
    input.value = "";
  }

  edit.addEventListener("click", () => {
    if (edit.innerHTML.toLocaleLowerCase() === "edit") {
      edit.innerHTML = "save";
      task.focus();
      task.removeAttribute("readonly");
      localStorage.removeItem(task.value, false);
    } else {
      edit.innerHTML = "edit";
      localStorage.setItem(task.value, false);
      task.setAttribute("readonly", "readonly");
    }
  });
  delete_task.addEventListener("click", () => {
    const storage_status = localStorage.getItem(task.value);
    if (storage_status == "true") {
      completed_number.innerHTML = Number(completed_number.innerHTML) - 1;
    } else {
      tasks_left_number.innerHTML = Number(tasks_left_number.innerHTML) - 1;
    }
    localStorage.removeItem(task.value);
    task_content.classList.remove("animate__fadeInLeft");
    task_content.classList.add("animate__fadeOutRight");
    setTimeout(() => task_list.removeChild(task_content), 1000);
  });

  status.addEventListener("click", () => {
    const storage_status = localStorage.getItem(task.value);
    let new_status = storage_status == "true" ? false : true;
    if (new_status == true) {
      tasks_left_number.innerHTML = Number(tasks_left_number.innerHTML) - 1;
      completed_number.innerHTML = Number(completed_number.innerHTML) + 1;
    } else {
      tasks_left_number.innerHTML = Number(tasks_left_number.innerHTML) + 1;
      completed_number.innerHTML = Number(completed_number.innerHTML) - 1;
    }
    localStorage.setItem(task.value, new_status);
    status.classList.toggle("checked");
    task.classList.toggle("completed");
    task_content.classList.toggle("done");
  });
  const select = document.getElementById("select");
  select.addEventListener("change", () => {
    const tasks = document.querySelectorAll(".task-content");
    if (select.value === "all") {
      tasks.forEach((item) => {
        if (item.classList.contains("hidden")) {
          item.classList.remove("hidden");
        }
      });
    } else if (select.value === "completed") {
      tasks.forEach((item) => {
        if (!item.classList.contains("done")) {
          item.classList.add("hidden");
        } else {
          item.classList.remove("hidden");
        }
      });
    } else {
      tasks.forEach((item) => {
        if (item.classList.contains("done")) {
          item.classList.add("hidden");
        } else {
          item.classList.remove("hidden");
        }
      });
    }
  });
}

function show_storage() {
  for (let i = 0; i < localStorage.length; i++) {
    add_element_actions(true, i);
  }
}
show_storage();
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!input.value) {
    error.classList.remove("hidden");
  } else {
    add_element_actions(false, 0);
  }
});
delete_all.addEventListener("click", () => {
  const tasks = document.querySelectorAll(".task-content");
  tasks.forEach((item) => {
    item.classList.remove("animate__fadeInLeft");
    item.classList.add("animate__fadeOutRight");
  });
  tasks_left_number.innerHTML = 0;
  completed_number.innerHTML = 0;
  localStorage.clear();
  setTimeout(() => {
    tasks.forEach((item) => {
      task_list.removeChild(item);
    });
  }, 500);
});
