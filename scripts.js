document.addEventListener('DOMContentLoaded', () => {
    updateSummary();
});

// Open modals
document.getElementById('addRevenueBtn').addEventListener('click', () => {
    document.getElementById('revenueModal').style.display = 'flex';
});

document.getElementById('addExpenseBtn').addEventListener('click', () => {
    document.getElementById('expenseModal').style.display = 'flex';
});

// Close modals
document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.addEventListener('click', (event) => {
        const modalId = event.target.getAttribute('data-modal');
        document.getElementById(modalId).style.display = 'none';
    });
});

// Handle revenue form submission
document.getElementById('revenueForm').addEventListener('submit', (event) => {
    event.preventDefault();
    addEntry('Revenue', document.getElementById('revenueDescription').value, parseFloat(document.getElementById('revenueAmount').value));
    document.getElementById('revenueModal').style.display = 'none';
});

// Handle expense form submission
document.getElementById('expenseForm').addEventListener('submit', (event) => {
    event.preventDefault();
    addEntry('Expense', document.getElementById('expenseDescription').value, parseFloat(document.getElementById('expenseAmount').value));
    document.getElementById('expenseModal').style.display = 'none';
});

// Add a new entry
function addEntry(type, description, amount) {
    const tableBody = document.getElementById('entriesTableBody');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${type}</td>
        <td>${description}</td>
        <td class="amount">$${amount.toFixed(2)}</td>
        <td>
            <button class="editBtn">Edit</button>
            <button class="deleteBtn">Delete</button>
            <button class="voidBtn">Void</button>
        </td>
    `;
    tableBody.appendChild(row);
    updateSummary();
}

// Update financial summary
function updateSummary() {
    const rows = document.querySelectorAll('#entriesTableBody tr');
    let revenueTotal = 0;
    let expensesTotal = 0;

    rows.forEach(row => {
        const type = row.cells[0].textContent;
        const amount = parseFloat(row.cells[2].textContent.replace('$', ''));
        if (type === 'Revenue') {
            revenueTotal += amount;
        } else if (type === 'Expense') {
            expensesTotal += amount;
        }
    });

    document.getElementById('revenueSubtotal').textContent = revenueTotal.toFixed(2);
    document.getElementById('expensesSubtotal').textContent = expensesTotal.toFixed(2);
    document.getElementById('totalBalance').textContent = (revenueTotal - expensesTotal).toFixed(2);
}
