function setupEventListeners() {
    // Open Add Revenue Modal
    document.getElementById('addRevenueBtn').addEventListener('click', () => {
        clearForm('addRevenue');
        document.getElementById('addRevenueModal').style.display = 'flex';
    });

    // Open Add Expense Modal
    document.getElementById('addExpenseBtn').addEventListener('click', () => {
        clearForm('addExpense');
        document.getElementById('addExpenseModal').style.display = 'flex';
    });

    // Close Modals
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', (event) => {
            const modalId = event.target.getAttribute('data-modal');
            document.getElementById(modalId).style.display = 'none';
        });
    });

    // Add event listeners for dynamic 'Edit' and 'Delete' buttons
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('editBtn')) {
            handleEdit(event.target.closest('tr'));
        } else if (event.target.classList.contains('deleteBtn')) {
            handleDelete(event.target.closest('tr'));
        }
    });
}

function handleEdit(row) {
    const formPrefix = row.closest('table').id === 'revenueTable' ? 'editRevenue' : 'editExpense';
    document.getElementById(`${formPrefix}Type`).value = row.cells[0].textContent;
    document.getElementById(`${formPrefix}Date`).value = row.cells[1].textContent;
    document.getElementById(`${formPrefix}Receipt`).value = row.cells[2].textContent;
    document.getElementById(`${formPrefix}Payment`).value = row.cells[3].textContent;
    document.getElementById(`${formPrefix}Name`).value = row.cells[4].textContent;
    document.getElementById(`${formPrefix}Contact`).value = row.cells[5].textContent;
    document.getElementById(`${formPrefix}SubtotalInput`).value = parseFloat(row.cells[6].textContent.replace('$', ''));
    document.getElementById(`${formPrefix}Fee`).value = parseFloat(row.cells[7].textContent.replace('$', ''));
    document.getElementById(`${formPrefix}Notes`).value = row.cells[8].textContent;
    document.getElementById(`${formPrefix}Modal`).style.display = 'flex';
    document.getElementById(`${formPrefix}Form`).dataset.editingRow = row.rowIndex;
}

function handleDelete(row) {
    row.remove();
    updateSummary();
    drawCharts(); // Redraw charts after deleting an entry
}