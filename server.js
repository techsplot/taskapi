const express = require('express');
const cors = require('cors');
const tasksRouter = require('./routes/tasks');
const setupSwagger = require('./swagger');

const app = express();
app.use(cors());
app.use(express.json());
setupSwagger(app); 
const PORT = 3000;
app.use('/tasks', tasksRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);

})