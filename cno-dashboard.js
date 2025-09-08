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

    function populateStaffingTable() {
        const tableBody = document.getElementById('staffing-table');
        
        staffingData.forEach(unit => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${unit.unit}</td>
                <td>${unit.budgeted}</td>
                <td>${unit.actual}</td>
                <td>${unit.ratio}</td>
                <td>${unit.overtime}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    function goBack() {
        window.history.back();
    }

    document.addEventListener('DOMContentLoaded', function() {
        populateStaffingTable();
    });
