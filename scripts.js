document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    updateSummary();
});

function setupEventListeners() {
    // Revenue modal
    document.getElementById('addRevenueBtn').addEventListener('click', () => {
        document.getElementById('revenueModal').style.display = 'flex';
    });

    // Expense modal
    document.getElementById('addExpenseBtn').addEventListener('click', () => {
        document.getElementById('expenseModal').style.display = 'flex';
    });

    // Close modals
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', event => {
            const modalId = event.target.getAttribute('data-modal');
            document.getElementById(modalId).style.display = 'none';
        });
    });

    // Revenue form
    document.getElementById('revenueForm').addEventListener('submit', event => {
        event.preventDefault();
        addEntry('Revenue');
        document.getElementById('revenueModal').style.display = 'none';
    });

    // Expense form
    document.getElementById('expenseForm').addEventListener('submit', event => {
        event.preventDefault();
        addEntry('Expense');
        document.getElementById('expenseModal').style.display = 'none';
    });

    // Search functionality
    document.getElementById('revenueSearch').addEventListener('input', filterRevenue);
}

function addEntry(type) {
    const description = document.getElementById(`${type.toLowerCase()}Description`).value;
    const receipt = document.getElementById(`${type.toLowerCase()}Receipt`).value;
    const amount = parseFloat(document.getElementById(`${type.toLowerCase()}Amount`).value).toFixed(2);

    const tableBody = document.getElementById(`${type.toLowerCase()}TableBody`);
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${description}</td>
        <td>${receipt}</td>
        <td>$${amount}</td>
        <td>
            <button class="editBtn">Edit</button>
            <button class="deleteBtn">Delete</button>
        </td>
    `;
    tableBody.appendChild(row);

    updateSummary();
}

function filterRevenue() {
    const query = document.getElementById('revenueSearch').value.toLowerCase();
    const rows = document.querySelectorAll('#revenueTableBody tr');

    rows.forEach(row => {
        const description = row.cells[0].textContent.toLowerCase();
        const receipt = row.cells[1].textContent.toLowerCase();
        row.style.display = description.includes(query) || receipt.includes(query) ? '' : 'none';
    });
}

function updateSummary() {
    const revenueTotal = calculateTotal('#revenueTableBody');
    const expenseTotal = calculateTotal('#expensesTableBody');

    document.getElementById('revenueSubtotal').textContent = revenueTotal.toFixed(2);
    document.getElementById('expensesSubtotal').textContent = expenseTotal.toFixed(2);
    document.getElementById('totalBalance').textContent = (revenueTotal - expenseTotal).toFixed(2);
}

function calculateTotal(tableId) {
    const rows = document.querySelectorAll(`${tableId} tr`);
    return Array.from(rows).reduce((total, row) => {
        const amount = parseFloat(row.cells[2].textContent.replace('$', ''));
        return total + amount;
    }, 0);
}
