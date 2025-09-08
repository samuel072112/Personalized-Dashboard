// Alert data arrays
    var criticalAlerts = [
        {
            id: "CB-2024-0156",
            title: "Cardiac Arrest - Room 208-B",
            location: "Cardiology Unit",
            time: "15:42:33",
            status: "Active",
            priority: "critical"
        },
        {
            id: "BC-2024-0089", 
            title: "Hospital at 95.8% Capacity",
            location: "Hospital-wide",
            time: "14:30:15",
            status: "Active",
            priority: "critical"
        },
        {
            id: "EQ-2024-0034",
            title: "Ventilator Failure - ICU",
            location: "ICU-12", 
            time: "13:45:22",
            status: "Active",
            priority: "critical"
        }
    ];

    var responseTeam = [
        {
            role: "Physician",
            responseTime: "1.8 minutes",
            status: "Available",
            location: "Emergency Department"
        },
        {
            role: "ICU Nurse", 
            responseTime: "2.1 minutes",
            status: "Available",
            location: "ICU Station 1"
        },
        {
            role: "Respiratory Therapist",
            responseTime: "2.5 minutes", 
            status: "In Code (Room 314)",
            location: "Room 314"
        },
        {
            role: "Pharmacist",
            responseTime: "3.2 minutes",
            status: "Available", 
            location: "Central Pharmacy"
        }
    ];

    var occupancyData = [
        {
            unit: "ICU",
            totalBeds: 28,
            occupied: 28,
            occupancy: "100%",
            status: "FULL"
        },
        {
            unit: "Medical/Surgical", 
            totalBeds: 180,
            occupied: 172,
            occupancy: "95.6%",
            status: "Critical"
        },
        {
            unit: "Emergency",
            totalBeds: 24,
            occupied: 23, 
            occupancy: "95.8%",
            status: "Critical"
        },
        {
            unit: "Pediatrics",
            totalBeds: 32,
            occupied: 24,
            occupancy: "75.0%", 
            status: "Normal"
        }
    ];

    // DOM manipulation functions
    function createAlertElement(alert) {
        var alertDiv = document.createElement('div');
        alertDiv.className = 'alert-item critical';
        
        alertDiv.innerHTML = 
            '<div class="alert-header">' +
                '<div class="alert-title">' + alert.title + '</div>' +
                '<div class="alert-time">' + alert.time + '</div>' +
            '</div>' +
            '<div class="alert-details">' +
                '<div class="alert-detail">' +
                    '<span>ID:</span>' +
                    '<strong>' + alert.id + '</strong>' +
                '</div>' +
                '<div class="alert-detail">' +
                    '<span>Location:</span>' +
                    '<strong>' + alert.location + '</strong>' +
                '</div>' +
                '<div class="alert-detail">' +
                    '<span>Status:</span>' +
                    '<strong>' + alert.status + '</strong>' +
                '</div>' +
            '</div>' +
            '<div class="alert-actions">' +
                '<button class="alert-button acknowledge" onclick="acknowledgeAlert(\'' + alert.id + '\')">Acknowledge</button>' +
                '<button class="alert-button escalate" onclick="escalateAlert(\'' + alert.id + '\')">Escalate</button>' +
                '<button class="alert-button resolve" onclick="resolveAlert(\'' + alert.id + '\')">Resolve</button>' +
            '</div>';
        
        return alertDiv;
    }

    function populateAlerts() {
        var container = document.getElementById('critical-alerts');
        
        for (var i = 0; i < criticalAlerts.length; i++) {
            var alertElement = createAlertElement(criticalAlerts[i]);
            container.appendChild(alertElement);
        }
    }

    function populateResponseTeam() {
        var tableBody = document.getElementById('response-team-table');
        
        for (var i = 0; i < responseTeam.length; i++) {
            var row = document.createElement('tr');
            var member = responseTeam[i];
            
            row.innerHTML = 
                '<td>' + member.role + '</td>' +
                '<td>' + member.responseTime + '</td>' +
                '<td>' + member.status + '</td>' +
                '<td>' + member.location + '</td>' +
                '<td><button class="alert-button" onclick="contactMember(\'' + member.role + '\')">Contact</button></td>';
            
            tableBody.appendChild(row);
        }
    }

    function populateOccupancy() {
        var tableBody = document.getElementById('occupancy-table');
        
        for (var i = 0; i < occupancyData.length; i++) {
            var row = document.createElement('tr');
            var unit = occupancyData[i];
            
            row.innerHTML = 
                '<td>' + unit.unit + '</td>' +
                '<td>' + unit.totalBeds + '</td>' +
                '<td>' + unit.occupied + '</td>' +
                '<td><strong>' + unit.occupancy + '</strong></td>' +
                '<td>' + unit.status + '</td>';
            
            tableBody.appendChild(row);
        }
    }

    // Event handling functions
    function acknowledgeAlert(alertId) {
        var buttons = document.querySelectorAll('button[onclick*="' + alertId + '"]');
        
        for (var i = 0; i < buttons.length; i++) {
            if (buttons[i].textContent === 'Acknowledge') {
                buttons[i].textContent = 'Acknowledged';
                buttons[i].style.backgroundColor = '#48bb78';
                buttons[i].disabled = true;
                break;
            }
        }
        
        showMessage('Alert ' + alertId + ' acknowledged');
    }

    function escalateAlert(alertId) {
        var buttons = document.querySelectorAll('button[onclick*="' + alertId + '"]');
        
        for (var i = 0; i < buttons.length; i++) {
            if (buttons[i].textContent === 'Escalate') {
                buttons[i].textContent = 'Escalated';
                buttons[i].style.backgroundColor = '#e53e3e';
                buttons[i].disabled = true;
                break;
            }
        }
        
        showMessage('Alert ' + alertId + ' escalated to supervisor');
    }

    function resolveAlert(alertId) {
        var alertItems = document.querySelectorAll('.alert-item');
        
        for (var i = 0; i < alertItems.length; i++) {
            var alertItem = alertItems[i];
            var idElement = alertItem.querySelector('.alert-detail strong');
            
            if (idElement && idElement.textContent === alertId) {
                alertItem.style.opacity = '0.5';
                
                setTimeout(function() {
                    alertItem.remove();
                    updateAlertCounts();
                }, 1000);
                break;
            }
        }
        
        showMessage('Alert ' + alertId + ' resolved');
    }

    function contactMember(role) {
        showMessage('Contacting ' + role + '...');
        
        setTimeout(function() {
            showMessage(role + ' contacted successfully');
        }, 2000);
    }

    // Basic logic functions
    function showMessage(text) {
        var messageDiv = document.createElement('div');
        messageDiv.textContent = text;
        messageDiv.style.cssText = 
            'position: fixed; top: 20px; right: 20px; background: #4299e1; color: white; ' +
            'padding: 15px; border-radius: 8px; z-index: 1000;';
        
        document.body.appendChild(messageDiv);
        
        setTimeout(function() {
            document.body.removeChild(messageDiv);
        }, 3000);
    }

    function updateAlertCounts() {
        var criticalAlerts = document.querySelectorAll('.alert-item.critical').length;
        var criticalCountElement = document.querySelector('.alert-count.critical');
        
        if (criticalCountElement) {
            criticalCountElement.textContent = criticalAlerts + ' Critical';
        }
    }

    function goBack() {
        window.history.back();
    }

    // Initialize when page loads
    document.addEventListener('DOMContentLoaded', function() {
        populateAlerts();
        populateResponseTeam();
        populateOccupancy();
    });