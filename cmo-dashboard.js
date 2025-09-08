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

    function populatePhysicianTable() {
        const tableBody = document.getElementById('physician-table');
        
        physicianData.forEach(physician => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${physician.name}</td>
                <td>${physician.specialty}</td>
                <td>${physician.volume}</td>
                <td>${physician.los}</td>
                <td>${physician.quality}</td>
                <td>${physician.satisfaction}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    function goBack() {
        window.history.back();
    }

    // Initialize dashboard when page loads
    document.addEventListener('DOMContentLoaded', function() {
        populatePhysicianTable();
    });
