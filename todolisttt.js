document.addEventListener('DOMContentLoaded', () => {
            const taskInput = document.getElementById('InputBar');
            const addButton = document.getElementById('buttons');
            const taskList = document.getElementById('TaskList');
            
            // Load tasks from localStorage if available
            loadTasks();
            
            // Add task when button is clicked
            addButton.addEventListener('click', addTask);
            
            // Add task when Enter key is pressed
            taskInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    addTask();
                }
            });
            
            function addTask() {
                const taskText = taskInput.value.trim();
                
                if (taskText !== '') {
                    // Create task item
                    createTaskElement(taskText);
                    
                    // Clear input field
                    taskInput.value = '';
                    
                    // Save tasks to localStorage
                    saveTasks();
                }
            }
            
            function createTaskElement(text, checked = false) {
                const taskItem = document.createElement('div');
                taskItem.className = 'task-item';
                
                const taskText = document.createElement('span');
                taskText.className = 'task-text';
                taskText.textContent = text;
                if (checked) {
                    taskText.classList.add('checked');
                }
                
                const taskActions = document.createElement('div');
                taskActions.className = 'task-actions';
                
                const checkButton = document.createElement('button');
                checkButton.className = 'check-button';
                checkButton.innerHTML = '✓';
                checkButton.addEventListener('click', () => {
                    taskText.classList.toggle('checked');
                    saveTasks();
                });
                
                const deleteButton = document.createElement('button');
                deleteButton.className = 'delete-button';
                deleteButton.innerHTML = '✕';
                deleteButton.addEventListener('click', () => {
                    taskList.removeChild(taskItem);
                    saveTasks();
                });
                
                taskActions.appendChild(checkButton);
                taskActions.appendChild(deleteButton);
                
                taskItem.appendChild(taskText);
                taskItem.appendChild(taskActions);
                
                taskList.appendChild(taskItem);
            }
            
            function saveTasks() {
                const tasks = [];
                const taskItems = document.querySelectorAll('.task-item');
                
                taskItems.forEach(item => {
                    const taskText = item.querySelector('.task-text').textContent;
                    const isChecked = item.querySelector('.task-text').classList.contains('checked');
                    tasks.push({ text: taskText, checked: isChecked });
                });
                
                localStorage.setItem('tasks', JSON.stringify(tasks));
            }
            
            function loadTasks() {
                const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
                
                tasks.forEach(task => {
                    createTaskElement(task.text, task.checked);
                });
            }
        });