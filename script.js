const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const addBtn = document.getElementById('addBtn');

addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') addTask();
});

function addTask() {
  const task = taskInput.value.trim();
  if (task) {
    const li = createTaskElement(task);
    taskList.appendChild(li);
    saveTask(task);
    taskInput.value = '';
  }
}

function createTaskElement(task) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  span.textContent = task;
  const delBtn = document.createElement('button');
  delBtn.textContent = '✖';
  delBtn.className = 'delete-btn';
  delBtn.onclick = function () {
    taskList.removeChild(li);
    deleteTask(task);
  };
  li.appendChild(span);
  li.appendChild(delBtn);
  return li;
}

function saveTask(task) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteTask(taskToRemove) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.filter(task => task !== taskToRemove);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => {
    const li = createTaskElement(task);
    taskList.appendChild(li);
  });
}

loadTasks();
