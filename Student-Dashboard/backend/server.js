const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Path to store students data
const dataFilePath = path.join(__dirname, "students.json");

// Ensure the JSON file exists
if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, "[]", "utf8");
}

// POST /student – Add new student
app.post("/student", (req, res) => {
    const { name, email, course } = req.body;

    if (!name || !email || !course) {
        return res.status(400).json({ error: "All fields are required" });
    }

    // Read current students
    const data = JSON.parse(fs.readFileSync(dataFilePath, "utf8"));

    // Add new student
    const newStudent = {
        id: Date.now(), // simple unique ID
        name,
        email,
        course,
    };

    data.push(newStudent);

    // Save back to file
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf8");

    res.status(201).json({ message: "Student added", student: newStudent });
});

// GET /students – Get all students
app.get("/students", (req, res) => {
    const data = JSON.parse(fs.readFileSync(dataFilePath, "utf8"));
    res.json(data);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});