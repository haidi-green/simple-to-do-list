// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // DOM Load event
  document.addEventListener('DOMContentLoaded', getTasks);

  form.addEventListener('submit', addTask);
  taskList.addEventListener('click', removeTask);
  clearBtn.addEventListener('click', clearTasks);
  filter.addEventListener('keyup', filterTasks);
}

// Add Task
function addTask(e) {
  
  if (taskInput.value === '') {
    alert('Add a task');
  }

  else {
    const li = document.createElement('li');
    li.className = 'collection-item list-group-item d-flex justify-content-between align-items-center';

    li.appendChild(document.createTextNode(taskInput.value));
    
    const link = document.createElement('a');
    link.className = 'delete-item';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    
    li.appendChild(link);
    taskList.appendChild(li);

    // Add to LS
    storeTaskInLocalStorage(taskInput.value);

    // Clear input
    taskInput.value = '';
  }

  e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  }
  else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Get Tasks from LS
function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  }
  else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task) {
    const li = document.createElement('li');
    li.className = 'collection-item list-group-item d-flex justify-content-between align-items-center';

    li.appendChild(document.createTextNode(task));
    
    const link = document.createElement('a');
    link.className = 'delete-item';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    
    li.appendChild(link);
    taskList.appendChild(li);
  })
}

// Remove Task
function removeTask(e) {
  // e.target = whatever we click on

  const link = e.target.parentElement;
  const li = e.target.parentElement.parentElement;

  if (link.classList.contains('delete-item')) {
    if (confirm('Are you sure you want to delete this task?')) {
      li.remove();
      // here we remove the <li> itself
    }
  }

  // Remove from LS
  removeTaskFromLocalStorage(li);
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  }
  else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Tasks
function clearTasks() {

  if (taskList.firstChild === null) {
    alert('There are no tasks to delete');
  }
  else {
    if (confirm('Are you sure you want to delete this task?')) {
      while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
      }  
    }
  }
  
  // Clear from LS
  clearTasksFromLocalStorage();
}

// Clear Tasks from LS
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase(); // what we type in the filter input

  document.querySelectorAll('.collection-item').forEach(function(task) { // task now equals each element with the 'collection-item' class, which means it equals each li
    const item = task.textContent.trim().toLowerCase(); // first item in each li is the content (value)

    if (item.includes(text)) {
      task.classList.remove('hidden');
    } else {
      task.classList.add('hidden');
    }

  });  
}
