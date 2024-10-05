import express from 'express';
import cors from 'cors';
const PORT = 8000;

const app = express();
app.use(cors())

// middleware for JSON
app.use(express.json());

const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
]

// GET Request -- Fetching all users
app.get('/api/users', (req, res) => {
    res.status(201).json({ users: users });
})

// POST Request -- Adding new users
app.post('/api/users', (req, res) => {
    users.push({ id: users.length + 1, ...req.body });
    res.status(201).json({ message: "User addedd successfully!" });
})


// PUT Request -- Updating a User
app.put('/api/users/:id', (req, res) => {
    try {
        const indexToBeUpdated = users.findIndex((u) => u.id === Number(req.params.id));
        console.log("indexToBeUpdated ---->", indexToBeUpdated);
        if (indexToBeUpdated !== -1) {
            users.splice(indexToBeUpdated, 1, { id: req.params.id, ...req.body });
            res.status(201).json({ user: users });
        }
        else {
            res.status(404).json({ message: "User Not Found!" });
        }

    } catch (error) {
        res.status(403).json({ message: error.message });
    }
})

// DELETE Request -- Deleting a User
app.delete('/api/users/:id', (req, res) => {
    try {
        const indexToBeDeleted = users.findIndex((u) => u.id === Number(req.params.id));
        if (indexToBeDeleted !== -1) {
            users.splice(indexToBeDeleted, 1);
            res.status(201).json({ message: "User deleted successfully!" });
        }
        else {
            res.status(404).json({ message: "User Not Found!" });
        }
    } catch (error) {
        res.status(403).json({ message: error.message });
    }

})

app.listen(PORT, (req, res) => {
    console.log(`The Server is listening at PORT ${PORT}`);
})