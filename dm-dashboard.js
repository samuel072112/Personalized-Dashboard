const schedulingData = [
    {
        role: "RN",
        scheduled: "32.0",
        actual: "30.8",
        overtime: "89 hours",
        productivity: "96.3%"
    },
    {
        role: "Physician",
        scheduled: "12.0",
        actual: "11.5",
        overtime: "24 hours",
        productivity: "95.8%"
    },
    {
        role: "Tech",
        scheduled: "18.0",
        actual: "17.2",
        overtime: "45 hours",
        productivity: "95.6%"
    },
    {
        role: "Support Staff",
        scheduled: "8.0",
        actual: "7.8",
        overtime: "12 hours",
        productivity: "97.5%"
    }
];

const volumeData = [
    { 
        day: "Monday", 
        volume: 295 
    },
    { 
        day: "Tuesday", 
        volume: 278 
    },
    { 
        day: "Wednesday", 
        volume: 312 
    },
    { 
        day: "Thursday", 
        volume: 289 
    },
    { 
        day: "Friday", 
        volume: 325 
    },
    { 
        day: "Saturday", 
        volume: 198 
    },
    { 
        day: "Sunday", 
        volume: 165 
    }
];

// This function is used for to taken physician data from an array and creates table rows to display information about each physician in a structured format.
function populateSchedulingTable() {
    const tableBody = document.getElementById('scheduling-table'); //DOM physician table Id from html code
    
    schedulingData.forEach(staff => { //Data appears to be an array containing physician objects

        const row = document.createElement('tr'); //creates a new HTML table row element, This row isn't yet visible on the page, it exists only in memory
        row.innerHTML = //inserts the value of each physician property `(${staff.property}` is template literal syntax)
        `
            <td>${staff.role}</td>
            <td>${staff.scheduled}</td>
            <td>${staff.actual}</td>
            <td>${staff.overtime}</td>
            <td>${staff.productivity}</td>
        `;
        tableBody.appendChild(row); //appendChild() adds the newly created row to the table element, This makes the row visible on the webpage
    });
}

function createVolumeChart() { //Creates a function to build the volume chart
    const chartContainer = document.getElementById('volume-chart');
    const maxVolume = Math.max(...volumeData.map(d => d.volume));
    
    volumeData.forEach(data => {
        const barHeight = (data.volume / maxVolume) * 100;
        
        const volumeItem = document.createElement('div'); //Creates a new <div> for each day's data
        volumeItem.className = 'metric-item';
        volumeItem.innerHTML = //This creates a simpler structure than the expense chart 
        `
            <div>
                <span class="metric-label">${data.day}</span>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${barHeight}%"></div>
                </div>
            </div>
            <span class="metric-value">${data.volume} patients</span>
        `;
        chartContainer.appendChild(volumeItem); //Makes it visible on the webpage
    });
}

function goBack() { //This is a method that navigates to the previous page in the history.
    window.history.back();
}

//Initialize dashboard when page loads
document.addEventListener('DOMContentLoaded', function() {
    populateSchedulingTable();
    createVolumeChart();
});
