const events = [];
const tasks = [];

document.getElementById('eventForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const title = document.getElementById('eventTitle').value;
    const date = document.getElementById('eventDate').value;
    const time = document.getElementById('eventTime').value;
    const location = document.getElementById('eventLocation').value;
    const description = document.getElementById('eventDescription').value;

    const newEvent = { title, date, time, location, description };
    events.push(newEvent);
    displayEvents();

    
    setTimeout(() => notifyUser(newEvent), 10000); // Notify after 10 seconds for demo

    document.getElementById('eventForm').reset();
});

function displayEvents() {
    const eventsList = document.getElementById('eventsList');
    eventsList.innerHTML = '';

    events.forEach(event => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <strong>${event.title}</strong><br>
            ${event.date} ${event.time}<br>
            ${event.location}<br>
            ${event.description}
        `;
        eventsList.appendChild(listItem);
    });
}

function notifyUser(event) {
    if (Notification.permission === 'granted') {
        new Notification('Reminder: ' + event.title, {
            body: `Event on ${event.date} at ${event.time}`,
            icon: 'icon.png'
        });
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                notifyUser(event);
            }
        });
    }
}

document.getElementById('addTaskButton').addEventListener('click', function() {
    const taskInput = document.getElementById('taskInput');
    const task = taskInput.value.trim();

    if (task) {
        tasks.push(task);
        displayTasks();
        taskInput.value = '';
    }
});

function displayTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const listItem = document.createElement('li');
        listItem.textContent = task;
        taskList.appendChild(listItem);
    });
}
