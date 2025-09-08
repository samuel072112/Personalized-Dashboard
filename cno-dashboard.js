const staffingData = [
    {
        unit: "ICU",
        budgeted: "45.0",
        actual: "43.2",
        ratio: "1:2.1",
        overtime: "156 hours/week"
    },
    {
        unit: "Med/Surg",
        budgeted: "78.0",
        actual: "74.5",
        ratio: "1:4.8",
        overtime: "234 hours/week"
    },
    {
        unit: "Emergency",
        budgeted: "32.0",
        actual: "30.8",
        ratio: "1:3.2",
        overtime: "89 hours/week"
    },
    {
        unit: "Pediatrics",
        budgeted: "24.0",
        actual: "23.5",
        ratio: "1:3.5",
        overtime: "45 hours/week"
    },
    {
        unit: "Labor & Delivery",
        budgeted: "18.0",
        actual: "17.2",
        ratio: "1:1.8",
        overtime: "67 hours/week"
    }
    
];
// This function is used for to taken physician data from an array and creates table rows to display information about each physician in a structured format.
    function populateStaffingTable() {
        const tableBody = document.getElementById('staffing-table'); //DOM physician table Id from html code
        
        staffingData.forEach(unit => { //Data appears to be an array containing physician objects
            const row = document.createElement('tr'); //creates a new HTML table row element, This row isn't yet visible on the page, it exists only in memory
            row.innerHTML = //inserts the value of each physician property `(${unit.property}` is template literal syntax)
            `
                <td>${unit.unit}</td>
                <td>${unit.budgeted}</td>
                <td>${unit.actual}</td>
                <td>${unit.ratio}</td>
                <td>${unit.overtime}</td>
            `;
            tableBody.appendChild(row); //appendChild() adds the newly created row to the table element, This makes the row visible on the webpage
        });
    }

    function goBack() { //This is a method that navigates to the previous page in the history.
        window.history.back();
    }
// Initialize dashboard when page loads
    document.addEventListener('DOMContentLoaded', function() {
        populateStaffingTable();
    });
