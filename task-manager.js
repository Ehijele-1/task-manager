const addTask = document.querySelector("#added-task");
const add = document.querySelector("#add");
const ul = document.querySelector("ul");
const complete = document.querySelector(".completed");
const active = document.querySelector(".active");
const total = document.querySelector(".total");
const tasksFilter = document.querySelector(".tasks-filter");
const clearCompleted = document.querySelector(".clear");

let storedTasks = localStorage.getItem("taskss");
let tasks = storedTasks ? JSON.parse(storedTasks) : [];

function savedTasks() {
    localStorage.setItem("taskss", JSON.stringify(tasks));
}

function countTasks() {
    total.textContent = tasks.length;

    let countComplete = 0;
    let countActive = 0;

    tasks.forEach((element) => {
        if (element.completed === true) {
            countComplete++;
        } else {
            countActive++;
        }
    });

    complete.textContent = countComplete;
    active.textContent = countActive;
}

function display(random) {
    ul.textContent = "";
    random.forEach((element) => {
        const li = document.createElement("li");
        li.classList.add("task");
        li.innerHTML = `
            <input type="checkbox" data-id="${element.id}" ${element.completed ? "checked" : ""}>
            <p class="task-text">${element.task}</p>
            <input style="display: none" class="edit-input" type="text" value="${element.task}">
            <button class="save-button" style="display: none" data-id="${element.id}">Save</button>
            <button class="edit-button" data-id="${element.id}">Edit</button>
            <button class="delete-button" data-id="${element.id}">Delete</button>
        `;
        ul.append(li);
    });
}

function newTask() {
    if (addTask.value.trim() == "") {
        return;
    }

    const taskObj = {
        id: Date.now(),
        task: addTask.value.trim(),
        completed: false,
    };

    tasks.push(taskObj);
    addTask.value = "";
    savedTasks();
    display(tasks);
    countTasks();
}

ul.addEventListener("change", function (event) {
    if (event.target.type === "checkbox") {
        const id = Number(event.target.dataset.id);
        const task = tasks.find((el) => el.id === id);

        if (task) {
            task.completed = event.target.checked;
            savedTasks();
            countTasks();
        }
    }
});

ul.addEventListener("click", function (event) {
    const target = event.target;
    const taskRow = target.closest(".task");
    const editInput = taskRow.querySelector(".edit-input");
    const deleteButton = taskRow.querySelector(".delete-button");
    const editButton = taskRow.querySelector(".edit-button");
    const taskText = taskRow.querySelector(".task-text");
    const saveButton = taskRow.querySelector(".save-button");

    // Delete
    if (target.classList.contains("delete-button")) {
        const id = Number(target.dataset.id);
        tasks = tasks.filter((element) => element.id !== id);
        savedTasks();
        display(tasks);
        countTasks();
        return;
    }

    // Edit
    if (target.classList.contains("edit-button")) {
        taskText.style.display = "none";
        editInput.style.display = "inline-block";
        saveButton.style.display = "inline-block";
        editButton.style.display = "none";
        deleteButton.style.display = "none";
        editInput.focus();
        return;
    }

    // Save edited value
    if (target.classList.contains("save-button")) {
        const editingId = Number(target.dataset.id);
        const newVal = editInput.value.trim();
        if (newVal === "") {
            return;
        }
        const task = tasks.find((element) => element.id === editingId);
        if (task) {
            task.task = newVal;
            savedTasks();
            display(tasks);
            countTasks();
        }
        return;
    }
});

add.addEventListener("click", function () {
    newTask();
});

// Filter tasks
tasksFilter.addEventListener("click", function (event) {
    const button = event.target;

    if (button.classList.contains("completed-button")) {
        display(tasks.filter((element) => element.completed));
    } else if (button.classList.contains("active-button")) {
        display(tasks.filter((element) => !element.completed));
    } else if (button.classList.contains("all-button")) {
        display(tasks);
    }
});

// Clear completed
clearCompleted.addEventListener("click", function () {
    tasks = tasks.filter((element) => element.completed !== true);
    savedTasks();
    display(tasks);
    countTasks();
});

display(tasks);
countTasks();