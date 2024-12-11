let revenueData = [];
let expenseData = [];

const revenueTable = document.getElementById('revenueTable');
const expensesTable = document.getElementById('expensesTable');

// Filter table based on dropdown or search input
function filterTable() {
    const searchQuery = document.getElementById('searchRevenue').value.toLowerCase();
    const sortBy = document.getElementById('sortByRevenue').value;

    // Filter revenue table
    const revenueRows = revenueTable.querySelectorAll('tbody tr');
    revenueRows.forEach(row => {
        const type = row.querySelector('.revenueType').textContent.toLowerCase();
        const voided = row.classList.contains('strikethrough');
        const matchSearch = type.includes(searchQuery);
        const matchSort = sortBy ? type === sortBy.toLowerCase() : true;

        row.style.display = (matchSearch && matchSort) ? '' : 'none';
    });

    // Update financial stats
    updateFinancialStats();
}

// Update stats based on data
function updateFinancialStats() {
    let totalDonations = 0, totalRegistrations = 0, totalFees = 0, totalMinusExpenses = 0;

    revenueData.forEach(row => {
        const subtotal = parseFloat(row.querySelector('.revenueSubtotal').textContent);
        const fee = parseFloat(row.querySelector('.revenueFee').textContent);
        if (row.classList.contains('strikethrough')) return;

        totalDonations += subtotal;
        totalFees += fee;
    });

    expenseData.forEach(row => {
        const subtotal = parseFloat(row.querySelector('.expenseSubtotal').textContent);
        const fee = parseFloat(row.querySelector('.expenseFee').textContent);
        if (row.classList.contains('strikethrough')) return;

        totalRegistrations += subtotal;
        totalFees += fee;
        totalMinusExpenses += subtotal - fee;
    });

    document.getElementById('totalDonations').textContent = totalDonations;
    document.getElementById('totalRegistrations').textContent = totalRegistrations;
    document.getElementById('totalFees').textContent = totalFees;
    document.getElementById('totalMinusExpenses').textContent = totalMinusExpenses;
}

// Add revenue to table
function addRevenueToTable() {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td class="revenueType">${document.getElementById('revenueType').value}</td>
        <td class="revenueDate">${document.getElementById('revenueDate').value}</td>
        <td class="revenueReceipt">${document.getElementById('revenueReceipt').value}</td>
        <td class="revenuePayment">${document.getElementById('revenuePayment').value}</td>
        <td class="revenueName">${document.getElementById('revenueName').value}</td>
        <td class="revenueContact">${document.getElementById('revenueContact').value}</td>
        <td class="revenueSubtotal">${document.getElementById('revenueSubtotal').value}</td>
        <td class="revenueFee">${document.getElementById('revenueFee').value}</td>
        <td class="revenueNotes">${document.getElementById('revenueNotes').value}</td>
        <td>
            <button onclick="voidTransaction(this)">Void</button>
            <button onclick="editRevenue(this)">Edit</button>
            <button onclick="deleteRevenue(this)">Delete</button>
        </td>
    `;
    revenueTable.querySelector('tbody').appendChild(newRow);
    revenueData.push(newRow); // Add to revenue data array
    updateFinancialStats(); // Update stats
    closePopup('revenuePopup');
}

// Add expense to table
function addExpenseToTable() {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td class="expenseType">${document.getElementById('expenseType').value}</td>
        <td class="expenseDate">${document.getElementById('expenseDate').value}</td>
        <td class="expenseReceipt">${document.getElementById('expenseReceipt').value}</td>
        <td class="expensePayment">${document.getElementById('expensePayment').value}</td>
        <td class="expenseName">${document.getElementById('expenseName').value}</td>
        <td class="expenseContact">${document.getElementById('expenseContact').value}</td>
        <td class="expenseSubtotal">${document.getElementById('expenseSubtotal').value}</td>
        <td class="expenseFee">${document.getElementById('expenseFee').value}</td>
        <td class="expenseNotes">${document.getElementById('expenseNotes').value}</td>
        <td>
            <button onclick="voidTransaction(this)">Void</button>
            <button onclick="editExpense(this)">Edit</button>
            <button onclick="deleteExpense(this)">Delete</button>
        </td>
    `;
    expensesTable.querySelector('tbody').appendChild(newRow);
    expenseData.push(newRow); // Add to expense data array
    updateFinancialStats(); // Update stats
    closePopup('expensePopup');
}

// Void transaction function
function voidTransaction(button) {
    const row = button.closest('tr');
    row.classList.toggle('strikethrough');
    const voidButton = row.querySelector('button');
    if (row.classList.contains('strikethrough')) {
        voidButton.innerText = 'Unvoid';
    } else {
        voidButton.innerText = 'Void';
    }
    updateFinancialStats(); // Update stats after voiding
}

// Edit transaction functions
function editRevenue(button) {
    // Implement edit functionality here
}

function editExpense(button) {
    // Implement edit functionality here
}

// Delete transaction functions
function deleteRevenue(button) {
    const row = button.closest('tr');
    row.remove();
    updateFinancialStats(); // Update stats after deletion
}

function deleteExpense(button) {
    const row = button.closest('tr');
    row.remove();
    updateFinancialStats(); // Update stats after deletion
}

// Show popups
function showAddRevenuePopup() {
    document.getElementById('revenuePopup').style.display = 'flex';
}

function showAddExpensePopup() {
    document.getElementById('expensePopup').style.display = 'flex';
}

// Close popups
function closePopup(popupId) {
    document.getElementById(popupId).style.display = 'none';
}

// Export to CSV function
function exportToCSV(tableId) {
    const table = document.getElementById(tableId);
    let csv = [];
    const rows = table.querySelectorAll('tr');
    rows.forEach(row => {
        const rowData = [];
        const cols = row.querySelectorAll('td, th');
        cols.forEach(col => {
            rowData.push(col.innerText);
        });
        csv.push(rowData.join(','));
    });

    const csvString = csv.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${tableId}.csv`;
    link.click();
}

// Initial update
updateFinancialStats();
