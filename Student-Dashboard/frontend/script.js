const BACKEND_URL = "http://localhost:3000";

// switch between screens
document.getElementById("btnAdd").onclick = function () {
    document.getElementById("addSection").style.display = "block";
    document.getElementById("viewSection").style.display = "none";
};

document.getElementById("btnView").onclick = function () {
    document.getElementById("addSection").style.display = "none";
    document.getElementById("viewSection").style.display = "block";
    loadStudents();
};

// send student data to backend
document.getElementById("submitStudent").onclick = async function () {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const course = document.getElementById("course").value;

    const response = await fetch(`${BACKEND_URL}/student`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, course })
    });

    const message = document.getElementById("addMessage");

    if (response.ok) {
        message.innerText = "Student added successfully!";
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("course").value = "";
    } else {
        message.innerText = "Error adding student.";
    }
};

// load all students
async function loadStudents() {
    const list = document.getElementById("studentList");

    const response = await fetch(`${BACKEND_URL}/students`);
    const data = await response.json();

    if (data.length === 0) {
        list.innerHTML = "No students yet.";
        return;
    }

    list.innerHTML = "";
    data.forEach((student) => {
        list.innerHTML += `
            <p>
                <strong>${student.name}</strong> <br>
                ${student.email} <br>
                ${student.course}
            </p>
            <hr>
        `;
    });
}
