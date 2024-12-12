document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    updateSummary();
    drawCharts();
});

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

    // Handle Add Revenue Form Submission
    document.getElementById('addRevenueForm').addEventListener('submit', (event) => {
        event.preventDefault();
        addEntry('Revenue');
        document.getElementById('addRevenueModal').style.display = 'none';
    });

    // Handle Edit Revenue Form Submission
    document.getElementById('editRevenueForm').addEventListener('submit', (event) => {
        event.preventDefault();
        updateEntry('Revenue');
        document.getElementById('editRevenueModal').style.display = 'none';
    });

    // Handle Add Expense Form Submission
    document.getElementById('addExpenseForm').addEventListener('submit', (event) => {
        event.preventDefault();
        addEntry('Expense');
        document.getElementById('addExpenseModal').style.display = 'none';
    });

    // Handle Edit Expense Form Submission
    document.getElementById('editExpenseForm').addEventListener('submit', (event) => {
        event.preventDefault();
        updateEntry('Expense');
        document.getElementById('editExpenseModal').style.display = 'none';
    });

    // Search and Filter Tables
    document.getElementById('revenueSearch').addEventListener('input', filterTable);
    document.getElementById('expenseSearch').addEventListener('input', filterTable);
    document.getElementById('revenueTypeFilter').addEventListener('change', filterTable);
    document.getElementById('expenseTypeFilter').addEventListener('change', filterTable);

    // Add event listeners for dynamic 'Edit' and 'Delete' buttons
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('editBtn')) {
            handleEdit(event.target.closest('tr'));
        } else if (event.target.classList.contains('deleteBtn')) {
            handleDelete(event.target.closest('tr'));
        }
    });
}

function addEntry(type) {
    const formPrefix = `add${type}`;
    const tableBody = document.getElementById(`${type.toLowerCase()}TableBody`);

    const entryData = {
        type: document.getElementById(`${formPrefix}Type`).value,
        date: document.getElementById(`${formPrefix}Date`).value,
        receipt: document.getElementById(`${formPrefix}Receipt`).value,
        payment: document.getElementById(`${formPrefix}Payment`).value,
        name: document.getElementById(`${formPrefix}Name`).value,
        contact: document.getElementById(`${formPrefix}Contact`).value,
        subtotal: parseFloat(document.getElementById(`${formPrefix}SubtotalInput`).value).toFixed(2),
        fee: parseFloat(document.getElementById(`${formPrefix}Fee`).value).toFixed(2),
        notes: document.getElementById(`${formPrefix}Notes`).value
    };

    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${entryData.type}</td>
        <td>${entryData.date}</td>
        <td>${entryData.receipt}</td>
        <td>${entryData.payment}</td>
        <td>${entryData.name}</td>
        <td>${entryData.contact}</td>
        <td>$${entryData.subtotal}</td>
        <td>$${entryData.fee}</td>
        <td>${entryData.notes}</td>
        <td>
            <button class="editBtn">Edit</button>
            <button class="deleteBtn">Delete</button>
        </td>
    `;

    tableBody.appendChild(row);
    updateSummary();
    drawCharts(); // Redraw charts after adding an entry
}

function filterTable() {
    const query = document.getElementById('revenueSearch').value.toLowerCase();
    const revenueRows = document.querySelectorAll('#revenueTableBody tr');
    const expenseRows = document.querySelectorAll('#expensesTableBody tr');
    const revenueTypeFilter = document.getElementById('revenueTypeFilter').value.toLowerCase();
    const expenseTypeFilter = document.getElementById('expenseTypeFilter').value.toLowerCase();

    filterRows(revenueRows, query, revenueTypeFilter);
    filterRows(expenseRows, query, expenseTypeFilter);
}

function filterRows(rows, query, typeFilter) {
    rows.forEach(row => {
        const description = row.cells[0].textContent.toLowerCase();
        const receipt = row.cells[2].textContent.toLowerCase();
        const contact = row.cells[5].textContent.toLowerCase();
        const matchesQuery = description.includes(query) || receipt.includes(query) || contact.includes(query);
        const matchesType = typeFilter === '' || description.includes(typeFilter);
        row.style.display = matchesQuery && matchesType ? '' : 'none';
    });
}

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

function updateEntry(type) {
    const formPrefix = `edit${type}`;
    const tableBody = document.getElementById(`${type.toLowerCase()}TableBody`);
    const editingRow = document.getElementById(`${formPrefix}Form`).dataset.editingRow;

    const entryData = {
        type: document.getElementById(`${formPrefix}Type`).value,
        date: document.getElementById(`${formPrefix}Date`).value,
        receipt: document.getElementById(`${formPrefix}Receipt`).value,
        payment: document.getElementById(`${formPrefix}Payment`).value,
        name: document.getElementById(`${formPrefix}Name`).value,
        contact: document.getElementById(`${formPrefix}Contact`).value,
        subtotal: parseFloat(document.getElementById(`${formPrefix}SubtotalInput`).value).toFixed(2),
        fee: parseFloat(document.getElementById(`${formPrefix}Fee`).value).toFixed(2),
        notes: document.getElementById(`${formPrefix}Notes`).value
    };

    const row = tableBody.rows[editingRow - 1];
    row.cells[0].textContent = entryData.type;
    row.cells[1].textContent = entryData.date;
    row.cells[2].textContent = entryData.receipt;
    row.cells[3].textContent = entryData.payment;
    row.cells[4].textContent = entryData.name;
    row.cells[5].textContent = entryData.contact;
    row.cells[6].textContent = `$${entryData.subtotal}`;
    row.cells[7].textContent = `$${entryData.fee}`;
    row.cells[8].textContent = entryData.notes;

    updateSummary();
    drawCharts(); // Redraw charts after updating an entry
}

function clearForm(formPrefix) {
    document.getElementById(`${formPrefix}Form`).reset();
    delete document.getElementById(`${formPrefix}Form`).dataset.editingRow;
}

function drawCharts() {
    // Implement chart drawing logic using a library like Chart.js
}