// Verify element existence in HTML
function setupEventListeners() {
    const addRevenueBtn = document.getElementById('addRevenueBtn');
    const addRevenueModal = document.getElementById('addRevenueModal');
    const addExpenseBtn = document.getElementById('addExpenseBtn');
    const addExpenseModal = document.getElementById('addExpenseModal');
    const closeBtns = document.querySelectorAll('.close');

    if (addRevenueBtn && addRevenueModal) {
        addRevenueBtn.addEventListener('click', () => {
            clearForm('addRevenue');
            addRevenueModal.style.display = 'flex';
        });
    }

    if (addExpenseBtn && addExpenseModal) {
        addExpenseBtn.addEventListener('click', () => {
            clearForm('addExpense');
            addExpenseModal.style.display = 'flex';
        });
    }

    if (closeBtns) {
        closeBtns.forEach(closeBtn => {
            closeBtn.addEventListener('click', (event) => {
                const modalId = event.target.getAttribute('data-modal');
                const modalElement = document.getElementById(modalId);
                if (modalElement) {
                    modalElement.style.display = 'none';
                }
            });
        });
    }
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
