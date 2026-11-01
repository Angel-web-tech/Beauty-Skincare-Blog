
// Load saved tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

// Get HTML elements
const form = document.getElementById("taskForm");
const input = document.getElementById("taskInput");
const list = document.getElementById("taskList");
const counter = document.getElementById("counter");

// Create a new task
function createTask(text) {
    return {
        id: Date.now() + Math.random(),
        text: text,
        done: false
    };
}

// Add a task
function addTask(text) {
    tasks.push(createTask(text));
    saveAndRender();
}

// Complete or undo a task
function toggleTask(id) {
    tasks = tasks.map(t =>
        t.id === id ? { ...t, done: !t.done } : t
    );

    saveAndRender();
}

// Delete a task
function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveAndRender();
}

// Get tasks based on the selected filter
function getVisible() {
    if (currentFilter === "open") {
        return tasks.filter(t => !t.done);
    }
    else if (currentFilter === "completed") {
        return tasks.filter(t => t.done);
    }
    else {
        return tasks;
    }
}

// Count remaining tasks
function countOpen() {
    return tasks.filter(t => !t.done).length;
}

// Create an individual task item
function taskItem(t) {
    const li = document.createElement("li");
    li.className = "task-item";

    if (t.done) {
        li.classList.add("completed");
    }

    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = t.text;

    const actions = document.createElement("div");
    actions.className = "task-actions";

    // Complete or Undo button
    const completeButton = document.createElement("button");
    completeButton.type = "button";
    completeButton.textContent = t.done ? "Undo" : "Complete";

    completeButton.addEventListener("click", function() {
        toggleTask(t.id);
    });

    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", function() {
        deleteTask(t.id);
    });

    actions.appendChild(completeButton);
    actions.appendChild(deleteButton);

    li.appendChild(span);
    li.appendChild(actions);

    return li;
}

// Display tasks on the webpage
function renderTasks() {
    list.innerHTML = "";

    const visibleTasks = getVisible();

    if (visibleTasks.length === 0) {
        const message = document.createElement("li");
        message.className = "empty-message";
        message.textContent = "No tasks to display.";
        list.appendChild(message);
    }

    visibleTasks.forEach(t => {
        list.appendChild(taskItem(t));
    });

    counter.textContent = countOpen() + " tasks remaining";
}

// Save tasks and update the webpage
function saveAndRender() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

// Handle form submission
function handleSubmit(event) {
    event.preventDefault();

    const text = input.value.trim();

    if (text !== "") {
        addTask(text);
        input.value = "";
    }
    else {
        alert("Please enter a task!");
    }

    input.focus();
}

// Handle filter button clicks
document.querySelectorAll(".filters button").forEach(button => {
    button.addEventListener("click", function() {
        currentFilter = button.dataset.filter;

        document.querySelectorAll(".filters button").forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");
        renderTasks();
    });
});

// Listen for form submission
form.addEventListener("submit", handleSubmit);

// Display saved tasks when the page loads
renderTasks();
