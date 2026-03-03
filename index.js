const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/tasks');

const app = express();
app.use(cors()); // Enable CORS for all origins
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Use routes
app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
    res.send('Task Tracker API is running!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});