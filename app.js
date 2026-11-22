
// ===================================
// INTERACTIVE TO-DO LIST
// ===================================

// 1. Create an empty tasks array
let tasks = [];

// 2. Select HTML elements
const form = document.getElementById("form");
const input = document.getElementById("text");
const list = document.getElementById("list");
const count = document.getElementById("count");
const clearCompleted = document.getElementById("clearCompleted");

// 3. Load tasks from LocalStorage
function load() {
    try {
        return JSON.parse(localStorage.getItem("tasks")) || [];
    } catch (error) {
        return [];
    }
}

// 4. Save tasks to LocalStorage
function save() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// 5. Display tasks on the webpage
function render() {

    list.innerHTML = "";

    tasks.forEach(function(task) {

        const li = document.createElement("li");
        li.dataset.id = task.id;

        if (task.done) {
            li.classList.add("done");
        }

        // Task name
        const label = document.createElement("span");
        label.textContent = task.text;

        // Done button
        const doneButton = document.createElement("button");
        doneButton.textContent = task.done ? "Undo" : "Done";
        doneButton.dataset.action = "toggle";

        // Delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.dataset.action = "delete";

        li.append(label, doneButton, deleteButton);

        list.append(li);
    });

    // Remaining tasks counter
    const remaining = tasks.filter(function(task) {
        return !task.done;
    }).length;

    count.textContent = remaining + " tasks left";
}

// 6. Add new tasks
form.addEventListener("submit", function(event) {

    event.preventDefault();

    const text = input.value.trim();

    if (text === "") {
        alert("Please enter a task!");
        return;
    }

    const newTask = {
        id: Date.now(),
        text: text,
        done: false
    };

    tasks.push(newTask);

    input.value = "";

    save();
    render();
});

// 7. Complete or delete tasks
list.addEventListener("click", function(event) {

    const action = event.target.dataset.action;

    if (!action) return;

    const li = event.target.closest("li");

    if (!li) return;

    const id = Number(li.dataset.id);

    if (action === "delete") {

        tasks = tasks.filter(function(task) {
            return task.id !== id;
        });

    }

    if (action === "toggle") {

        tasks.forEach(function(task) {

            if (task.id === id) {
                task.done = !task.done;
            }

        });

    }

    save();
    render();
});

// 8. Clear completed tasks
clearCompleted.addEventListener("click", function() {

    tasks = tasks.filter(function(task) {
        return !task.done;
    });

    save();
    render();
});

// 9. Filter tasks
let currentFilter = "all";

document.querySelector(".filters").addEventListener("click", function(event) {

    const filter = event.target.dataset.filter;

    if (!filter) return;

    currentFilter = filter;

    render();
});

// 10. Load and display saved tasks
const originalRender = render;

render = function() {

    list.innerHTML = "";

    let filteredTasks = tasks.filter(function(task) {

        if (currentFilter === "active") {
            return !task.done;
        }

        if (currentFilter === "done") {
            return task.done;
        }

        return true;
    });

    filteredTasks.forEach(function(task) {

        const li = document.createElement("li");
        li.dataset.id = task.id;

        if (task.done) {
            li.classList.add("done");
        }

        const label = document.createElement("span");
        label.textContent = task.text;

        const doneButton = document.createElement("button");
        doneButton.textContent = task.done ? "Undo" : "Done";
        doneButton.dataset.action = "toggle";

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.dataset.action = "delete";

        li.append(label, doneButton, deleteButton);
        list.append(li);
    });

    const remaining = tasks.filter(function(task) {
        return !task.done;
    }).length;

    count.textContent = remaining + " tasks left";
};

tasks = load();
render();

console.log("To-Do List JavaScript connected successfully!");
