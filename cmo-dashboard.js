    const physicianData = [
        {
            name: "Dr. Smith",
            specialty: "Cardiology",
            volume: "145 patients/month",
            los: "3.2 days",
            quality: "96%",
            satisfaction: "4.6/5.0"
        },
        {
            name: "Dr. Johnson",
            specialty: "Emergency",
            volume: "280 patients/month",
            los: "4.8 hours",
            quality: "94%",
            satisfaction: "4.3/5.0"
        },
        {
            name: "Dr. Williams",
            specialty: "Surgery",
            volume: "85 procedures/month",
            los: "2.1 days",
            quality: "98%",
            satisfaction: "4.7/5.0"
        },
        {
            name: "Dr. Brown",
            specialty: "Internal Med",
            volume: "220 patients/month",
            los: "4.1 days",
            quality: "95%",
            satisfaction: "4.4/5.0"
        }
    ];
    // This function is used for to taken physician data from an array and creates table rows to display information about each physician in a structured format.
    function populatePhysicianTable() {
        const tableBody = document.getElementById('physician-table'); //DOM physician table Id from html code
        
        physicianData.forEach(physician => { //Data appears to be an array containing physician objects
            const row = document.createElement('tr'); //creates a new HTML table row element, This row isn't yet visible on the page, it exists only in memory
            row.innerHTML = //inserts the value of each physician property `(${physician.property}` is template literal syntax)
            `
                <td>${physician.name}</td> 
                <td>${physician.specialty}</td>
                <td>${physician.volume}</td>
                <td>${physician.los}</td>
                <td>${physician.quality}</td>
                <td>${physician.satisfaction}</td>
            `;
            tableBody.appendChild(row); //appendChild() adds the newly created row to the table element, This makes the row visible on the webpage
        });
    }

    function goBack() { //This is a method that navigates to the previous page in the history.
        window.history.back();
    }

    // Initialize dashboard when page loads
    document.addEventListener('DOMContentLoaded', function() {
        populatePhysicianTable();
    });
