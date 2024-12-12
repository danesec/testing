document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    updateSummary();
    drawCharts();
});

function updateSummary() {
    const revenueTotal = calculateTotal('revenueTableBody');
    const expenseTotal = calculateTotal('expensesTableBody');

    document.getElementById('revenueSubtotal').textContent = revenueTotal.toFixed(2);
    document.getElementById('expensesSubtotal').textContent = expenseTotal.toFixed(2);
    document.getElementById('totalBalance').textContent = (revenueTotal - expenseTotal).toFixed(2);
}

function calculateTotal(tableBodyId) {
    const rows = document.querySelectorAll(`#${tableBodyId} tr`);
    let total = 0;

    rows.forEach(row => {
        const amount = parseFloat(row.cells[6].textContent.replace('$', ''));
        total += amount;
    });

    return total;
}