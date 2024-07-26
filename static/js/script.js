document.addEventListener("DOMContentLoaded", function() {
    const tasksElement = document.getElementById('tasks-data');
    if (tasksElement) {
        try {
            // Extract and clean the JSON text
            let jsonText = tasksElement.textContent.trim();

            // Remove any leading and trailing script tags
            jsonText = jsonText.replace(/^\s*<script[^>]*>|<\/script>\s*$/g, '');

            // Parse the cleaned JSON data
            const tasks = JSON.parse(jsonText);
            console.log("Parsed tasks:", tasks); // Check if the tasks are correctly parsed

            // Example of adding tasks to balloons
            tasks.forEach(task => {
                // Adjust based on the actual JSON structure
                const title = task.title;
                const deadline = task.deadline;

                // Check for undefined or null values
                if (title && deadline) {
                    addTask(title, deadline);
                } else {
                    console.error("Invalid task data:", task);
                }
            });
        } catch (error) {
            console.error("Error parsing JSON data:", error);
        }
    } else {
        console.error("Tasks data script element not found.");
    }
});



function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function calculateBalloonSize(taskDeadline) {
    const timeDiff = new Date(taskDeadline) - new Date();
    const hoursLeft = Math.ceil(timeDiff / (1000 * 60 * 60));
    const minBalloonSize = 100;
    const maxBalloonSize = 350;
    const balloonSize = Math.min(maxBalloonSize, minBalloonSize + (maxBalloonSize - minBalloonSize) * (1 - hoursLeft / (24 * 7)));
    return Math.max(minBalloonSize, balloonSize);
}

function formatTimeLeft(timeDiff) {
    const totalSeconds = Math.floor(timeDiff / 1000);
    const days = Math.floor(totalSeconds / (60 * 60 * 24));
    const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = totalSeconds % 60;
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

function addTask(taskName, taskDeadline) {
    const balloonContainer = document.getElementById('balloon-container');
    const balloon = document.createElement('div');
    balloon.classList.add('balloon');
    
    const taskNameElement = document.createElement('div');
    taskNameElement.classList.add('task-name');
    taskNameElement.textContent = taskName;
    
    const deadlineElement = document.createElement('div');
    deadlineElement.classList.add('deadline');
    deadlineElement.textContent = new Date(taskDeadline).toLocaleString();
    
    const timeLeftElement = document.createElement('div');
    timeLeftElement.classList.add('time-left');
    
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = 'X';
    deleteButton.title = 'Delete Task';  // Added tooltip
    deleteButton.addEventListener('click', function() {
        balloonContainer.removeChild(balloon);
    });

    const completeButton = document.createElement('button');
    completeButton.classList.add('complete-button');
    completeButton.textContent = '✔';
    completeButton.title = 'Complete Task';  // Added tooltip
    completeButton.addEventListener('click', function() {
        balloon.style.animation = 'explode 0.5s forwards';
        balloon.addEventListener('animationend', function() {
            balloonContainer.removeChild(balloon);
        });
    });
    
    balloon.appendChild(taskNameElement);
    balloon.appendChild(deadlineElement);
    balloon.appendChild(timeLeftElement);
    balloon.appendChild(deleteButton);
    balloon.appendChild(completeButton);
    balloonContainer.appendChild(balloon);

    // Set the initial color
    const balloonColor = getRandomColor();
    balloon.style.backgroundColor = balloonColor;

    function updateTask() {
        updateBalloonSize(balloon, taskNameElement, deadlineElement, timeLeftElement, taskDeadline, deleteButton, completeButton);
        const timeDiff = new Date(taskDeadline) - new Date();
        if (timeDiff <= 0) {
            timeLeftElement.textContent = 'Time is up!';
        } else {
            timeLeftElement.textContent = formatTimeLeft(timeDiff);
        }
    }

    updateTask();
    setInterval(updateTask, 1000);
}

function updateBalloonSize(balloon, taskNameElement, deadlineElement, timeLeftElement, taskDeadline, deleteButton, completeButton) {
    const balloonSize = calculateBalloonSize(taskDeadline);
    balloon.style.width = balloonSize + 'px';
    balloon.style.height = balloonSize + 'px';

    const fontSize = balloonSize / 12; // Make the font size a bit smaller
    taskNameElement.style.fontSize = fontSize * 1.5 + 'px'; // Set to a smaller size
    taskNameElement.style.top = (balloonSize * 0.3) + 'px'; // Centered
    deadlineElement.style.fontSize = fontSize + 'px';
    deadlineElement.style.top = (balloonSize * 0.5) + 'px';
    timeLeftElement.style.fontSize = fontSize + 'px';
    timeLeftElement.style.top = (balloonSize * 0.7) + 'px'; // Centered

    // Adjust button size and position dynamically based on balloon size
    const buttonSize = Math.max(20, balloonSize * 0.15); // Set minimum size
    deleteButton.style.width = buttonSize + 'px';
    deleteButton.style.height = buttonSize + 'px';
    deleteButton.style.fontSize = buttonSize * 0.5 + 'px';
    deleteButton.style.top = balloonSize * 0.8 + 'px';
    deleteButton.style.left = balloonSize * 0.2 + 'px';

    completeButton.style.width = buttonSize + 'px';
    completeButton.style.height = buttonSize + 'px';
    completeButton.style.fontSize = buttonSize * 0.5 + 'px';
    completeButton.style.top = balloonSize * 0.8 + 'px';
    completeButton.style.right = balloonSize * 0.2 + 'px';
}