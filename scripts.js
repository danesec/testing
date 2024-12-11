// Event listeners for opening modals
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

// Handle adding revenue
document.getElementById('revenueForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const description = document.getElementById('revenueDescription').value;
    const amount = document.getElementById('revenueAmount').value;
    addEntry('Revenue', description, amount);
    document.getElementById('revenueModal').style.display = 'none';
});

// Handle adding expense
document.getElementById('expenseForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const description = document.getElementById('expenseDescription').value;
    const amount = document.getElementById('expenseAmount').value;
    addEntry('Expense', description, amount);
    document.getElementById('expenseModal').style.display = 'none';
});

// Function to add a new entry
function addEntry(type, description, amount) {
    const tableBody = document.getElementById('entriesTableBody');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${type}</td>
        <td>${description}</td>
        <td>$${amount}</td>
        <td>
            <button class="editBtn">Edit</button>
            <button class="deleteBtn">Delete</button>
            <button class="voidBtn">Void</button>
        </td>
    `;
    tableBody.appendChild(row);
}

// Event delegation for edit, delete, and void actions
document.getElementById('entriesTableBody').addEventListener('click', (event) => {
    if (event.target.classList.contains('deleteBtn')) {
        event.target.closest('tr').remove();
    } else if (event.target.classList.contains('editBtn')) {
        alert('Edit functionality not implemented yet!');
    } else if (event.target.classList.contains('voidBtn')) {
        alert('Void functionality not implemented yet!');
    }
});
