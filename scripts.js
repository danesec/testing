document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    updateSummary();
});

function setupEventListeners() {
    // Open Revenue Modal
    document.getElementById('addRevenueBtn').addEventListener('click', () => {
        document.getElementById('revenueModal').style.display = 'flex';
    });

    // Open Expense Modal
    document.getElementById('addExpenseBtn').addEventListener('click', () => {
        document.getElementById('expenseModal').style.display = 'flex';
    });

    // Close Modals
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', (event) => {
            const modalId = event.target.getAttribute('data-modal');
            document.getElementById(modalId).style.display = 'none';
        });
    });

    // Handle Revenue Form Submission
    document.getElementById('revenueForm').addEventListener('submit', (event) => {
        event.preventDefault();
        addEntry('Revenue');
        document.getElementById('revenueModal').style.display = 'none';
    });

    // Handle Expense Form Submission
    document.getElementById('expenseForm').addEventListener('submit', (event) => {
        event.preventDefault();
        addEntry('Expense');
        document.getElementById('expenseModal').style.display = 'none';
    });

    // Search Revenue Table
    document.getElementById('revenueSearch').addEventListener('input', filterTable);

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
    const formPrefix = type.toLowerCase();
    const tableBody = document.getElementById(`${formPrefix}TableBody`);

    const entryData = {
        type: document.getElementById(`${formPrefix}Type`).value,
        date: document.getElementById(`${formPrefix}Date`).value,
        receipt: document.getElementById(`${formPrefix}Receipt`).value,
        payment: document.getElementById(`${formPrefix}Payment`).value,
        name: document.getElementById(`${formPrefix}Name`).value,
        contact: document.getElementById(`${formPrefix}Contact`).value,
        subtotal: parseFloat(document.getElementById(`${formPrefix}Subtotal`).value).toFixed(2),
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
}

function filterTable() {
    const query = document.getElementById('revenueSearch').value.toLowerCase();
    const rows = document.querySelectorAll('#revenueTableBody tr');

    rows.forEach(row => {
        const description = row.cells[0].textContent.toLowerCase();
        const receipt = row.cells[2].textContent.toLowerCase();
        const contact = row.cells[5].textContent.toLowerCase();
        const matches = description.includes(query) || receipt.includes(query) || contact.includes(query);
        row.style.display = matches ? '' : 'none';
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
    // Implement edit functionality here
    console.log('Edit button clicked for row:', row);
}

function handleDelete(row) {
    row.remove();
    updateSummary();
}
