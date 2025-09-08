const payerData = [
    {
        payer: "Medicare",
        volume: "42%",
        revenue: "38%",
        reimbursement: "$6,850",
        margin: "8.2%"
    },
    {
        payer: "Commercial",
        volume: "35%",
        revenue: "45%",
        reimbursement: "$12,400",
        margin: "18.5%"
    },
    {
        payer: "Medicaid",
        volume: "18%",
        revenue: "12%",
        reimbursement: "$4,200",
        margin: "2.1%"
    },
    {
        payer: "Self-Pay",
        volume: "5%",
        revenue: "5%",
        reimbursement: "$8,900",
        margin: "12.3%"
    }
];

const expenseData = [
    { category: "Salaries & Benefits", budget: 28.5, actual: 29.2, percentage: 55.3 },
    { category: "Medical Supplies", budget: 8.2, actual: 7.9, percentage: 15.0 },
    { category: "Pharmaceuticals", budget: 4.8, actual: 5.1, percentage: 9.7 },
    { category: "Professional Services", budget: 2.1, actual: 2.3, percentage: 4.4 },
    { category: "Utilities", budget: 1.2, actual: 1.1, percentage: 2.1 }
];

function populatePayerTable() {
    const tableBody = document.getElementById('payer-table');
    
    payerData.forEach(payer => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${payer.payer}</td>
            <td>${payer.volume}</td>
            <td>${payer.revenue}</td>
            <td>${payer.reimbursement}</td>
            <td>${payer.margin}</td>
        `;
        tableBody.appendChild(row);
    });
}

function createExpenseChart() {
    const chartContainer = document.getElementById('expense-chart');
    
    expenseData.forEach(expense => {
        const variance = expense.actual - expense.budget;
        const varianceClass = variance > 0 ? 'trend-up' : 'trend-down';
        
        const expenseItem = document.createElement('div');
        expenseItem.className = 'metric-item';
        expenseItem.innerHTML = `
            <div>
                <span class="metric-label">${expense.category}</span>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${expense.percentage}%"></div>
                </div>
            </div>
            <div>
                <span class="metric-value">$${expense.actual}M</span>
                <span class="metric-trend ${varianceClass}">
                    ${variance > 0 ? '+' : ''}$${variance.toFixed(1)}M
                </span>
            </div>
        `;
        chartContainer.appendChild(expenseItem);
    });
}

function goBack() {
    window.history.back();
}

document.addEventListener('DOMContentLoaded', function() {
    populatePayerTable();
    createExpenseChart();
});
