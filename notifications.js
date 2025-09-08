    // Notifications data
    var notifications = [
        {
            id: "QM-2024-001",
            category: "quality",
            title: "Patient Satisfaction Score Below Target",
            description: "Overall satisfaction dropped to 3.8/5.0, below the 4.0 target threshold.",
            time: "2 hours ago",
            priority: "medium"
        },
        {
            id: "FN-2024-002", 
            category: "financial",
            title: "Emergency Department Over Budget",
            description: "ED expenses exceeded monthly budget by $300K (10.7% variance).",
            time: "4 hours ago",
            priority: "high"
        },
        {
            id: "CM-2024-003",
            category: "compliance", 
            title: "Joint Commission Score Warning",
            description: "Compliance score at 94%, below required 95% threshold.",
            time: "6 hours ago",
            priority: "medium"
        },
        {
            id: "SF-2024-004",
            category: "safety",
            title: "Medication Error Rate Increase", 
            description: "Medication errors increased 15% to 1.1 per 1000 doses.",
            time: "8 hours ago",
            priority: "high"
        },
        {
            id: "QM-2024-005",
            category: "quality",
            title: "30-Day Readmission Rate Alert",
            description: "Readmission rate at 11.2%, exceeding 9.5% target.",
            time: "1 day ago", 
            priority: "medium"
        },
        {
            id: "FN-2024-006",
            category: "financial",
            title: "Collection Rate Below Target",
            description: "Collection rate dropped to 91.5%, below 95% target.",
            time: "1 day ago",
            priority: "medium"
        }
    ];

    var incidentData = [
        {
            type: "Medication Errors",
            thisMonth: 12,
            lastMonth: 10,
            trend: "up",
            severity: "Medium"
        },
        {
            type: "Patient Falls", 
            thisMonth: 8,
            lastMonth: 7,
            trend: "up",
            severity: "High"
        },
        {
            type: "Equipment Malfunctions",
            thisMonth: 6,
            lastMonth: 8,
            trend: "down", 
            severity: "Medium"
        },
        {
            type: "Near Miss Events",
            thisMonth: 21,
            lastMonth: 16,
            trend: "up",
            severity: "Low"
        }
    ];

    var budgetData = [
        {
            department: "Emergency",
            budget: "$2.8M",
            actual: "$3.1M", 
            variance: "+$300K",
            status: "Over Budget"
        },
        {
            department: "ICU",
            budget: "$4.2M",
            actual: "$4.6M",
            variance: "+$400K", 
            status: "Over Budget"
        },
        {
            department: "Surgery", 
            budget: "$3.5M",
            actual: "$3.2M",
            variance: "-$300K",
            status: "Under Budget"
        },
        {
            department: "Pharmacy",
            budget: "$1.8M",
            actual: "$2.1M",
            variance: "+$300K",
            status: "Over Budget"
        }
    ];

    // DOM manipulation functions
    function createNotificationElement(notification) {
        var notificationDiv = document.createElement('div');
        notificationDiv.className = 'notification-item ' + notification.category;
        
        notificationDiv.innerHTML = 
            '<div class="notification-category category-' + notification.category + '">' + 
                notification.category.toUpperCase() + 
            '</div>' +
            '<div class="notification-header">' +
                '<div class="notification-title">' + notification.title + '</div>' +
                '<div class="notification-time">' + notification.time + '</div>' +
            '</div>' +
            '<div class="notification-description">' + notification.description + '</div>' +
            '<div class="notification-actions">' +
                '<button class="notification-button view" onclick="viewNotification(\'' + notification.id + '\')">View Details</button>' +
                '<button class="notification-button dismiss" onclick="dismissNotification(\'' + notification.id + '\')">Dismiss</button>' +
            '</div>';
        
        return notificationDiv;
    }

    function populateNotifications() {
        var container = document.getElementById('notifications-list');
        container.innerHTML = '';
        
        for (var i = 0; i < notifications.length; i++) {
            var notificationElement = createNotificationElement(notifications[i]);
            container.appendChild(notificationElement);
        }
    }

    function populateIncidentsTable() {
        var tableBody = document.getElementById('incidents-table');
        
        for (var i = 0; i < incidentData.length; i++) {
            var row = document.createElement('tr');
            var incident = incidentData[i];
            
            var trendIcon = incident.trend === 'up' ? '↑' : incident.trend === 'down' ? '↓' : '→';
            var trendClass = 'trend-' + incident.trend;
            
            row.innerHTML = 
                '<td>' + incident.type + '</td>' +
                '<td>' + incident.thisMonth + '</td>' +
                '<td>' + incident.lastMonth + '</td>' +
                '<td><span class="' + trendClass + '">' + trendIcon + ' ' + incident.trend + '</span></td>' +
                '<td>' + incident.severity + '</td>';
            
            tableBody.appendChild(row);
        }
    }

    function populateBudgetTable() {
        var tableBody = document.getElementById('budget-table');
        
        for (var i = 0; i < budgetData.length; i++) {
            var row = document.createElement('tr');
            var budget = budgetData[i];
            
            var statusClass = budget.status === 'Over Budget' ? 'status-warning' : 'status-normal';
            
            row.innerHTML = 
                '<td>' + budget.department + '</td>' +
                '<td>' + budget.budget + '</td>' +
                '<td>' + budget.actual + '</td>' +
                '<td>' + budget.variance + '</td>' +
                '<td><span class="' + statusClass + '">' + budget.status + '</span></td>';
            
            tableBody.appendChild(row);
        }
    }

    // Event handling functions
    function filterNotifications(category) {
        var filterButtons = document.querySelectorAll('.filter-btn');
        var notificationItems = document.querySelectorAll('.notification-item');
        
        // Update active filter button
        for (var i = 0; i < filterButtons.length; i++) {
            filterButtons[i].classList.remove('active');
        }
        
        var clickedButton = event.target;
        clickedButton.classList.add('active');
        
        // Show/hide notifications based on filter
        for (var i = 0; i < notificationItems.length; i++) {
            var item = notificationItems[i];
            
            if (category === 'all') {
                item.style.display = 'block';
            } else {
                if (item.classList.contains(category)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            }
        }
        
        updateNotificationCounts();
    }

    function viewNotification(notificationId) {
        var notification = null;
        
        for (var i = 0; i < notifications.length; i++) {
            if (notifications[i].id === notificationId) {
                notification = notifications[i];
                break;
            }
        }
        
        if (notification) {
            showMessage('Viewing details for: ' + notification.title);
            
            // Create detailed view
            var detailDiv = document.createElement('div');
            detailDiv.style.cssText = 
                'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); ' +
                'background: white; padding: 30px; border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.3); ' +
                'z-index: 1000; max-width: 500px; width: 90%;';
            
            detailDiv.innerHTML = 
                '<h3>' + notification.title + '</h3>' +
                '<p><strong>Category:</strong> ' + notification.category.toUpperCase() + '</p>' +
                '<p><strong>Time:</strong> ' + notification.time + '</p>' +
                '<p><strong>Priority:</strong> ' + notification.priority + '</p>' +
                '<p><strong>Description:</strong> ' + notification.description + '</p>' +
                '<button onclick="closeDetailView()" style="margin-top: 20px; padding: 10px 20px; background: #4299e1; color: white; border: none; border-radius: 6px; cursor: pointer;">Close</button>';
            
            document.body.appendChild(detailDiv);
            
            // Add overlay
            var overlay = document.createElement('div');
            overlay.id = 'detail-overlay';
            overlay.style.cssText = 
                'position: fixed; top: 0; left: 0; width: 100%; height: 100%; ' +
                'background: rgba(0,0,0,0.5); z-index: 999;';
            overlay.onclick = closeDetailView;
            
            document.body.appendChild(overlay);
        }
    }

    function closeDetailView() {
        var detailDiv = document.querySelector('div[style*="position: fixed"][style*="transform: translate(-50%, -50%)"]');
        var overlay = document.getElementById('detail-overlay');
        
        if (detailDiv) {
            document.body.removeChild(detailDiv);
        }
        if (overlay) {
            document.body.removeChild(overlay);
        }
    }

    function dismissNotification(notificationId) {
        var notificationItems = document.querySelectorAll('.notification-item');
        
        for (var i = 0; i < notificationItems.length; i++) {
            var item = notificationItems[i];
            var viewButton = item.querySelector('button[onclick*="' + notificationId + '"]');
            
            if (viewButton) {
                item.style.opacity = '0.5';
                item.style.transform = 'scale(0.95)';
                
                setTimeout(function() {
                    item.remove();
                    updateNotificationCounts();
                }, 500);
                break;
            }
        }
        
        // Remove from notifications array
        for (var i = 0; i < notifications.length; i++) {
            if (notifications[i].id === notificationId) {
                notifications.splice(i, 1);
                break;
            }
        }
        
        showMessage('Notification dismissed');
    }

    // Basic logic functions
    function updateNotificationCounts() {
        var visibleNotifications = document.querySelectorAll('.notification-item[style*="display: block"], .notification-item:not([style*="display: none"])');
        var qualityCount = 0;
        var financialCount = 0;
        var complianceCount = 0;
        var safetyCount = 0;
        
        for (var i = 0; i < visibleNotifications.length; i++) {
            var item = visibleNotifications[i];
            if (item.classList.contains('quality')) qualityCount++;
            if (item.classList.contains('financial')) financialCount++;
            if (item.classList.contains('compliance')) complianceCount++;
            if (item.classList.contains('safety')) safetyCount++;
        }
        
        var totalCount = visibleNotifications.length;
        var infoCountElement = document.querySelector('.notification-count.info');
        
        if (infoCountElement) {
            infoCountElement.textContent = totalCount + ' New';
        }
    }

    function showMessage(text) {
        var messageDiv = document.createElement('div');
        messageDiv.textContent = text;
        messageDiv.style.cssText = 
            'position: fixed; top: 20px; right: 20px; background: #4299e1; color: white; ' +
            'padding: 15px; border-radius: 8px; z-index: 1000; box-shadow: 0 4px 12px rgba(0,0,0,0.2);';
        
        document.body.appendChild(messageDiv);
        
        setTimeout(function() {
            if (document.body.contains(messageDiv)) {
                document.body.removeChild(messageDiv);
            }
        }, 3000);
    }

    function goBack() {
        window.history.back();
    }

    // Initialize when page loads
    document.addEventListener('DOMContentLoaded', function() {
        populateNotifications();
        populateIncidentsTable();
        populateBudgetTable();
        updateNotificationCounts();
    });

    // Simple refresh functionality
    function refreshNotifications() {
        showMessage('Refreshing notifications...');
        
        setTimeout(function() {
            populateNotifications();
            updateNotificationCounts();
            showMessage('Notifications updated');
        }, 1000);
    }

    // Add refresh button functionality (if you want to add a refresh button to HTML)
    function addRefreshButton() {
        var header = document.querySelector('.dashboard-header');
        var refreshButton = document.createElement('button');
        refreshButton.textContent = 'Refresh';
        refreshButton.style.cssText = 
            'padding: 8px 16px; background: #4299e1; color: white; border: none; ' +
            'border-radius: 6px; cursor: pointer; margin-top: 10px;';
        refreshButton.onclick = refreshNotifications;
        
        header.appendChild(refreshButton);
    }