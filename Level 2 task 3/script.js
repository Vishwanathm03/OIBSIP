document.getElementById('addTaskBtn').addEventListener('click', addTask);

let tasks = [];

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    const dateTime = new Date().toLocaleString();

    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    const task = {
        text: taskText,
        completed: false,
        dateAdded: dateTime,
        dateCompleted: null,
    };

    tasks.push(task);
    taskInput.value = '';
    renderTasks();
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    tasks[index].dateCompleted = tasks[index].completed ? new Date().toLocaleString() : null;
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function renderTasks() {
    const pendingTasksList = document.getElementById('pendingTasks');
    const completedTasksList = document.getElementById('completedTasks');

    pendingTasksList.innerHTML = '';
    completedTasksList.innerHTML = '';

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${task.text} (Added: ${task.dateAdded})${task.completed ? ` (Completed: ${task.dateCompleted})` : ''}</span>
            <div>
                <button onclick="toggleComplete(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
                <button onclick="deleteTask(${index})">Delete</button>
            </div>
        `;

        if (task.completed) {
            listItem.classList.add('completed');
            completedTasksList.appendChild(listItem);
        } else {
            pendingTasksList.appendChild(listItem);
        }
    });
}
