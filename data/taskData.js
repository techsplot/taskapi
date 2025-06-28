let taskStorage = [];
let currentId = 1;

function getAllTasks() {
  return taskStorage;
}

function getTaskById(id) {
  return taskStorage.find(task => task.id === id);
}

function createTask(title, description) {
    const newTask = {
        id: currentId++,
        title: title,
        description: description || '',
    }
  taskStorage.push(newTask);

    return newTask;
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask
};