// Function to simulate loading JSON data (mini API mock using setTimeout)
function loadStudentData() {
    // Simulate a 2-second delay (like an API call)
    setTimeout(() => {
        // Sample JSON data as a string (in a real app, this could come from fetch())
        const jsonData = `[
            {
                "id": 1,
                "name": "Alice Johnson",
                "age": 20,
                "major": "Computer Science",
                "gpa": 3.8
            },
            {
                "id": 2,
                "name": "Bob Smith",
                "age": 22,
                "major": "Engineering",
                "gpa": 3.5
            },
            {
                "id": 3,
                "name": "Charlie Brown",
                "age": 19,
                "major": "Mathematics",
                "gpa": 4.0
            }
        ]`;

        try {
            // Parse the JSON string into an array of objects
            const students = JSON.parse(jsonData);

            // Hide loading message and show table
            document.getElementById('loading').style.display = 'none';
            document.getElementById('studentTable').style.display = 'table';

            // Dynamically populate the table
            const tableBody = document.getElementById('tableBody');
            students.forEach(student => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${student.id}</td>
                    <td>${student.name}</td>
                    <td>${student.age}</td>
                    <td>${student.major}</td>
                    <td>${student.gpa}</td>
                `;
                tableBody.appendChild(row);
            });
        } catch (error) {
            // Handle parsing errors
            document.getElementById('loading').style.display = 'none';
            document.getElementById('error').style.display = 'block';
            document.getElementById('error').textContent = 'Error parsing JSON: ' + error.message;
        }
    }, 2000); // 2-second delay
}

// Call the function when the page loads
window.onload = loadStudentData;