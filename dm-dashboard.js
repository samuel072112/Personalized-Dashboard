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
    { day: "Monday", volume: 295 },
    { day: "Tuesday", volume: 278 },
    { day: "Wednesday", volume: 312 },
    { day: "Thursday", volume: 289 },
    { day: "Friday", volume: 325 },
    { day: "Saturday", volume: 198 },
    { day: "Sunday", volume: 165 }
];

function populateSchedulingTable() {
    const tableBody = document.getElementById('scheduling-table');
    
    schedulingData.forEach(staff => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${staff.role}</td>
            <td>${staff.scheduled}</td>
            <td>${staff.actual}</td>
            <td>${staff.overtime}</td>
            <td>${staff.productivity}</td>
        `;
        tableBody.appendChild(row);
    });
}

function createVolumeChart() {
    const chartContainer = document.getElementById('volume-chart');
    const maxVolume = Math.max(...volumeData.map(d => d.volume));
    
    volumeData.forEach(data => {
        const barHeight = (data.volume / maxVolume) * 100;
        
        const volumeItem = document.createElement('div');
        volumeItem.className = 'metric-item';
        volumeItem.innerHTML = `
            <div>
                <span class="metric-label">${data.day}</span>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${barHeight}%"></div>
                </div>
            </div>
            <span class="metric-value">${data.volume} patients</span>
        `;
        chartContainer.appendChild(volumeItem);
    });
}

function goBack() {
    window.history.back();
}

document.addEventListener('DOMContentLoaded', function() {
    populateSchedulingTable();
    createVolumeChart();
});
